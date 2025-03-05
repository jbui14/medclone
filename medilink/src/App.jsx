import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Signup from "./frontend/components/signup";
import Login from "./frontend/components/login";
import Dashboard from "./frontend/components/dashboard";
import Profile from "./frontend/components/profile";
import UpdateRecords from "./frontend/components/updaterecords";
import ViewRecords from "./frontend/components/viewrecords";
import Settings from "./frontend/components/settings";
import Notifications from "./frontend/components/notifications";
import Navbar from "./frontend/components/navbar";
import Footer from "./frontend/components/footer";
import Homepage from "./frontend/components/home";
import About from "./frontend/components/about";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/auth/check-auth",
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {/* Pass the authentication state to the Navbar */}
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Login onLoginSuccess={checkAuthStatus} />}
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/update-records"
          element={
            isAuthenticated ? <UpdateRecords /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/view-records"
          element={isAuthenticated ? <ViewRecords /> : <Navigate to="/login" />}
        />
        <Route
          path="/settings"
          element={isAuthenticated ? <Settings /> : <Navigate to="/login" />}
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated ? <Notifications /> : <Navigate to="/login" />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
