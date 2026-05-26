import { NextResponse } from "next/server";
import { z } from "zod";
import { runAudit } from "@/lib/auditEngine";
import { createAudit, getAuditById } from "@/lib/db/audits";
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
      auditResult,
      aiSummary,
    });

    return NextResponse.json({
      id: savedAudit.id,
      url: `/results/${savedAudit.id}`,
      audit: savedAudit,
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

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Audit id is required" },
        { status: 400 }
      );
    }

    const audit = await getAuditById(id);

    if (!audit) {
      return NextResponse.json({ error: "Audit not found" }, { status: 404 });
    }

    return NextResponse.json({ audit });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Could not fetch audit" },
      { status: 500 }
    );
  }
}
