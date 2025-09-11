// NoticeBoard.jsx
import React, { useState, useEffect } from 'react';
import { Bell, Newspaper } from "lucide-react";
import NewsCard from "./NewsCard";
import NotificationCard from "./NotificationCard";
import newsService from '../../services/newsService'; // Import newsService
import notificationService from '../../services/notificationService'; // Import notificationService

import "../../styles/HomeStyles/NoticeBoard.css"; // Adjust the path as necessary
const NoticeBoard = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const newsResponse = await newsService.getNewsItems();
        setNewsItems(newsResponse.data);

        const notificationsResponse = await notificationService.getNotificationItems();
        setNotifications(notificationsResponse.data);
      } catch (error) {
        console.error('Error fetching notice board content:', error);
        // Optionally set empty arrays or show an error message
        setNewsItems([]);
        setNotifications([]);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="notice-board">
      {/* <div className="notice-board-header">
        <h1 className="notice-board-title">News & Notifications</h1>
        <p className="notice-board-subtitle">
          Stay updated with the latest news and important notifications from our college community
        </p>
      </div> */}

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
              <NewsCard key={item._id} {...item} />
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
              <NotificationCard key={item._id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
