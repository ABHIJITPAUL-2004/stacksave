import { NextResponse } from "next/server";
import { z } from "zod";
import { runAudit } from "@/lib/auditEngine";
import { createAudit } from "@/lib/db/audits";
import { buildFallbackSummary } from "@/lib/summaries/fallbackSummary";

const auditToolSchema = z.object({
  toolId: z.string().min(1),
  planId: z.string().min(1),
  monthlySpend: z.coerce.number().min(0),
  seats: z.coerce.number().int().min(1),
});

const createAuditSchema = z.object({
  auditInput: z.object({
    teamSize: z.coerce.number().int().min(1),
    primaryUseCase: z.string().min(1),
    tools: z.array(auditToolSchema).min(1),
  }),
  aiSummary: z.string().optional(),
});

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = createAuditSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid audit payload", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const auditResult = runAudit(parsed.data.auditInput);
    const aiSummary =
      parsed.data.aiSummary || buildFallbackSummary(auditResult);
    const savedAudit = await createAudit({
      auditInput: parsed.data.auditInput,
      auditResult,
      aiSummary,
    });

    return NextResponse.json({
      publicId: savedAudit.publicId,
      url: `/results/${savedAudit.publicId}`,
      auditResult,
      aiSummary,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error.message ||
          "Could not save audit. Please check the server configuration.",
      },
      { status: 500 }
    );
  }
}
