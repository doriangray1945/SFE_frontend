import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store'; 

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/serviceWorker.js') // Указываем путь к Service Worker
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);