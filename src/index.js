import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import { store, persistor } from './redux/store'; // Import store and persistor

// Create MUI Theme
const theme = createTheme();

// Get root element
const rootElement = document.getElementById('root');

// Render the application
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </HashRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
