import React, { useState } from 'react';
import './TimelineEvent.css';

const TimelineEvent = ({ event, index, eraIndex, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className="timeline-event-container"
      style={{ 
        animationDelay: `${(eraIndex * 0.2) + (index * 0.1)}s`,
        marginLeft: index % 2 === 0 ? '0' : 'auto',
        marginRight: index % 2 === 0 ? 'auto' : '0',
        maxWidth: '45%'
      }}
    >
      <div
        className={`timeline-event ${isHovered ? 'hovered' : ''}`}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Timeline Line */}
        <div className="timeline-line">
          <div className="timeline-dot"></div>
        </div>

        {/* Event Content */}
        <div className="event-content">
          <div className="event-header">
            <h3 className="event-title">{event.title}</h3>
            <div className="event-meta">
              <span className="event-date">{event.date}</span>
              <span className="event-location">{event.location}</span>
            </div>
          </div>
          
          <p className="event-description">{event.description}</p>
          
          {event.characters && (
            <div className="event-characters">
              {event.characters.slice(0, 3).map((character, idx) => (
                <span key={idx} className="character-tag">
                  {character}
                </span>
              ))}
              {event.characters.length > 3 && (
                <span className="character-more">
                  +{event.characters.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Hover Effect Overlay */}
          <div className="event-overlay">
            <span className="overlay-text">Clique para mais detalhes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineEvent; 