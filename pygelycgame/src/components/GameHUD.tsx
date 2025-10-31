interface GameHUDProps {
  playerName: string;
  attempts: number;
  score?: number;
  onHintClick?: () => void;
  onExitClick?: () => void;
}

export function GameHUD({ 
  playerName, 
  attempts, 
  score = 0, 
  onHintClick, 
  onExitClick 
}: GameHUDProps) {
  return (
    <>
      {/* Información del jugador */}
      <div className="absolute top-4 left-4 bg-white/95 rounded-lg p-3 shadow-lg backdrop-blur-sm">
        <div className="text-sm font-bold text-gray-800 mb-1">
          👤 {playerName}
        </div>
        <div className="text-xs text-gray-600">
          🎯 Intentos: {attempts}
        </div>
        <div className="text-xs text-gray-600">
          ⭐ Puntos: {score}
        </div>
      </div>

      {/* Botón de ayuda */}
      {onHintClick && (
        <button
          onClick={onHintClick}
          className="absolute top-4 right-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl transition transform hover:scale-110 active:scale-95"
          title="Solicitar pista"
        >
          <span className="text-2xl">💡</span>
        </button>
      )}

      {/* Botón de salir */}
      {onExitClick && (
        <button
          onClick={onExitClick}
          className="absolute bottom-4 left-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg transition transform hover:scale-105"
        >
          ← Salir
        </button>
      )}
    </>
  );
}