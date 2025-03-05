import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import google from "../../assets/google.svg";
import loginPic from "../../assets/loginpic.png"; // same background image

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setMessage("");
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      // Call the auth check function after successful login
      await onLoginSuccess();

      setMessage(response.data?.message || "Login successful.");
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }

    // Optionally clear fields
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section - Background Image & Text */}
      <div className="relative w-full md:w-1/2 h-64 md:h-auto">
        <img
          src={loginPic}
          alt="Login Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1/4 left-10 right-10 text-white">
          <h1 className="text-3xl font-extrabold">
            MediLink: Empowering Patients
          </h1>
          <p className="text-lg mt-2">
            MediLink is a patient-centric platform that allows users to view and
            update their medical records, view notifications, and manage
            wearable settings.
          </p>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full md:w-1/2 bg-gray-200 flex flex-col justify-center p-10">
        <div className="max-w-sm w-full">
          <h3 className="text-2xl font-semibold mb-3">Welcome Back!</h3>
          <p className="text-sm text-gray-700 mb-4">
            Please enter your login details.
          </p>

          {/* Login Fields */}
          <div className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Email"
              className="w-full text-black py-2 px-3 border border-gray-400 rounded-md focus:outline-none focus:border-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full text-black py-2 px-3 border border-gray-400 rounded-md focus:outline-none focus:border-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Display any server messages */}
          {message && (
            <p className="text-center mt-3 text-red-500">{message}</p>
          )}

          {/* Login Button */}
          <div className="flex flex-col space-y-3 mt-6">
            <button
              onClick={handleLogin}
              className="w-full text-white font-semibold bg-black rounded-md py-3 hover:bg-gray-800"
            >
              Login
            </button>
          </div>

          {/* Divider with "or" */}
          <div className="relative flex items-center justify-center my-4">
            <div className="absolute w-full h-[1px] bg-gray-400"></div>
            <p className="text-gray-700 bg-gray-200 px-2 z-10">or</p>
          </div>

          {/* Google Login */}
          <button className="w-full flex items-center justify-center bg-white border-2 border-black rounded-md py-3 hover:bg-gray-100">
            <img src={google} alt="Google" className="h-5 mr-2" />
            <span>Sign in with Google</span>
          </button>

          {/* Sign Up Link */}
          <p className="text-sm mt-4">
            Don't have an account?{" "}
            <span
              className="font-semibold underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export default Login;
