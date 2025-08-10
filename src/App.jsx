import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Accueil from '.pages/Accueil'; // Assurez-vous que le composant Accueil est dans le même dossier ou ajustez le chemin
import Login from '.pages/Login';   // Assurez-vous que le composant Login est dans le même dossier ou ajustez le chemin

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
        
        {/* Route pour la page d'accueil (tableau de bord) protégée */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Accueil />
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
