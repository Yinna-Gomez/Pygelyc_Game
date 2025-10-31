import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function DocenteEjercicios() {
  const [mundoSeleccionado, setMundoSeleccionado] = useState(1);
  const [tipoEjercicio, setTipoEjercicio] = useState('aproximacion');
  const [puntoObjetivo, setPuntoObjetivo] = useState(2);
  const [tolerancia, setTolerancia] = useState(0.1);
  const [funcion, setFuncion] = useState('x^2');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.tipo !== 'docente') {
      navigate('/mundos');
    }
  }, []);

  const handleCrearEjercicio = () => {
    alert('Ejercicio creado exitosamente');
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-800 to-blue-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <button
              onClick={() => navigate('/docente')}
              className="text-white hover:text-gray-300 mb-4 flex items-center"
            >
              ← Volver al Dashboard
            </button>
            <h1 className="text-4xl font-bold text-white mb-2">
              Generador de Ejercicios 📝
            </h1>
          </div>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
          >
            Cerrar Sesión
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Crear Nuevo Ejercicio</h2>

          <div className="space-y-6">
            {/* Mundo */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Mundo
              </label>
              <select
                value={mundoSeleccionado}
                onChange={(e) => setMundoSeleccionado(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                  <option key={n} value={n}>Mundo {n}</option>
                ))}
              </select>
            </div>

            {/* Tipo de Ejercicio */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Tipo de Ejercicio
              </label>
              <select
                value={tipoEjercicio}
                onChange={(e) => setTipoEjercicio(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="aproximacion">Aproximación</option>
                <option value="observacion">Observación</option>
                <option value="precision">Precisión</option>
              </select>
            </div>

            {/* Función */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Función
              </label>
              <input
                type="text"
                value={funcion}
                onChange={(e) => setFuncion(e.target.value)}
                placeholder="x^2, 2x+1, sen(x), etc."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Punto Objetivo */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Punto Objetivo (a)
              </label>
              <input
                type="number"
                value={puntoObjetivo}
                onChange={(e) => setPuntoObjetivo(Number(e.target.value))}
                step="0.1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Tolerancia */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Tolerancia (ε)
              </label>
              <input
                type="number"
                value={tolerancia}
                onChange={(e) => setTolerancia(Number(e.target.value))}
                step="0.01"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Vista Previa */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <h3 className="font-bold text-blue-800 mb-2">Vista Previa:</h3>
              <p className="text-gray-700">
                lim(x→{puntoObjetivo}) {funcion} = ?
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Tolerancia: ±{tolerancia}
              </p>
            </div>

            {/* Botón Crear */}
            <button
              onClick={handleCrearEjercicio}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold py-4 rounded-xl hover:from-green-700 hover:to-blue-700 transition shadow-lg"
            >
              Crear Ejercicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}