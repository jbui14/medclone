import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loginPic from "../../assets/loginpic.png"; // same background image

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setMessage("");
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/signup",
        {
          email,
          password,
        }
      );
      setMessage(response.data.message || "Account created successfully.");
      // Navigate somewhere, e.g., login page or home:
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }

    // Clear fields
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="relative w-full md:w-1/2 h-64 md:h-auto">
        <img
          src={loginPic}
          alt="Sign Up"
          className="w-full h-full object-cover"
        />
        <div className="absolute left-10 right-10 top-2/4 text-black-500">
          <h1 className="text-3xl font-extrabold">
            MediLink: Empowering Patients
          </h1>
          <p className="text-lg mt-4">
            MediLink is a patient-centric platform that allows users to view and
            update their medical records, view notifications, and manage
            wearable settings.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 bg-gray-200 flex flex-col justify-center p-10">
        <div className="max-w-sm w-full">
          <h3 className="text-2xl font-semibold mb-3">Create an Account</h3>
          <p className="text-sm text-gray-700 mb-4">
            Join MediLink! Please fill in the form below.
          </p>

          {/* Input Fields */}
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

          {/* Error/Success Message */}
          {message && (
            <p className="text-center mt-3 text-red-500">{message}</p>
          )}

          {/* Sign Up Button */}
          <div className="flex flex-col space-y-3 mt-6">
            <button
              onClick={handleSignUp}
              className="w-full text-white font-semibold bg-black rounded-md py-3 hover:bg-gray-800"
            >
              Sign Up
            </button>
          </div>

          {/* Already have an account */}
          <p className="text-sm mt-4">
            Already have an account?{" "}
            <span
              className="font-semibold underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Sign in here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
