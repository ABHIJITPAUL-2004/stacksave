import { NextResponse } from "next/server";
import { getAuditById } from "@/lib/db/audits";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
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
