import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Homepage from './pages/Homepage';
import PracticaAlgebra from './pages/PracticaAlgebra';
import EjerciciosFactorizacion from './pages/EjerciciosFactorizacion';
import EjerciciosRacionalizacion from './pages/EjerciciosRacionalizacion';
import Login from './pages/Login';
import DocenteDashboard from './pages/DocenteDashboard';
import DocenteGamificacion from './pages/DocenteGamificacion';
import DocenteEjercicios from './pages/DocenteEjercicios';
import Mundos from './pages/Mundos';
import Game1 from './pages/Game1';
import Game2 from './pages/Game2';
import Game3 from './pages/Game3';

// Componente para rutas protegidas
function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/practica" element={<PracticaAlgebra />} />
            <Route path="/practica/factorizacion" element={<EjerciciosFactorizacion />} />
            <Route path="/practica/racionalizacion" element={<EjerciciosRacionalizacion />} />
            <Route path="/login" element={<Login />} />
            <Route
                path="/mundos"
                element={
                    <ProtectedRoute>
                        <Mundos />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/docente"
                element={
                    <ProtectedRoute>
                        <DocenteDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/docente/gamificacion"
                element={
                    <ProtectedRoute>
                        <DocenteGamificacion />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/docente/ejercicios"
                element={
                    <ProtectedRoute>
                        <DocenteEjercicios />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/game1"
                element={
                    <ProtectedRoute>
                        <Game1 />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/game2"
                element={
                    <ProtectedRoute>
                        <Game2 />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/game3"
                element={
                    <ProtectedRoute>
                        <Game3 />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </Router>
    );
}

export default App;