import { createSupabaseServerClient } from "@/lib/supabase/server";

const AUDITS_TABLE = "audits";

function buildPublicAuditPayload(row) {
  if (!row) return null;

  return {
    id: row.id,
    publicId: row.public_id,
    auditResult: row.audit_result,
    aiSummary: row.ai_summary,
    createdAt: row.created_at,
  };
}

export async function createAudit({ auditInput, auditResult, aiSummary }) {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    throw new Error("Supabase environment variables are not configured");
  }

  const { data, error } = await supabase
    .from(AUDITS_TABLE)
    .insert({
      audit_input: auditInput,
      audit_result: auditResult,
      ai_summary: aiSummary || null,
      total_monthly_savings: auditResult.totalMonthlySavings || 0,
      total_annual_savings: auditResult.totalAnnualSavings || 0,
    })
    .select("id, public_id, created_at")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: data.id,
    publicId: data.public_id,
    createdAt: data.created_at,
  };
}

export async function getAuditByPublicId(publicId) {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    throw new Error("Supabase environment variables are not configured");
  }

  const { data, error } = await supabase
    .from(AUDITS_TABLE)
    .select("id, public_id, audit_result, ai_summary, created_at")
    .eq("public_id", publicId)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(error.message);
  }

  return buildPublicAuditPayload(data);
}
