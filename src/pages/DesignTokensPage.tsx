import React from "react";
import { colors } from "../tokens/colors";
import { typography } from "../tokens/typography";

const ColorBox = ({ name, value }: { name: string; value: string }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(`var(--${name})`);
    alert(`Copiado: var(--${name})`);
  };

  return (
    <div className="flex items-center space-x-4 p-2 border rounded-md mb-2">
      <div
        style={{ backgroundColor: value }}
        className="w-16 h-16 rounded-md border"
      />
      <div className="flex-1">
        <div className="font-medium">{name}</div>
        <div className="text-sm text-gray-700">{value}</div>
      </div>
      <button
        onClick={handleCopy}
        className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
      >
        Copiar
      </button>
    </div>
  );
};

const TypographyExample = ({
  name,
  style,
  sample,
}: {
  name: string;
  style: React.CSSProperties;
  sample: string;
}) => {
  const handleCopy = () => {
    const tokenName = `typography-${name.toLowerCase().replace(/\s+/g, "-")}`;
    navigator.clipboard.writeText(`var(--${tokenName})`);
    alert(`Copiado: var(--${tokenName})`);
  };

  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <div className="mb-1 font-medium">{name}</div>
        <div style={style}>{sample}</div>
      </div>
      <button
        onClick={handleCopy}
        className="ml-4 px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 self-start"
      >
        Copiar
      </button>
    </div>
  );
};

export const DesignTokensPage = () => {
  const sampleText = "The quick brown fox jumps over the lazy dog";

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

      {/* Typography */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Typography</h2>
        {/* Headings */}
        {typography.heading &&
          Object.entries(typography.heading).map(([key, style]) => (
            <TypographyExample
              key={key}
              name={`Heading ${key.toUpperCase()}`}
              style={{
                fontFamily: style.fontFamily,
                fontSize: style.fontSize,
                fontWeight: parseInt(style.fontWeight as string),
                lineHeight: style.lineHeight,
              }}
              sample={sampleText}
            />
          ))}
        {/* Body */}
        {typography.body &&
          Object.entries(typography.body).map(([key, style]) => (
            <TypographyExample
              key={key}
              name={`Body ${key}`}
              style={{
                fontFamily: style.fontFamily,
                fontSize: style.fontSize,
                lineHeight: style.lineHeight,
              }}
              sample={sampleText}
            />
          ))}
      </section>
    </div>
  );
};
