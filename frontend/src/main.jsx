import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import stylisRTLPlugin from "stylis-plugin-rtl";

import App from "./App";
import theme from "./theme"; // مسیر درست به theme
import "./index.css";

// ایجاد کش راست به چپ
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [stylisRTLPlugin],
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </CacheProvider>
  </React.StrictMode>
);
