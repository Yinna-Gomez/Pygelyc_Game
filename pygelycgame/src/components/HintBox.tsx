interface HintBoxProps {
  character: string;
  text: string;
  onClose: () => void;
}

export function HintBox({ character, text, onClose }: HintBoxProps) {
  return (
    <div className="absolute top-4 right-4 bg-gradient-to-br from-yellow-100 to-yellow-200 border-3 border-yellow-500 rounded-lg p-4 max-w-xs shadow-xl animate-bounce z-20">
      <div className="flex items-start">
        <span className="text-3xl mr-3">💡</span>
        <div className="flex-1">
          <p className="text-sm font-bold text-yellow-800 mb-1">{character}</p>
          <p className="text-sm text-yellow-900">{text}</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="mt-3 w-full bg-yellow-500 hover:bg-yellow-600 text-white text-sm py-1 rounded transition"
      >
        Entendido
      </button>
    </div>
  );
}