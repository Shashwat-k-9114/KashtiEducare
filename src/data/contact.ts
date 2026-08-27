export type ContactIntent = "school" | "higher-education" | "industry-partner" | "institutional-partner" | "other";

export const contactIntents: { value: ContactIntent; label: string }[] = [
  { value: "school", label: "School" },
  { value: "higher-education", label: "Higher Education Institution" },
  { value: "industry-partner", label: "Industry & Corporate Partner" },
  { value: "institutional-partner", label: "Advisor & Institutional Partner" },
  { value: "other", label: "Other" },
];
