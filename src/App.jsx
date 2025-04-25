import React from "react";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import BrandContextProvider from "./context/brandContext/BrandProvider";

const App = () => {
  return (
    <div>
      <BrandContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrandContextProvider>
    </div>
  );
};

export default App;
