// frontend/src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import stylisRTLPlugin from "stylis-plugin-rtl";
import { ThemeProvider, CssBaseline } from "@mui/material";

import App from "./App.jsx";
import store from "./redux/store.js";
import { createAppTheme } from "./theme/index.js";

// Emotion cache برای RTL
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [stylisRTLPlugin],
});

function Root() {
  // خواندن حالت تم از Redux
  const mode = useSelector((state) => state.ui.mode);
  const theme = createAppTheme(mode);

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          {/* SnackbarProvider در بالای اپ */}
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <App />
          </SnackbarProvider>{" "}
        </BrowserRouter>
      </ThemeProvider>
    </CacheProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>
);
