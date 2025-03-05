import { useState } from "react";

const Settings = () => {
  // used to see which setting is currently active
  const [activeSetting, setActiveSetting] = useState("staticQR");

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Settings</h2>

        {/* Settings options */}
        <div className="bg-gray-200 p-4 rounded-lg shadow-md flex justify-center space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-md transition ${
              activeSetting === "staticQR" ? "bg-gray-700 text-white" : "bg-white text-gray-700 hover:bg-gray-400"
            }`}
            onClick={() => setActiveSetting("staticQR")}
          >
            Static QR Code
          </button>

          <button
            className={`px-4 py-2 rounded-md transition ${
              activeSetting === "wearableQR" ? "bg-gray-700 text-white" : "bg-white text-gray-700 hover:bg-gray-400"
            }`}
            onClick={() => setActiveSetting("wearableQR")}
          >
            Wearable QR Code
          </button>

          <button
            className={`px-4 py-2 rounded-md transition ${
              activeSetting === "account" ? "bg-gray-700 text-white" : "bg-white text-gray-700 hover:bg-gray-400"
            }`}
            onClick={() => setActiveSetting("account")}
          >
            Account Settings
          </button>
        </div>

        {/* dynamic settings */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          {activeSetting === "staticQR" && (
            <div>
              <h3 className="text-xl font-bold mb-2">Static QR Code Settings</h3>
              <p className="text-gray-700">This section will contain settings for your static QR code.</p>
            </div>
          )}

          {activeSetting === "wearableQR" && (
            <div>
              <h3 className="text-xl font-bold mb-2">Wearable QR Code Settings</h3>
              <p className="text-gray-700">This section will contain settings for your wearable QR code.</p>
            </div>
          )}

          {activeSetting === "account" && (
            <div>
              <h3 className="text-xl font-bold mb-2">Account Settings</h3>
              <p className="text-gray-700">This section will contain your account settings.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Settings;