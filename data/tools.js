import { getPricingPlan, pricingCatalog } from "@/data/pricing";

export const supportedTools = Object.values(pricingCatalog).map((tool) => ({
  id: tool.id,
  name: tool.name,
  category: tool.category,
  vendor: tool.vendor,
  plans: tool.plans.map((plan) => ({
    id: plan.id,
    name: plan.name,
    monthlyPrice: plan.monthlyPrice,
  })),
}));

export const useCases = [
  { id: "coding", label: "Coding" },
  { id: "writing", label: "Writing" },
  { id: "research", label: "Research" },
  { id: "data", label: "Data" },
  { id: "mixed", label: "Mixed" },
];

export function getToolById(toolId) {
  return supportedTools.find((tool) => tool.id === toolId);
}

export function getDefaultPlanId(toolId) {
  return getToolById(toolId)?.plans[0]?.id || "";
}

export function getPlanById(toolId, planId) {
  return getPricingPlan(toolId, planId);
}
