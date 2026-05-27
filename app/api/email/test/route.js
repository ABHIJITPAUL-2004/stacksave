import { NextResponse } from "next/server";
import { z } from "zod";
import { sendResendTestEmail } from "@/lib/email/resend";

const testEmailSchema = z.object({
  email: z.string().email(),
  message: z.string().max(1000).optional(),
});

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = testEmailSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid test email payload", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const result = await sendResendTestEmail(parsed.data);

    if (!result.sent) {
      return NextResponse.json(
        {
          ok: false,
          error: result.reason,
          details: result.error || null,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      sent: true,
      id: result.id,
    });
  } catch (error) {
    console.error("[api/email/test] Unexpected error", error);

    return NextResponse.json(
      { error: error.message || "Could not send test email" },
      { status: 500 }
    );
  }
}