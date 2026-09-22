import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthCard from "./components/AuthCard";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<AuthCard isSignin={false} />} />
        <Route path="/signin" element={<AuthCard isSignin={true} />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
