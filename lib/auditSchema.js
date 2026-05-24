import { z } from "zod";

const numberFromInput = (message) =>
  z.coerce
    .number({ message })
    .finite(message);

export const auditSchema = z.object({
  teamSize: numberFromInput("Team size is required").min(
    1,
    "Team size must be at least 1"
  ),
  primaryUseCase: z.string().min(1, "Select a primary use case"),
  tools: z
    .array(
      z.object({
        toolId: z.string().min(1, "Select a tool"),
        planId: z.string().min(1, "Select a plan"),
        monthlySpend: numberFromInput("Monthly spend is required").min(
          0,
          "Monthly spend cannot be negative"
        ),
        seats: numberFromInput("Seats are required")
          .int("Seats must be a whole number")
          .min(1, "Seats must be at least 1"),
      })
    )
    .min(1, "Add at least one AI tool"),
});

export const defaultAuditValues = {
  teamSize: 10,
  primaryUseCase: "coding",
  tools: [
    {
      toolId: "chatgpt",
      planId: "team",
      monthlySpend: 300,
      seats: 10,
    },
  ],
};
