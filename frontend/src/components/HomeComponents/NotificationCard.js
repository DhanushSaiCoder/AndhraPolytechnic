// NotificationCard.jsx
import { Calendar } from "lucide-react";
import "../../styles/HomeStyles/NotificationCard.css"; // Adjust the path as necessary
const NotificationCard = ({ title, description, date }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="notification-card">
      <div className="notification-card-content">
        <h3 className="notification-card-title">{title}</h3>
        <p className="notification-card-description">{description}</p>
        <div className="notification-card-date">
          <Calendar className="notification-card-icon" />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
