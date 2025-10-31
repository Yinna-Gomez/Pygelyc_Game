interface DialogBoxProps {
  character: string;
  text: string;
  onClose: () => void;
  showButton?: boolean;
}

export function DialogBox({ character, text, onClose, showButton = true }: DialogBoxProps) {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-6 max-w-md z-10 border-4 border-blue-500">
      <div className="flex items-start mb-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
          <span className="text-3xl">
            {character === 'Profe Numix' && '👨‍🏫'}
            {character === 'Calcín' && '📐'}
            {character === 'Límix' && '🦸'}
            {character === 'Sistema' && '💬'}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-blue-600 mb-2">{character}</h3>
          <p className="text-gray-700">{text}</p>
        </div>
      </div>
      {showButton && (
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Continuar
        </button>
      )}
    </div>
  );
}