import { colors } from "./tokens/colors";
import { typography } from "./tokens/typography";

function toCSSVariables(obj: Record<string, any>, prefix = "--"): string {
  return Object.entries(obj)
    .map(([key, value]) => {
      if (typeof value === "object") {
        return toCSSVariables(value, `${prefix}${key}-`);
      }
      return `${prefix}${key}: ${value};`;
    })
    .join("\n");
}

const css = `
:root {
${toCSSVariables({ colors, typography }, "--")}
}
`;

export default css;
