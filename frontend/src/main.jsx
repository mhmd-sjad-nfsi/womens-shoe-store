// frontend/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import stylisRTLPlugin from 'stylis-plugin-rtl';
import { ThemeProvider, CssBaseline } from '@mui/material';

import App from './App.jsx';
import store from './redux/store.js';
import theme from './theme/index.js';

// کش برای RTL
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [stylisRTLPlugin],
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  </React.StrictMode>
);
