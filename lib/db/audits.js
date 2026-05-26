import { createSupabaseServerClient } from "@/lib/supabase/server";

const AUDITS_TABLE = "audits";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function toNumber(value) {
  return Number(value || 0);
}

function buildAuditResult(row) {
  const recommendations = Array.isArray(row.recommendations)
    ? row.recommendations
    : [];

  const totalMonthlySpend = toNumber(row.total_monthly_spend);
  const optimizedMonthlySpend = toNumber(row.optimized_monthly_spend);
  const totalMonthlySavings = toNumber(row.total_monthly_savings);
  const totalAnnualSavings = toNumber(row.total_annual_savings);

  return {
    totalMonthlySpend,
    optimizedMonthlySpend,
    monthlySavings: totalMonthlySavings,
    annualSavings: totalAnnualSavings,
    totalMonthlySavings,
    totalAnnualSavings,
    recommendationCount: recommendations.filter(
      (recommendation) => recommendation.type !== "healthy-stack"
    ).length,
    status:
      totalMonthlySavings === 0
        ? "optimized"
        : totalMonthlySavings >= 300
          ? "high-opportunity"
          : "moderate-opportunity",
    tools: [],
    recommendations,
  };
}

function buildPublicAuditPayload(row) {
  if (!row) return null;

  return {
    id: row.id,
    auditResult: buildAuditResult(row),
    aiSummary: row.ai_summary,
    createdAt: row.created_at,
  };
}

function assertConfiguredClient() {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    throw new Error("Supabase environment variables are not configured");
  }

  return supabase;
}

export function isValidAuditId(id) {
  return typeof id === "string" && UUID_PATTERN.test(id);
}

export async function createAudit({ auditResult, aiSummary }) {
  const supabase = assertConfiguredClient();

  const { data, error } = await supabase
    .from(AUDITS_TABLE)
    .insert({
      total_monthly_spend: auditResult.totalMonthlySpend || 0,
      optimized_monthly_spend: auditResult.optimizedMonthlySpend || 0,
      total_monthly_savings: auditResult.totalMonthlySavings || 0,
      total_annual_savings: auditResult.totalAnnualSavings || 0,
      recommendations: auditResult.recommendations || [],
      ai_summary: aiSummary || null,
    })
    .select(
      "id, total_monthly_spend, optimized_monthly_spend, total_monthly_savings, total_annual_savings, recommendations, ai_summary, created_at"
    )
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return buildPublicAuditPayload(data);
}

export async function getAuditById(id) {
  if (!isValidAuditId(id)) {
    return null;
  }

  const supabase = assertConfiguredClient();

  const { data, error } = await supabase
    .from(AUDITS_TABLE)
    .select(
      "id, total_monthly_spend, optimized_monthly_spend, total_monthly_savings, total_annual_savings, recommendations, ai_summary, created_at"
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return buildPublicAuditPayload(data);
}
