// NoticeBoard.jsx
import { Bell, Newspaper } from "lucide-react";
import NewsCard from "./NewsCard";
import NotificationCard from "./NotificationCard";

import "../../styles/HomeStyles/NoticeBoard.css"; // Adjust the path as necessary
const NoticeBoard = () => {
  const newsItems = [
    {
      id: 1,
      title: "New Semester Begins",
      description: "The new semester will start on 1st September. All students are requested to check their schedules.",
      date: "8/20/2023"
    },
    {
      id: 2,
      title: "Library Renovation",
      description: "The library will be closed for renovation from 5th to 15th September. We apologize for the inconvenience.",
      date: "8/22/2023"
    },
    {
      id: 3,
      title: "Guest Lecture on Data Science",
      description: "Join us for an exciting guest lecture on Data Science and Machine Learning on 20th September.",
      date: "8/25/2023"
    }
  ];

  const notifications = [
    {
      id: 1,
      title: "Campus Wi-Fi Upgrade",
      description: "The campus Wi-Fi will be upgraded on 2nd September. Expect brief outages during the day.",
      date: "8/31/2023"
    },
    {
      id: 2,
      title: "New Course Offerings",
      description: "We are excited to announce new courses in Data Science and Machine Learning starting this semester.",
      date: "8/30/2023"
    },
    {
      id: 3,
      title: "Registration Deadline",
      description: "Course registration deadline is approaching. Please complete your registration by September 5th.",
      date: "9/1/2023"
    }
  ];

  return (
    <div className="notice-board">
      <div className="notice-board-header">
        <h1 className="notice-board-title">News & Notifications</h1>
        <p className="notice-board-subtitle">
          Stay updated with the latest news and important notifications from our college community
        </p>
      </div>

      <div className="notice-board-grid">
        <div className="notice-section">
          <div className="notice-section-header">
            <div className="notice-section-icon news-icon">
              <Newspaper className="icon" />
            </div>
            <h2 className="notice-section-title">News</h2>
          </div>
          <div className="section-list">
            {newsItems.map((item) => (
              <NewsCard key={item.id} {...item} />
            ))}
          </div>
        </div>

        <div className="notice-section">
          <div className="notice-section-header">
            <div className="notice-section-icon notifications-icon">
              <Bell className="icon" />
            </div>
            <h2 className="notice-section-title">Notifications</h2>
          </div>
          <div className="section-list">
            {notifications.map((item) => (
              <NotificationCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
