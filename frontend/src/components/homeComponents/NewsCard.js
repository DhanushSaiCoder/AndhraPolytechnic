// NewsCard.jsx
import { Calendar } from "lucide-react";
import "../../styles/HomeStyles/NewsCard.css"; // Adjust the path as necessary

const NewsCard = ({ title, description, date }) => {
  return (
    <div className="news-card">
      <div className="news-card-content">
        <h3 className="news-card-title">{title}</h3>
        <p className="news-card-description">{description}</p>
        <div className="news-card-date">
          <Calendar className="news-card-icon" />
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
