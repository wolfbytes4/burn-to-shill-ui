import React from "react";
import ReactDOM from "react-dom/client";

// Dependencies
import { BrowserRouter } from "react-router-dom";

// App
import "./assets/css/index.css";
import App from "./App";

// Root
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
