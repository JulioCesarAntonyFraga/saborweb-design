import { Copy } from "lucide-react";

interface FontFamilyBoxProps {
  name: string; // Ex: "heading", "body", "mono"
  fontFamily: string; // Ex: "'Mozilla Headline', sans-serif"
}

export const FontFamilyBox = ({ name, fontFamily }: FontFamilyBoxProps) => {
  const cssVar = `--typography-fontFamily-${name}`;
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
    <div className="flex items-center justify-between p-4 border rounded-lg mb-3 bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Preview da fonte */}
      <div className="flex-1 mr-4">
        <div className="text-sm text-gray-500 mb-1 font-medium">
          {name.toUpperCase()}
        </div>

        {/* Texto de exemplo */}
        <div
          className="text-lg text-gray-900"
          style={{ fontFamily }}
        >
          The quick brown fox jumps over the lazy dog.
        </div>

        {/* Nome e variável */}
        <div className="mt-2 text-xs text-gray-600">
          <div className="flex justify-between">
            <span className="truncate max-w-[70%]">{fontFamily}</span>
            <button
              onClick={() => handleCopy(fontFamily, "Font family")}
              className="p-1 rounded hover:bg-gray-100"
              title="Copiar nome da fonte"
            >
              <Copy size={14} />
            </button>
          </div>

          <div className="flex justify-between mt-1">
            <span>{cssVarRef}</span>
            <button
              onClick={() => handleCopy(cssVarRef, "CSS variable")}
              className="p-1 rounded hover:bg-gray-100"
              title="Copiar var CSS"
            >
              <Copy size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FontFamilyBox;