import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [profile, setProfile] = useState({ name: "", email: "", date_of_birth: "", address: "", phone_number: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/user/getPatientProfile");
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="bg-gray-200 p-6 rounded-lg shadow-md mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Quick Profile</h2>
            <p className="text-gray-700">Name: {profile.name || "Loading..."}</p>
            <p className="text-gray-700">Email: {profile.email || "Loading..."}</p>
            <p className="text-gray-700">Date of Birth: {profile.date_of_birth || "Loading..."}</p>
            <p className="text-gray-700">Address: {profile.address || "Loading..."}</p>
            <p className="text-gray-700">Phone: {profile.phone_number || "Loading..."}</p>
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
            onClick={() => navigate("/profile")}
          >
            Edit Profile
          </button>
        </div>

        {/* records */}
        <h2 className="text-2xl font-bold mb-4">View Records</h2>
        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search records..."
            className="p-3 border border-gray-400 rounded-md w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* first row */}
          {[
            { file: "Medical Report.pdf", date: "Jan 10, 2025" },
            { file: "Prescription.jpg", date: "Feb 3, 2025" },
            { file: "Lab Results.pdf", date: "Mar 1, 2025" },
            { file: "XRay Scan.png", date: "Apr 20, 2025" }
          ].map((record, index) => (
            <div key={index} className="text-center">
              <div className="bg-gray-400 p-6 rounded-lg shadow-lg text-black text-center">
                <p className="text-lg font-bold">{record.file}</p>
              </div>
              <div className="mt-2 text-sm text-gray-700">
                <p className="font-semibold">Uploaded: {record.date}</p>
              </div>
            </div>
          ))}

          {/* Second Row (Placeholders) */}
          {[
            { file: "Blood Test.pdf", date: "May 5, 2025" },
            { file: "MRI Scan.jpg", date: "June 12, 2025" },
            { file: "EKG Report.pdf", date: "July 8, 2025" },
            { file: "Ultrasound.png", date: "Aug 15, 2025" }
          ].map((record, index) => (
            <div key={index} className="text-center">
              <div className="bg-gray-400 p-6 rounded-lg shadow-lg text-black text-center">
                <p className="text-lg font-bold">{record.file}</p>
              </div>
              <div className="mt-2 text-sm text-gray-700">
                <p className="font-semibold">Uploaded: {record.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Load more button (might remove) */}
        <div className="mt-6 flex justify-center">
          <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-700">
            Load More
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewRecords;
