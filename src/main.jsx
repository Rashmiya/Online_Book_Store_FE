import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { NotificationContextProvider } from './context/NotificationContext.jsx';
import { HomeAndNotificationContextProvider } from './context/HomeAndNotificationContext.jsx';
import { BookContextProvider } from './context/BookContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <NotificationContextProvider>
        <HomeAndNotificationContextProvider>
          <BookContextProvider>
            <App />
          </BookContextProvider>
        </HomeAndNotificationContextProvider>
      </NotificationContextProvider>
    </AuthProvider>
  </StrictMode>
);
