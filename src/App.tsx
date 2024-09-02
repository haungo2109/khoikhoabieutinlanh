import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from "./pages/home";
import RegisterPage from "./pages/register";
import NotFoundPage from "./pages/404";
import "./App.css";

const App = () => {
  const userName = localStorage.getItem('userName');

  return (
    <Router>
    <Routes>
      <Route 
        path="/"
        element={userName ? <HomePage /> : <Navigate to="/register" />}
      />
      <Route 
        path="/register"
        element={<RegisterPage />}
      />
      {/* Redirect bất kỳ URL không hợp lệ về trang chính */}
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  </Router>
  );
}

export default App;
