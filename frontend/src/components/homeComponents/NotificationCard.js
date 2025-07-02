// NotificationCard.jsx
import { Calendar } from "lucide-react";
import "../../styles/HomeStyles/NotificationCard.css"; // Adjust the path as necessary
const NotificationCard = ({ title, description, date }) => {
  return (
    <div className="notification-card">
      <div className="notification-card-content">
        <h3 className="notification-card-title">{title}</h3>
        <p className="notification-card-description">{description}</p>
        <div className="notification-card-date">
          <Calendar className="notification-card-icon" />
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
