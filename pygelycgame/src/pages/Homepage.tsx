import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Homepage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleStart = () => {
    if (isAuthenticated) {
      navigate('/mundos');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="relative w-full aspect-[4/3] p-4 overflow-hidden bg-sky-200 rounded-2xl max-w-4xl shadow-2xl">
        <div
          style={{ backgroundImage: "url('img/home.PNG')" }}
          className="absolute inset-0 bg-cover bg-center"
        >
          {/* Overlay oscuro para mejor legibilidad */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Textos que cubren "Límites" y "Continuidad" */}
          <div className="absolute bottom-[30%] left-[10%] bg-gradient-to-r from-green-600 to-green-700 px-8 py-4 rounded-lg shadow-xl border-2 border-green-400">
            <h2 className="text-4xl font-bold text-white drop-shadow-lg">Límites</h2>
          </div>
          
          <div className="absolute bottom-[30%] right-[3%] bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 rounded-lg shadow-xl border-2 border-blue-400">
            <h2 className="text-4xl font-bold text-white drop-shadow-lg">Continuidad</h2>
          </div>

          {/* Contenido principal más abajo */}
          <div className="relative h-full flex flex-col items-center justify-end pb-6 text-center px-8">

            <button
              onClick={handleStart}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold text-2xl px-12 py-4 rounded-full shadow-2xl transform transition duration-300 hover:scale-110 active:scale-95 mb-6"
            >
              {isAuthenticated ? 'Continuar Aventura' : 'Iniciar Sesión'}
            </button>

            <div className="grid grid-cols-3 gap-8 text-white">
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 hover:bg-white/30 transition-all">
                <div className="text-4xl mb-2">🎮</div>
                <div className="font-semibold">Juega y Aprende</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 hover:bg-white/30 transition-all">
                <div className="text-4xl mb-2">📊</div>
                <div className="font-semibold">Rastrea tu Progreso</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 hover:bg-white/30 transition-all">
                <div className="text-4xl mb-2">🏆</div>
                <div className="font-semibold">Gana Recompensas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}