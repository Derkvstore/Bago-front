import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';   
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Products from './pages/Products';

// 💡 Composant pour gérer la protection des routes
// Il vérifie si l'utilisateur est authentifié. Si ce n'est pas le cas, il redirige vers la page de connexion.
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    // Redirige vers la page de connexion si aucun token n'est trouvé
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Affiche le composant enfant si l'utilisateur est authentifié
  return children;
};

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Route pour la page de connexion */}
        <Route path="/login" element={<Login />} />
        
        {/* Routes pour les pages protégées */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <Clients />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        
        {/* 💡 Redirection par défaut vers la page de connexion */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 💡 Gérer les routes non trouvées (404) */}
        <Route path="*" element={
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold text-gray-700">404: Page non trouvée</h1>
          </div>
        } />

      </Routes>
    </Router>
  );
}
