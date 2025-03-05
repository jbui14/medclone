import { useState } from "react";

const Notifications = () => {
  // hardcoded list
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New medical report available.", isRead: false },
    { id: 2, text: "Upcoming doctor’s appointment tomorrow.", isRead: false },
    { id: 3, text: "Your wearable device synced successfully.", isRead: true },
    { id: 4, text: "Reminder: Update your emergency contact info.", isRead: false }
  ]);

  // make a notification read/unread for a single notification
  const toggleReadStatus = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, isRead: !notification.isRead } : notification
      )
    );
  };

  // mark all as read
  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Notifications</h2>

        {/* Mark All as Read Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={markAllAsRead}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
          >
            Mark All as Read
          </button>
        </div>

        {/* list */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 mb-2 rounded-md flex justify-between items-center ${
                  notification.isRead ? "bg-gray-300 text-gray-700" : "bg-blue-100 text-blue-900"
                }`}
              >
                <span>{notification.text}</span>
                <button
                  onClick={() => toggleReadStatus(notification.id)}
                  className="text-sm text-white px-3 py-1 rounded-md transition bg-gray-600 hover:bg-gray-800"
                >
                  {notification.isRead ? "Mark as Unread" : "Mark as Read"}
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No notifications</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Notifications;