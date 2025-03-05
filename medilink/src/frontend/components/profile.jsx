import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleProfileCompletion = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/user/profile",
        { username, name, date_of_birth: dateOfBirth, address, phone_number: phoneNumber }
      );
      setMessage(response.data.message);
      navigate("/view-records");
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-white text-2xl font-semibold mb-6 text-center">
          Complete Your Profile
        </h2>
        {message && (
          <p
            className={`text-center mb-4 ${
              message.includes("success") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
        <input
          className="w-full p-3 mb-3 bg-gray-700 text-white rounded-lg"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          className="w-full p-3 mb-3 bg-gray-700 text-white rounded-lg"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          className="w-full p-3 mb-3 bg-gray-700 text-white rounded-lg"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          placeholder="Date of Birth"
        />
        <input
          className="w-full p-3 mb-3 bg-gray-700 text-white rounded-lg"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        <input
          className="w-full p-3 mb-6 bg-gray-700 text-white rounded-lg"
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
        />
        <button
          onClick={handleProfileCompletion}
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mb-4"
        >
          Complete Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;