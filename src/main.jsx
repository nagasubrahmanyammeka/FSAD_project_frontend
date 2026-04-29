import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import AuthProvider from './context/AuthContext';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import enTranslations from './locales/en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </I18nextProvider>
  </React.StrictMode>
);