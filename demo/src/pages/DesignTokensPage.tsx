import { colors } from "../../../src/tokens/colors";
import { typography } from "../../../src/tokens/typography";
import { Copy } from "lucide-react";
import ColorBox from "../components/ColorBox/ColorBox";
import FontFamilyBox from "../components/Typography/FontFamilyBox/FontFamilyBox";
import { FontSizeBox } from "../components/Typography/FontSizeBox/FontSizeBox";
import { FontWeightBox } from "../components/Typography/FontWeightBox/FontWeightBox";
import LineHeightBox from "../components/Typography/LineHeightBox/LineHeightBox";
import LetterSpacingBox from "../components/Typography/LetterSpacingBox/LetterSpacingBox";

const buttonPresets = [
  {
    title: "Primary",
    variants: [
      { label: "Solid", classes: "sw-btn-primary-solid" },
      { label: "Outline", classes: "sw-btn-primary-outline" },
      { label: "Ghost", classes: "sw-btn-primary-ghost" },
    ],
  },
  {
    title: "Accent",
    variants: [
      { label: "Solid", classes: "sw-btn-accent-solid" },
      { label: "Outline", classes: "sw-btn-accent-outline" },
      { label: "Ghost", classes: "sw-btn-accent-ghost" },
    ],
  },
  {
    title: "Positive",
    variants: [
      { label: "Solid", classes: "sw-btn-positive-solid" },
      { label: "Outline", classes: "sw-btn-positive-outline" },
      { label: "Ghost", classes: "sw-btn-positive-ghost" },
    ],
  },
  {
    title: "Negative",
    variants: [
      { label: "Solid", classes: "sw-btn-negative-solid" },
      { label: "Outline", classes: "sw-btn-negative-outline" },
      { label: "Ghost", classes: "sw-btn-negative-ghost" },
    ],
  },
  {
    title: "Warning",
    variants: [
      { label: "Solid", classes: "sw-btn-warning-solid" },
      { label: "Outline", classes: "sw-btn-warning-outline" },
      { label: "Ghost", classes: "sw-btn-warning-ghost" },
    ],
  },
];


export const DesignTokensPage = () => {
  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    const toast = document.createElement("div");
    toast.textContent = "Preset copiado!";
    toast.className =
      "fixed bottom-4 right-4 bg-gray-800 text-white text-sm py-2 px-3 rounded-md opacity-0 animate-fadeInOut";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1800);
  };

  return (
    <div className="p-8 space-y-12">
      <h1 className="text-3xl font-bold mb-6">Design Tokens Preview</h1>

      {/* Colors */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Colors</h2>
        {Object.entries(colors).map(([category, values]) => (
          <div key={category} className="mb-6">
            <h3 className="text-xl font-medium capitalize mb-2">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(values).map(([key, value]) => (
                <ColorBox key={key} name={`${category}-${key}`} value={value as string} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
        <p className="text-sm text-gray-600 mb-4">Cards organizados por cor. Cada card mostra Solid, Outline e Ghost com copia individual.</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {buttonPresets.map((group) => (
            <div
              key={group.title}
              className="border rounded-lg p-4 bg-[var(--colors-background-surface)] shadow-sm"
            >
              <h3 className="text-sm font-semibold text-gray-700 mb-3">{group.title}</h3>
              <div className="space-y-3">
                {group.variants.map((variant) => (
                  <div key={variant.classes} className="border rounded-md p-3 bg-white/70">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-medium text-gray-600">{variant.label}</span>
                      <button
                        className="p-1.5 rounded hover:bg-gray-100 text-gray-700"
                        onClick={() => handleCopy(variant.classes)}
                        title="Copiar classe"
                        aria-label={`Copiar classe ${variant.classes}`}
                      >
                        <Copy size={14} />
                      </button>
                    </div>

                    <div className="mb-2">
                      <button className={variant.classes}>{variant.label}</button>
                    </div>

                    <code className="block text-xs text-gray-600 break-all">{variant.classes}</code>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Typography</h2>
        {/* Font Family */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-6">Font Families</h2>

          {Object.entries(typography.fontFamily).map(([key, value]) => (
            <FontFamilyBox key={key} name={key} fontFamily={value} />
          ))}
        </section>
        {/* Font Size */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-6">Font Sizes</h2>

          {Object.entries(typography.fontSize).map(([key, value]) => (
            <FontSizeBox key={key} name={key} value={value} />
          ))}
        </section>
        {/* Font Weight */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-6">Font Weights</h2>

          {Object.entries(typography.fontWeight).map(([key, value]) => (
            <FontWeightBox key={key} name={key} value={value} />
          ))}
        </section>
        {/* Line Height */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-6">Line Heights</h2>

          {Object.entries(typography.lineHeight).map(([key, value]) => (
            <LineHeightBox key={key} name={key} value={value} />
          ))}
        </section>
        {/* Letter Spacing */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-6">Letter Spacing</h2>

          {Object.entries(typography.letterSpacing).map(([key, value]) => (
            <LetterSpacingBox key={key} name={key} value={value} />
          ))}
        </section>
      </section>

    </div>
  );
};
