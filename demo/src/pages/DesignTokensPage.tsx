import { colors } from "../../../src/tokens/colors";
import { typography } from "../../../src/tokens/typography";
import ColorBox from "../components/ColorBox/ColorBox";
import FontFamilyBox from "../components/Typography/FontFamilyBox/FontFamilyBox";
import { FontSizeBox } from "../components/Typography/FontSizeBox/FontSizeBox";
import { FontWeightBox } from "../components/Typography/FontWeightBox/FontWeightBox";
import LineHeightBox from "../components/Typography/LineHeightBox/LineHeightBox";
import LetterSpacingBox from "../components/Typography/LetterSpacingBox/LetterSpacingBox";



export const DesignTokensPage = () => {
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
