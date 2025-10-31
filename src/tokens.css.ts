import { colors } from "./tokens/colors";
import { typography } from "./tokens/typography";

type TokenValue = string | Record<string, any>;

function toCSSVariables(obj: Record<string, TokenValue>, prefix = "--"): string {
  return Object.entries(obj)
    .map(([key, value]) => {
      if (typeof value === "object") {
        return toCSSVariables(value as Record<string, TokenValue>, `${prefix}${key}-`);
      }
      return `${prefix}${key}: ${value};`;
    })
    .join("\n");
}

const tokensCSS = `:root {\n${toCSSVariables({ colors, typography })}\n}`;

export default tokensCSS;
