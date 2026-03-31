// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/ForgotPassword"; // opsional
import PrivateRoute from "./hooks/PrivateRoute";
import MainLayout from "./layouts/MainLayout"; // layout yang sudah dibuat sebelumnya

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route element={<PrivateRoute />}>
        <Route path="/*" element={<MainLayout />} />
      </Route>
    </Routes>
  
  );
}

export default App;