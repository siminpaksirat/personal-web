import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from "./AppRoutes";

function App() {
  return (
    <>
    <React.StrictMode>
    <Router>
      <AppRoutes/>
    </Router>
    </React.StrictMode>
    </>
  )
}

export default App
