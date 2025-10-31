import { colors } from "./colors";
import { typography } from "./typography";

export type TokenValue = string | Record<string, any>;

export function toCSSVariables(obj: Record<string, TokenValue>, prefix = "--"): string {
  return Object.entries(obj)
    .map(([key, value]) => {
      if (typeof value === "object") {
        return toCSSVariables(value as Record<string, TokenValue>, `${prefix}${key}-`);
      }
      return `${prefix}${key}: ${value};`;
    })
    .join("\n");
}

export const tokensCSS = `:root {\n${toCSSVariables({ colors, typography })}\n}`;
