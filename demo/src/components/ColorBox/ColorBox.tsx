import { Copy } from "lucide-react"; // ícone simples e elegante

interface ColorBoxProps {
  name: string;
  value: string;
}

const ColorBox = ({ name, value }: ColorBoxProps) => {
  const cssVar = `--colors-${name}`;
  const cssVarRef = `var(${cssVar})`;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    // feedback visual leve e não intrusivo
    const toast = document.createElement("div");
    toast.textContent = `${label} copiado!`;
    toast.className =
      "fixed bottom-4 right-4 bg-gray-800 text-white text-sm py-2 px-3 rounded-md opacity-0 animate-fadeInOut";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1800);
  };

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg mb-2 bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Preview da cor */}
      <div
        style={{ backgroundColor: value }}
        className="w-14 h-14 rounded-md border"
      />

      {/* Infos da cor */}
      <div className="flex-1 ml-4">
        <div className="font-medium text-gray-900">{name}</div>

        {/* Valor HEX */}
        <div className="flex items-center justify-between text-sm text-gray-700">
          <span>{value}</span>
          <button
            onClick={() => handleCopy(value, "HEX")}
            className="p-1 rounded hover:bg-gray-100"
            title="Copiar HEX"
          >
            <Copy size={16} />
          </button>
        </div>

        {/* Variável CSS */}
        <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
          <span>{cssVarRef}</span>
          <button
            onClick={() => handleCopy(cssVarRef, "CSS variable")}
            className="p-1 rounded hover:bg-gray-100"
            title="Copiar variável CSS"
          >
            <Copy size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorBox;