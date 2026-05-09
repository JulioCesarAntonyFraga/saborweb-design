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

const buttonCss = `

.sw-btn {
    appearance: none;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-family: var(--typography-fontFamily-body);
    font-weight: var(--typography-fontWeight-semibold);
    letter-spacing: var(--typography-letterSpacing-normal);
    line-height: var(--typography-lineHeight-snug);
    transition: background-color 160ms ease, color 160ms ease, border-color 160ms ease, transform 80ms ease;
}

.sw-btn:focus-visible {
    outline: 2px solid var(--colors-primary-300);
    outline-offset: 2px;
}

.sw-btn:active {
    transform: translateY(1px);
}

.sw-btn:disabled,
.sw-btn[aria-disabled="true"] {
    opacity: 0.55;
    cursor: not-allowed;
}

.sw-btn--sm {
    font-size: var(--typography-fontSize-sm);
    padding: 0.5rem 0.875rem;
}

.sw-btn--md {
    font-size: var(--typography-fontSize-base);
    padding: 0.625rem 1rem;
}

.sw-btn--lg {
    font-size: var(--typography-fontSize-lg);
    padding: 0.75rem 1.25rem;
}

.sw-btn--solid.sw-btn--primary {
    background: var(--colors-primary-500);
    color: var(--colors-text-inverse);
}

.sw-btn--solid.sw-btn--primary:hover { background: var(--colors-primary-600); }

.sw-btn--solid.sw-btn--accent {
    background: var(--colors-accent-600);
    color: var(--colors-text-inverse);
}

.sw-btn--solid.sw-btn--accent:hover { background: var(--colors-accent-700); }

.sw-btn--solid.sw-btn--positive {
    background: var(--colors-positive-500);
    color: var(--colors-text-inverse);
}

.sw-btn--solid.sw-btn--positive:hover { background: var(--colors-positive-600); }

.sw-btn--solid.sw-btn--negative {
    background: var(--colors-negative-500);
    color: var(--colors-text-inverse);
}

.sw-btn--solid.sw-btn--negative:hover { background: var(--colors-negative-600); }

.sw-btn--solid.sw-btn--warning {
    background: var(--colors-warning-500);
    color: var(--colors-neutral-900);
}

.sw-btn--solid.sw-btn--warning:hover { background: var(--colors-warning-600); }

.sw-btn--outline.sw-btn--primary {
    border-color: var(--colors-primary-500);
    color: var(--colors-primary-600);
    background: transparent;
}

.sw-btn--outline.sw-btn--primary:hover { background: var(--colors-primary-50); }

.sw-btn--outline.sw-btn--accent {
    border-color: var(--colors-accent-600);
    color: var(--colors-accent-700);
    background: transparent;
}

.sw-btn--outline.sw-btn--accent:hover { background: var(--colors-accent-50); }

.sw-btn--outline.sw-btn--positive {
    border-color: var(--colors-positive-500);
    color: var(--colors-positive-700);
    background: transparent;
}

.sw-btn--outline.sw-btn--positive:hover { background: var(--colors-positive-50); }

.sw-btn--outline.sw-btn--negative {
    border-color: var(--colors-negative-500);
    color: var(--colors-negative-700);
    background: transparent;
}

.sw-btn--outline.sw-btn--negative:hover { background: var(--colors-negative-50); }

.sw-btn--outline.sw-btn--warning {
    border-color: var(--colors-warning-500);
    color: var(--colors-warning-700);
    background: transparent;
}

.sw-btn--outline.sw-btn--warning:hover { background: var(--colors-warning-50); }

.sw-btn--ghost.sw-btn--primary { color: var(--colors-primary-600); background: transparent; }
.sw-btn--ghost.sw-btn--primary:hover { background: var(--colors-primary-100); }

.sw-btn--ghost.sw-btn--accent { color: var(--colors-accent-700); background: transparent; }
.sw-btn--ghost.sw-btn--accent:hover { background: var(--colors-accent-100); }

.sw-btn--ghost.sw-btn--positive { color: var(--colors-positive-700); background: transparent; }
.sw-btn--ghost.sw-btn--positive:hover { background: var(--colors-positive-100); }

.sw-btn--ghost.sw-btn--negative { color: var(--colors-negative-700); background: transparent; }
.sw-btn--ghost.sw-btn--negative:hover { background: var(--colors-negative-100); }

.sw-btn--ghost.sw-btn--warning { color: var(--colors-warning-700); background: transparent; }
.sw-btn--ghost.sw-btn--warning:hover { background: var(--colors-warning-100); }

/* Single-class presets */
.sw-btn-primary-solid,
.sw-btn-accent-solid,
.sw-btn-positive-solid,
.sw-btn-negative-solid,
.sw-btn-warning-solid,
.sw-btn-primary-outline,
.sw-btn-accent-outline,
.sw-btn-positive-outline,
.sw-btn-negative-outline,
.sw-btn-warning-outline,
.sw-btn-primary-ghost,
.sw-btn-accent-ghost,
.sw-btn-positive-ghost,
.sw-btn-negative-ghost,
.sw-btn-warning-ghost {
    appearance: none;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-family: var(--typography-fontFamily-body);
    font-weight: var(--typography-fontWeight-semibold);
    letter-spacing: var(--typography-letterSpacing-normal);
    line-height: var(--typography-lineHeight-snug);
    font-size: var(--typography-fontSize-base);
    padding: 0.625rem 1rem;
    transition: background-color 160ms ease, color 160ms ease, border-color 160ms ease, transform 80ms ease;
}

.sw-btn-primary-solid:focus-visible,
.sw-btn-accent-solid:focus-visible,
.sw-btn-positive-solid:focus-visible,
.sw-btn-negative-solid:focus-visible,
.sw-btn-warning-solid:focus-visible,
.sw-btn-primary-outline:focus-visible,
.sw-btn-accent-outline:focus-visible,
.sw-btn-positive-outline:focus-visible,
.sw-btn-negative-outline:focus-visible,
.sw-btn-warning-outline:focus-visible,
.sw-btn-primary-ghost:focus-visible,
.sw-btn-accent-ghost:focus-visible,
.sw-btn-positive-ghost:focus-visible,
.sw-btn-negative-ghost:focus-visible,
.sw-btn-warning-ghost:focus-visible {
    outline: 2px solid var(--colors-primary-300);
    outline-offset: 2px;
}

.sw-btn-primary-solid:active,
.sw-btn-accent-solid:active,
.sw-btn-positive-solid:active,
.sw-btn-negative-solid:active,
.sw-btn-warning-solid:active,
.sw-btn-primary-outline:active,
.sw-btn-accent-outline:active,
.sw-btn-positive-outline:active,
.sw-btn-negative-outline:active,
.sw-btn-warning-outline:active,
.sw-btn-primary-ghost:active,
.sw-btn-accent-ghost:active,
.sw-btn-positive-ghost:active,
.sw-btn-negative-ghost:active,
.sw-btn-warning-ghost:active {
    transform: translateY(1px);
}

.sw-btn-primary-solid:disabled,
.sw-btn-accent-solid:disabled,
.sw-btn-positive-solid:disabled,
.sw-btn-negative-solid:disabled,
.sw-btn-warning-solid:disabled,
.sw-btn-primary-outline:disabled,
.sw-btn-accent-outline:disabled,
.sw-btn-positive-outline:disabled,
.sw-btn-negative-outline:disabled,
.sw-btn-warning-outline:disabled,
.sw-btn-primary-ghost:disabled,
.sw-btn-accent-ghost:disabled,
.sw-btn-positive-ghost:disabled,
.sw-btn-negative-ghost:disabled,
.sw-btn-warning-ghost:disabled {
    opacity: 0.55;
    cursor: not-allowed;
}

.sw-btn-primary-solid { background: var(--colors-primary-500); color: var(--colors-text-inverse); }
.sw-btn-primary-solid:hover { background: var(--colors-primary-600); }

.sw-btn-accent-solid { background: var(--colors-accent-600); color: var(--colors-text-inverse); }
.sw-btn-accent-solid:hover { background: var(--colors-accent-700); }

.sw-btn-positive-solid { background: var(--colors-positive-500); color: var(--colors-text-inverse); }
.sw-btn-positive-solid:hover { background: var(--colors-positive-600); }

.sw-btn-negative-solid { background: var(--colors-negative-500); color: var(--colors-text-inverse); }
.sw-btn-negative-solid:hover { background: var(--colors-negative-600); }

.sw-btn-warning-solid { background: var(--colors-warning-500); color: var(--colors-neutral-900); }
.sw-btn-warning-solid:hover { background: var(--colors-warning-600); }

.sw-btn-primary-outline { border-color: var(--colors-primary-500); color: var(--colors-primary-600); background: transparent; }
.sw-btn-primary-outline:hover { background: var(--colors-primary-50); }

.sw-btn-accent-outline { border-color: var(--colors-accent-600); color: var(--colors-accent-700); background: transparent; }
.sw-btn-accent-outline:hover { background: var(--colors-accent-50); }

.sw-btn-positive-outline { border-color: var(--colors-positive-500); color: var(--colors-positive-700); background: transparent; }
.sw-btn-positive-outline:hover { background: var(--colors-positive-50); }

.sw-btn-negative-outline { border-color: var(--colors-negative-500); color: var(--colors-negative-700); background: transparent; }
.sw-btn-negative-outline:hover { background: var(--colors-negative-50); }

.sw-btn-warning-outline { border-color: var(--colors-warning-500); color: var(--colors-warning-700); background: transparent; }
.sw-btn-warning-outline:hover { background: var(--colors-warning-50); }

.sw-btn-primary-ghost { color: var(--colors-primary-600); background: transparent; }
.sw-btn-primary-ghost:hover { background: var(--colors-primary-100); }

.sw-btn-accent-ghost { color: var(--colors-accent-700); background: transparent; }
.sw-btn-accent-ghost:hover { background: var(--colors-accent-100); }

.sw-btn-positive-ghost { color: var(--colors-positive-700); background: transparent; }
.sw-btn-positive-ghost:hover { background: var(--colors-positive-100); }

.sw-btn-negative-ghost { color: var(--colors-negative-700); background: transparent; }
.sw-btn-negative-ghost:hover { background: var(--colors-negative-100); }

.sw-btn-warning-ghost { color: var(--colors-warning-700); background: transparent; }
.sw-btn-warning-ghost:hover { background: var(--colors-warning-100); }
`;

const css = `:root {\n${Object.entries(flat)
        .map(([key, val]) => `  ${key}: ${val};`)
        .join("\n")}\n}${buttonCss}`;

fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync(path.resolve("./dist/tokens.css"), css);
console.log("✅ Tokens gerados em dist/tokens.css");
