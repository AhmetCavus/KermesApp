import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import theme from './style/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "html, body, #root": { minHeight: "100%" },
          body: {
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/header.bg.png)`,
            backgroundRepeat: "repeat",          // tile both directions
            backgroundSize: "auto",              // keep original tile size (use "200px" if you want)
            backgroundPosition: "top left",
            backgroundAttachment: "scroll",      // scrolls with content
          },
        }}
      />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
