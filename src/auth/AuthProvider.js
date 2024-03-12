// AuthProvider.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // Aquí podrías realizar una llamada a tu backend para autenticar al usuario
    // Por simplicidad, solo establecemos isAuthenticated como true
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Aquí podrías realizar una llamada a tu backend para cerrar sesión
    // Por simplicidad, solo establecemos isAuthenticated como false
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
