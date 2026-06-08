import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // To'g'ri import
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes';
import './i18n';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter> {/* Mana shu yerda aniq ko'rinib turadi */}
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;