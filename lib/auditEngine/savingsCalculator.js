export function toNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

export function calculateMonthlySpend(plan, seats) {
  return toNumber(plan?.monthlyPrice) * Math.max(toNumber(seats), 0);
}

export function calculateAnnualSavings(monthlySavings) {
  return Math.max(toNumber(monthlySavings), 0) * 12;
}

export function calculateSavings(currentMonthlySpend, optimizedMonthlySpend) {
  const monthlySavings = Math.max(
    toNumber(currentMonthlySpend) - toNumber(optimizedMonthlySpend),
    0
  );

  return {
    monthlySavings,
    annualSavings: calculateAnnualSavings(monthlySavings),
  };
}

export function sumBy(items, getValue) {
  return items.reduce((total, item) => total + toNumber(getValue(item)), 0);
}
