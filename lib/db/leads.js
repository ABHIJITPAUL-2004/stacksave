import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isValidAuditId } from "@/lib/db/audits";

const LEADS_TABLE = "leads";

function assertConfiguredClient() {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    throw new Error("Supabase environment variables are not configured");
  }

  return supabase;
}

export async function saveLead({
  auditId,
  email,
  companyName,
  role,
  teamSize,
}) {
  const supabase = assertConfiguredClient();
  const normalizedAuditId = isValidAuditId(auditId) ? auditId : null;
  const normalizedEmail = email.trim().toLowerCase();

  let duplicateQuery = supabase
    .from(LEADS_TABLE)
    .select("id")
    .eq("email", normalizedEmail);

  duplicateQuery = normalizedAuditId
    ? duplicateQuery.eq("audit_id", normalizedAuditId)
    : duplicateQuery.is("audit_id", null);

  const { data: existingLead, error: duplicateError } =
    await duplicateQuery.maybeSingle();

  if (duplicateError) {
    throw new Error(duplicateError.message);
  }

  if (existingLead) {
    return { id: existingLead.id, duplicate: true };
  }

  const { data, error } = await supabase
    .from(LEADS_TABLE)
    .insert({
      audit_id: normalizedAuditId,
      email: normalizedEmail,
      company_name: companyName || null,
      role: role || null,
      team_size: teamSize || null,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return { id: data.id, duplicate: false };
}
