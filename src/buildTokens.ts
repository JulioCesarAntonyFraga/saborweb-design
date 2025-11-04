// buildTokens.ts
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import dinâmico — funciona tanto no src quanto no dist
const colorsModule = await import(
    pathToFileURL(path.resolve(__dirname, "./tokens/colors.js")).href
).catch(async () => {
    // fallback para ambiente de dev (src/.ts)
    return import(pathToFileURL(path.resolve(__dirname, "../src/tokens/colors.ts")).href);
});
const typographyModule = await import(
    pathToFileURL(path.resolve(__dirname, "./tokens/typography.js")).href
).catch(async () => {
    // fallback para ambiente de dev (src/.ts)
    return import(pathToFileURL(path.resolve(__dirname, "../src/tokens/typography.ts")).href);
});

const { colors } = colorsModule;
const { typography } = typographyModule;

// resto do script (flattenTokens, etc) permanece igual
import fs from "fs";

function flattenTokens(
    obj: Record<string, any>,
    prefix = ""
): Record<string, string> {
    const result: Record<string, string> = {};
    for (const [key, value] of Object.entries(obj)) {
        const newKey = prefix ? `${prefix}-${key}` : key;
        if (typeof value === "object" && value !== null) {
            Object.assign(result, flattenTokens(value, newKey));
        } else if (typeof value === "string") {
            result[`--${newKey}`] = value;
        }
    }
    return result;
}

const flat = flattenTokens({ colors, typography });

const css = `:root {\n${Object.entries(flat)
    .map(([key, val]) => `  ${key}: ${val};`)
    .join("\n")}\n}`;

fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync(path.resolve("./dist/tokens.css"), css);
console.log("✅ Tokens gerados em dist/tokens.css");
