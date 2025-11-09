import { useNavigate, Link } from 'react-router-dom';
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
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-auto">
      
      {/* NUEVA SECCIÓN: Práctica Libre - Arriba de todo */}
      <div className="container mx-auto px-4 pt-8 pb-4">
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl rounded-2xl p-8 border-2 border-white/20 shadow-2xl max-w-4xl mx-auto">
          
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-3 mb-2">
              <span className="text-4xl">🎓</span>
              <h2 className="text-3xl font-bold text-white">Práctica Libre</h2>
            </div>
            <p className="text-white/80 text-lg">
              Refuerza conceptos básicos antes de iniciar tu aventura
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Card Factorización */}
            <Link to="/practica/factorizacion">
              <div className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-6 transition-all transform hover:scale-105 border-2 border-white/30 cursor-pointer group h-full">
                <div className="flex items-start gap-4">
                  <div className="text-5xl group-hover:scale-110 transition-transform">📐</div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-xl mb-2">Factorización</h3>
                    <p className="text-white/80 text-sm mb-3">
                      Aprende a factorizar expresiones algebraicas paso a paso
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="inline-block bg-green-500/80 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        ✓ Sin registro
                      </span>
                      <span className="text-white/60 text-xs">
                        • 3 niveles
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Card Racionalización */}
            <Link to="/practica/racionalizacion">
              <div className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-6 transition-all transform hover:scale-105 border-2 border-white/30 cursor-pointer group h-full">
                <div className="flex items-start gap-4">
                  <div className="text-5xl group-hover:scale-110 transition-transform">√</div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-xl mb-2">Racionalización</h3>
                    <p className="text-white/80 text-sm mb-3">
                      Domina las raíces y fracciones con ejercicios interactivos
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="inline-block bg-green-500/80 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        ✓ Sin registro
                      </span>
                      <span className="text-white/60 text-xs">
                        • 3 niveles
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {!isAuthenticated && (
            <div className="text-center">
              <p className="text-white/90 text-sm mb-2">
                💾 <strong>Inicia sesión</strong> para guardar tu progreso y desbloquear más contenido
              </p>
              <Link 
                to="/login"
                className="inline-block text-blue-300 hover:text-blue-200 underline text-sm"
              >
                Crear cuenta o iniciar sesión →
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Contenedor principal existente */}
      <div className="flex items-center justify-center p-4 pb-8">
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-sky-200 rounded-2xl max-w-4xl shadow-2xl">
          <div
            style={{ backgroundImage: "url('img/home.PNG')" }}
            className="absolute inset-0 bg-cover bg-center"
          >
            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute bottom-[30%] left-[10%] bg-gradient-to-r from-green-600 to-green-700 px-8 py-4 rounded-lg shadow-xl border-2 border-green-400">
              <h2 className="text-4xl font-bold text-white drop-shadow-lg">Límites</h2>
            </div>
            
            <div className="absolute bottom-[30%] right-[3%] bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 rounded-lg shadow-xl border-2 border-blue-400">
              <h2 className="text-4xl font-bold text-white drop-shadow-lg">Continuidad</h2>
            </div>

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
    </div>
  );
}