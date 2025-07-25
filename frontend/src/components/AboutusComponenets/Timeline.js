import React, { useEffect, useState } from 'react';
import '../../styles/AboutUsStyles/Timeline.css';

const Timeline = () => {
  const [animatedNodes, setAnimatedNodes] = useState(new Set());
  const [isVisible, setIsVisible] = useState(false);

  const events = [
    { year: '1946', label: 'Established 1946', id: '1946' },
    { year: '1988', label: 'AICTE Accreditation', id: '1988' },
    { year: '2023', label: 'NBA Accreditation', id: '2023' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            events.forEach((event, index) => {
              setTimeout(() => {
                setAnimatedNodes((prev) => new Set([...prev, event.id]));
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const timelineElement = document.getElementById('timeline-container');
    if (timelineElement) {
      observer.observe(timelineElement);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="timeline-section">
      <div className="timeline-container">
        <h2 className="timeline-title">Timeline</h2>

        {/* Desktop Timeline */}
        <div id="timeline-container" className="timeline-desktop">
          <div className="timeline-line">
            <div
              className="timeline-line-fill"
              style={{ width: isVisible ? '100%' : '0%' }}
            />
          </div>

          <div className="timeline-events">
            {events.map((event) => (
              <div
                key={event.id}
                className="timeline-event group"
                role="listitem"
                aria-label={`${event.year} ${event.label}`}
              >
                <div className="timeline-year">{event.year}</div>
                <div
                  className={`timeline-node ${
                    animatedNodes.has(event.id)
                      ? 'active-node'
                      : 'inactive-node'
                  }`}
                />
                <div
                  className={`timeline-card ${
                    animatedNodes.has(event.id)
                      ? 'active-card'
                      : 'inactive-card'
                  }`}
                >
                  <p>{event.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="timeline-mobile">
          {events.map((event, index) => (
            <div
              key={event.id}
              className={`timeline-mobile-card ${isVisible ? 'visible' : 'hidden'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              role="listitem"
              aria-label={`${event.year} ${event.label}`}
            >
              <span className="mobile-year">{event.year}</span>
              <p>{event.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
