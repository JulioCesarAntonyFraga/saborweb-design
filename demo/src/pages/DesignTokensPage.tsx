import React from "react";
import { colors } from "../../../src/tokens/colors";
import { typography } from "../../../src/tokens/typography";

const ColorBox = ({ name, value }: { name: string; value: string }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(`var(--colors-${name})`);
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

interface TypographyExampleProps {
  name: string;
  tokenPath: string;
  style: React.CSSProperties;
  sample: string;
}

const TypographyExample = ({
  name,
  tokenPath,
  style,
  sample,
}: TypographyExampleProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(`var(--${tokenPath})`);
  };

  return (
    <div className="mb-6 flex items-start justify-between border-b border-gray-200 pb-4">
      <div>
        <div className="mb-2 font-semibold text-sm text-gray-600">{name}</div>
        <div style={style}>{sample}</div>

        <div className="mt-2 text-xs text-gray-500 space-y-1">
          {Object.entries(style).map(([key, value]) => (
            <div key={key}>
              <code>{key}:</code> {String(value)}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleCopy}
        className="ml-4 px-2 py-1 text-xs bg-gray-100 border rounded hover:bg-gray-200"
      >
        Copiar var
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

      <section>
        <h2 className="text-2xl font-semibold mb-6">Typography</h2>

        {/* Headings */}
        {Object.entries(typography.heading).map(([key, style]) => (
          <TypographyExample
            key={key}
            name={`Heading ${key.toUpperCase()}`}
            tokenPath={`typography-heading-${key}`}
            style={{
              fontFamily: style.fontFamily,
              fontSize: style.fontSize,
              fontWeight: Number(style.fontWeight),
              lineHeight: style.lineHeight,
              letterSpacing: typography.letterSpacing.normal,
            }}
            sample={sampleText}
          />
        ))}

        {/* Body */}
        {Object.entries(typography.body).map(([key, style]) => (
          <TypographyExample
            key={key}
            name={`Body ${key}`}
            tokenPath={`typography-body-${key}`}
            style={{
              fontFamily: style.fontFamily,
              fontSize: style.fontSize,
              lineHeight: style.lineHeight,
              letterSpacing: typography.letterSpacing.normal,
            }}
            sample={sampleText}
          />
        ))}
        {/* Font Family */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-6">Font Families</h2>

          {Object.entries(typography.fontFamily).map(([key, fontFamily]) => (
            <TypographyExample
              key={key}
              name={`Font Family: ${key}`}
              tokenPath={`typography-fontFamily-${key}`}
              style={{
                fontFamily,
                fontSize: "1.25rem",
                lineHeight: 1.4,
              }}
              sample={sampleText}
            />
          ))}
        </section>
        {/* Line Height */}
        {Object.entries(typography.lineHeight).map(([key, lineHeight]) => (
          <TypographyExample
            key={key}
            name={`Line Height ${key.toUpperCase()}`}
            tokenPath={`typography-heading-${key}`}
            style={{
              fontFamily: typography.fontFamily.body,
              fontSize: typography.fontSize.base,
              fontWeight: Number(typography.fontWeight.regular),
              lineHeight: lineHeight,
              letterSpacing: typography.letterSpacing.normal,
            }}
            sample={sampleText}
          />
        ))}
      </section>

    </div>
  );
};
