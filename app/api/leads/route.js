import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuditById } from "@/lib/db/audits";
import { saveLead } from "@/lib/db/leads";
import { sendLeadConfirmationEmail } from "@/lib/email/resend";
import { checkRateLimit } from "@/lib/security/rateLimit";

const leadSchema = z.object({
  email: z.string().email(),
  companyName: z.string().max(120).optional().or(z.literal("")),
  role: z.string().max(80).optional().or(z.literal("")),
  teamSize: z.coerce.number().int().min(1).optional().or(z.literal("")),
  auditId: z.string().optional().or(z.literal("")),
  auditPublicId: z.string().optional().or(z.literal("")),
  auditResult: z
    .object({
      totalMonthlySavings: z.coerce.number().optional(),
      totalAnnualSavings: z.coerce.number().optional(),
    })
    .passthrough()
    .optional(),
  website: z.string().max(0).optional(),
});

export async function POST(request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const rateLimit = checkRateLimit(`lead:${ip}`, {
    limit: 4,
    windowMs: 60_000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again shortly." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid lead payload", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    let audit = null;
    const requestedAuditId = parsed.data.auditId || parsed.data.auditPublicId;
    if (requestedAuditId) {
      audit = await getAuditById(requestedAuditId);
    }

    const lead = await saveLead({
      auditId: audit?.id,
      email: parsed.data.email,
      companyName: parsed.data.companyName,
      role: parsed.data.role,
      teamSize:
        parsed.data.teamSize === "" ? undefined : parsed.data.teamSize,
    });

    const auditResultForEmail = audit?.auditResult || parsed.data.auditResult;
    let emailStatus = { sent: false };
    if (auditResultForEmail) {
      emailStatus = await sendLeadConfirmationEmail({
        email: parsed.data.email,
        auditResult: auditResultForEmail,
      });
    }

    return NextResponse.json({
      ok: true,
      duplicate: lead.duplicate,
      emailSent: emailStatus.sent,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Could not save lead" },
      { status: 500 }
    );
  }
}
