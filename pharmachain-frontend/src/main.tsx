import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { WalletProvider } from "./context/WalletContext";
import { PharmaChainProvider } from "./context/PharmaChainContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <WalletProvider>
        <PharmaChainProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <App />
          </div>
        </PharmaChainProvider>
      </WalletProvider>
    </BrowserRouter>
  </React.StrictMode>
);