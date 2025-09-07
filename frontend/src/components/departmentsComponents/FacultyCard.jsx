// FacultyCard.jsx
// Place the JS code in `FacultyCard.jsx` and the CSS in `FacultyCard.css` (both provided below).
// Usage: import './FacultyCard.css';
// <FacultyCard imageUrl="/path.jpg" name="Dr. Jane Doe" designation="Head of Department" specialization="Machine Learning & AI" socials={[{type:'linkedin', url:'...'}, {type:'email', url:'mailto:...'}]} active={true} />

import React from 'react';

export default function FacultyCard({
  imageUrl,
  name,
  designation,
  specialization,
  socials = [],
  active = false,
  onClick = null,
}) {
  const socialIcon = (type) => {
    switch (type) {
      case 'linkedin':
        return (
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
            <path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6C1.12 6 0 4.88 0 3.5C0 2.12 1.12 1 2.5 1C3.9 1 4.98 2.12 4.98 3.5zM0 8h5v16H0zM8 8h4.8v2.2h.1c.67-1.27 2.3-2.6 4.7-2.6 5 0 5.9 3.3 5.9 7.6V24h-5V16.2c0-1.9 0-4.4-2.7-4.4-2.7 0-3.1 2.1-3.1 4.3V24H8z" />
          </svg>
        );
      case 'twitter':
        return (
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
            <path fill="currentColor" d="M24 4.6c-.9.4-1.8.6-2.8.7.99-.6 1.7-1.5 2-2.6-.9.5-2 .9-3.1 1.2C19 2 17.8 1.5 16.4 1.5c-2.7 0-4.8 2.3-4.3 5C8.1 6 4.3 4 1.7 1.1.2 4 .9 8 3.9 9.6c-.8 0-1.6-.2-2.3-.6v.1c0 2.4 1.6 4.4 3.8 4.9-.7.2-1.5.3-2.3.1.6 2 2.4 3.4 4.5 3.4-2 1.6-4.6 2.4-7.1 2 .5 1.6 2 2.7 3.7 2.8C3.4 21.6 6 22.3 8.8 22.3c9.1 0 14.1-7.7 14.1-14.4V6c1-.7 1.8-1.6 2.4-2.5-.9.4-1.8.6-2.8.7z" />
          </svg>
        );
      case 'email':
      default:
        return (
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
            <path fill="currentColor" d="M12 13.5L0 5.5V20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V5.5L12 13.5zM12 11L24 3H0l12 8z" />
          </svg>
        );
    }
  };

  return (
    <article
      className={`faculty-card ${active ? 'active' : ''}`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) onClick(e);
      }}
      aria-pressed={active}
    >
      <div className="faculty-card__image-wrap" aria-hidden="true">
        <div className="faculty-card__image-mask">
          <img src={imageUrl} alt={`Photo of ${name}`} className="faculty-card__image" />
        </div>
      </div>

      <div className="faculty-card__content">
        <div className="faculty-card__header">
          <h3 className="faculty-card__name">{name}</h3>
          <p className="faculty-card__designation">{designation}</p>
        </div>

        <p className="faculty-card__specialization">{specialization}</p>

        <div className="faculty-card__footer">
          <div className="faculty-card__socials">
            {socials.map((s, idx) => (
              <a
                key={idx}
                className="faculty-card__social"
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} on ${s.type}`}
                onClick={(e) => e.stopPropagation()}
              >
                <span className="visually-hidden">{s.type}</span>
                {socialIcon(s.type)}
              </a>
            ))}
          </div>

          <button
            type="button"
            className="faculty-card__cta"
            onClick={(e) => {
              e.stopPropagation();
              if (onClick) onClick(e);
            }}
          >
            View Profile
          </button>
        </div>
      </div>
    </article>
  );
}