import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        {" "}
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();