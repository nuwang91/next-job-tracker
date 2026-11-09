export type DateDisplay = "short" | "long";

export const formatDate = (date: Date, format: DateDisplay): string => {
  return format === "long"
    ? date.toLocaleDateString("en-AU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : date.toLocaleDateString("en-AU");
};
