import React, { useCallback } from 'react';
import { formatDate } from '../../locales';
import './TimelineEvent.css';

const TimelineEvent = React.memo(({ event, eventIndex, onEventClick, translations, language }) => {
  const isEven = eventIndex % 2 === 0;
  const isLeft = isEven;

  // Otimizar o callback do clique
  const handleClick = useCallback(() => {
    onEventClick(event);
  }, [onEventClick, event]);

  return (
    <div 
      className={`timeline-event ${isLeft ? 'left' : 'right'} ${event.visual?.type || 'default'}`}
      onClick={handleClick}
      style={{ animationDelay: `${eventIndex * 0.05}s` }} // Reduzido de 0.1s para 0.05s
    >
      <div className="event-marker">
        <div className="event-icon">{event.visual?.icon || '📅'}</div>
        <div className="event-line"></div>
      </div>
      
      <div className="event-card">
        <div className="event-header">
          <h3 className="event-title">{event.title}</h3>
          <div className="event-meta">
            <span className="event-date">{formatDate(event.date, language)}</span>
            {event.location && (
              <span className="event-location">• {event.location}</span>
            )}
          </div>
        </div>
        
        <div className="event-content">
          <p className="event-description">{event.description}</p>
          
          {event.characters && event.characters.length > 0 && (
            <div className="event-characters">
              <span className="characters-label">{translations.ui.characters}:</span>
              <div className="character-tags">
                {event.characters.slice(0, 3).map((char, index) => (
                  <span key={index} className="character-tag">{char}</span>
                ))}
                {event.characters.length > 3 && (
                  <span className="character-more">+{event.characters.length - 3}</span>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="event-footer">
          <button className="read-more">
            {translations.ui.readMore}
          </button>
        </div>
      </div>
    </div>
  );
});

TimelineEvent.displayName = 'TimelineEvent';

export default TimelineEvent; 