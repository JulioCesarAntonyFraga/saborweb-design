import { Copy } from "lucide-react";

interface LetterSpacingBoxProps {
  name: string; // ex: "tight", "normal", "wide"
  value: string; // ex: "-0.01em", "0", "0.02em"
}

export const LetterSpacingBox = ({ name, value }: LetterSpacingBoxProps) => {
  const cssVar = `--typography-letterSpacing-${name}`;
  const cssVarRef = `var(${cssVar})`;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    const toast = document.createElement("div");
    toast.textContent = `${label} copiado!`;
    toast.className =
      "fixed bottom-4 right-4 bg-gray-800 text-white text-sm py-2 px-3 rounded-md opacity-0 animate-fadeInOut";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1800);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg mb-3 bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Preview */}
      <div className="flex-1 mr-4">
        <div className="text-sm text-gray-500 mb-1 font-medium">
          Letter Spacing: {name}
        </div>

        {/* Texto com o espaçamento aplicado */}
        <div
          className="text-gray-900 uppercase tracking-wide"
          style={{ letterSpacing: value, fontSize: "1.25rem" }}
        >
          THE QUICK BROWN FOX
        </div>

        {/* Detalhes */}
        <div className="mt-3 text-xs text-gray-600 space-y-1">
          {/* Valor */}
          <div className="flex justify-between items-center">
            <span>{value}</span>
            <button
              onClick={() => handleCopy(value, "Letter spacing")}
              className="p-1 rounded hover:bg-gray-100"
              title="Copiar valor"
            >
              <Copy size={14} />
            </button>
          </div>

          {/* Variável CSS */}
          <div className="flex justify-between items-center">
            <span>{cssVarRef}</span>
            <button
              onClick={() => handleCopy(cssVarRef, "CSS variable")}
              className="p-1 rounded hover:bg-gray-100"
              title="Copiar variável CSS"
            >
              <Copy size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterSpacingBox;
