import { createSupabaseServerClient } from "@/lib/supabase/server";

const LEADS_TABLE = "leads";

export async function saveLead({
  auditId,
  email,
  companyName,
  role,
  teamSize,
  source = "results",
}) {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    throw new Error("Supabase environment variables are not configured");
  }

  const normalizedEmail = email.trim().toLowerCase();

  let duplicateQuery = supabase
    .from(LEADS_TABLE)
    .select("id")
    .eq("email", normalizedEmail);

  duplicateQuery = auditId
    ? duplicateQuery.eq("audit_id", auditId)
    : duplicateQuery.is("audit_id", null);

  const { data: existingLead } = await duplicateQuery.maybeSingle();

  if (existingLead) {
    return { id: existingLead.id, duplicate: true };
  }

  const { data, error } = await supabase
    .from(LEADS_TABLE)
    .insert({
      audit_id: auditId || null,
      email: normalizedEmail,
      company_name: companyName || null,
      role: role || null,
      team_size: teamSize || null,
      source,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return { id: data.id, duplicate: false };
}
