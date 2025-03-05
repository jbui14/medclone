import React, { useEffect, useState } from "react";
import axios from "axios";
import FileUpload from './FileUpload';

const Dashboard = () => {
  const [username, setUsername] = useState(null);
  const [name, setName] = useState(null);
  const [records, setRecords] = useState([]);
  const [files, setFiles] = useState([]);

  // Fetch username
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const usernameResponse = await axios.get(
          "http://localhost:3001/api/user/getUsername"
        );
        console.log("Username API Response:", usernameResponse.data);
        setUsername(usernameResponse.data.username);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, []);

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfileResponse = await axios.get(
          "http://localhost:3001/api/user/getUserProfile"
        );
        console.log("User Profile API Response:", userProfileResponse.data);
        setName(userProfileResponse.data.name);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // Fetch medical records
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const recordsResponse = await axios.get(
          "http://localhost:3001/api/user/getRecords"
        );
        console.log("Records API Response:", recordsResponse.data);

        if (Array.isArray(recordsResponse.data)) {
          setRecords(recordsResponse.data);
        } else {
          console.error(
            "Unexpected API response format:",
            recordsResponse.data
          );
          setRecords([]);
        }
      } catch (error) {
        console.error("Error fetching medical records:", error);
        setRecords([]);
      }
    };

    fetchRecords();
  }, []);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/user/files", {
          withCredentials: true,
        });
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="p-2 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
      <span className="text-gray-700">
        {username ? `Hello, ${username}!` : "Loading..."}
      </span>
      <span className="text-gray-700">
        {name ? `Name: ${name}` : ""}
      </span>

      {/* File Upload Section */}
      <div className="mt-4">
        <h3 className="text-2xl font-bold mb-2">Upload Your Files</h3>
        <FileUpload />
      </div>

      {/* Records */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {records.length > 0 ? (
          records.map((record) => (
            <div key={record.record_id} className="text-center">
              <div className="bg-gray-400 p-12 rounded-lg shadow-lg text-black text-center cursor-pointer hover:bg-gray-500 transition">
                <p className="text-xl font-bold">Record</p>
              </div>
              <div className="mt-2 text-sm text-gray-700">
                <p className="font-semibold">{record.record_type}</p>
                <p>{record.record_details}</p>
                <p className="text-xs">
                  {new Date(record.created_date).toDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No records found.</p>
        )}
      </div>

      {/* Files */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {files.length > 0 ? (
          files.map((file) => (
            <div key={file.file_name} className="text-center">
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                <div className="bg-gray-400 p-12 rounded-lg shadow-lg text-black text-center cursor-pointer hover:bg-gray-500 transition">
                  <p className="text-xl font-bold">{file.original_name}</p>
                </div>
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No files found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;