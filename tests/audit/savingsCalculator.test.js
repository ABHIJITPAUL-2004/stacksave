import { describe, expect, it } from "vitest";
import {
  calculateAnnualSavings,
  calculateMonthlySpend,
  calculateSavings,
  sumBy,
  toNumber,
} from "@/lib/auditEngine/savingsCalculator";

describe("savingsCalculator", () => {
  it("coerces invalid numeric values to the fallback", () => {
    expect(toNumber("42")).toBe(42);
    expect(toNumber("not-a-number", 7)).toBe(7);
  });

  it("calculates monthly and annual savings without returning negatives", () => {
    expect(calculateMonthlySpend({ monthlyPrice: 30 }, 4)).toBe(120);
    expect(calculateAnnualSavings(250)).toBe(3000);
    expect(calculateSavings(1000, 650)).toEqual({
      monthlySavings: 350,
      annualSavings: 4200,
    });
    expect(calculateSavings(500, 700)).toEqual({
      monthlySavings: 0,
      annualSavings: 0,
    });
  });

  it("sums derived values safely", () => {
    expect(sumBy([{ value: 10 }, { value: "15" }], (item) => item.value)).toBe(
      25
    );
  });
});
