import { NavLink } from "react-router-dom";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const Navbar = ({ isAuthenticated }) => {
  // Only render the full navbar if the user is authenticated.
  if (!isAuthenticated) {
    return null;
  }

  const [showQR, setShowQR] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  const handleExport = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/user/share", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.shareId) {
        const url = `http://localhost:3001/shared/${data.shareId}`;
        setShareUrl(url);
        setShowQR(true);
      }
    } catch (error) {
      console.error("Error generating share link:", error);
    }
  };

  return (
    <div className="bg-gray-200 shadow-md">
      {/* Top Banner */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-5xl font-bold">MediLink</h1>
        <div className="flex items-center space-x-6">
          <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 transition">
            Import Data
          </button>
          <button
            onClick={handleExport}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
          >
            Export Data
          </button>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">
              Scan QR Code to View Records
            </h2>
            <QRCodeSVG value={shareUrl} size={256} />
            <div className="mt-2 text-sm text-gray-600 break-all">
              <p>Share URL:</p>
              <a
                href={shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {shareUrl}
              </a>
            </div>
            <button
              onClick={() => setShowQR(false)}
              className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <nav className="flex justify-center space-x-8 border-t border-gray-300 py-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `font-medium px-4 py-2 rounded-md transition ${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-700 hover:bg-gray-600 hover:text-white"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/update-records"
          className={({ isActive }) =>
            `font-medium px-4 py-2 rounded-md transition ${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-700 hover:bg-gray-600 hover:text-white"
            }`
          }
        >
          Update Records
        </NavLink>

        <NavLink
          to="/view-records"
          className={({ isActive }) =>
            `font-medium px-4 py-2 rounded-md transition ${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-700 hover:bg-gray-600 hover:text-white"
            }`
          }
        >
          View Records
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `font-medium px-4 py-2 rounded-md transition ${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-700 hover:bg-gray-600 hover:text-white"
            }`
          }
        >
          Settings
        </NavLink>

        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `font-medium px-4 py-2 rounded-md transition ${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-700 hover:bg-gray-600 hover:text-white"
            }`
          }
        >
          View Notifications
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
