export const supportedTools = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "Assistant",
    vendor: "OpenAI",
    plans: [
      { id: "free", name: "Free", monthlyPrice: 0 },
      { id: "plus", name: "Plus", monthlyPrice: 20 },
      { id: "team", name: "Team", monthlyPrice: 30 },
      { id: "enterprise", name: "Enterprise", monthlyPrice: null },
    ],
  },
  {
    id: "claude",
    name: "Claude",
    category: "Assistant",
    vendor: "Anthropic",
    plans: [
      { id: "free", name: "Free", monthlyPrice: 0 },
      { id: "pro", name: "Pro", monthlyPrice: 20 },
      { id: "team", name: "Team", monthlyPrice: 30 },
      { id: "enterprise", name: "Enterprise", monthlyPrice: null },
    ],
  },
  {
    id: "cursor",
    name: "Cursor",
    category: "Coding",
    vendor: "Anysphere",
    plans: [
      { id: "hobby", name: "Hobby", monthlyPrice: 0 },
      { id: "pro", name: "Pro", monthlyPrice: 20 },
      { id: "business", name: "Business", monthlyPrice: 40 },
    ],
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    category: "Coding",
    vendor: "GitHub",
    plans: [
      { id: "individual", name: "Individual", monthlyPrice: 10 },
      { id: "business", name: "Business", monthlyPrice: 19 },
      { id: "enterprise", name: "Enterprise", monthlyPrice: 39 },
    ],
  },
  {
    id: "gemini",
    name: "Gemini",
    category: "Assistant",
    vendor: "Google",
    plans: [
      { id: "free", name: "Free", monthlyPrice: 0 },
      { id: "advanced", name: "Advanced", monthlyPrice: 20 },
      { id: "workspace", name: "Workspace add-on", monthlyPrice: 30 },
    ],
  },
  {
    id: "openai-api",
    name: "OpenAI API",
    category: "API",
    vendor: "OpenAI",
    plans: [
      { id: "usage", name: "Usage based", monthlyPrice: null },
      { id: "committed", name: "Committed spend", monthlyPrice: null },
    ],
  },
  {
    id: "anthropic-api",
    name: "Anthropic API",
    category: "API",
    vendor: "Anthropic",
    plans: [
      { id: "usage", name: "Usage based", monthlyPrice: null },
      { id: "committed", name: "Committed spend", monthlyPrice: null },
    ],
  },
  {
    id: "windsurf",
    name: "Windsurf",
    category: "Coding",
    vendor: "Codeium",
    plans: [
      { id: "free", name: "Free", monthlyPrice: 0 },
      { id: "pro", name: "Pro", monthlyPrice: 15 },
      { id: "teams", name: "Teams", monthlyPrice: 30 },
    ],
  },
  {
    id: "v0",
    name: "v0",
    category: "Product",
    vendor: "Vercel",
    plans: [
      { id: "free", name: "Free", monthlyPrice: 0 },
      { id: "premium", name: "Premium", monthlyPrice: 20 },
      { id: "team", name: "Team", monthlyPrice: 30 },
    ],
  },
];

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
