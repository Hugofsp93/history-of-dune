import React, { useState, useEffect, useRef } from 'react';
import TimelineEvent from './TimelineEvent';
import './TimelineEra.css';

const TimelineEra = ({ era, eraIndex, onEventClick, isAnimating }) => {
  const [isVisible, setIsVisible] = useState(false);
  const eraRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (eraRef.current) {
      observer.observe(eraRef.current);
    }

    return () => {
      if (eraRef.current) {
        observer.unobserve(eraRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={eraRef}
      className={`timeline-era ${isVisible ? 'visible' : ''} ${isAnimating ? 'animating' : ''}`}
      style={{ animationDelay: `${eraIndex * 0.2}s` }}
    >
      {/* Era Header */}
      <div className="era-header">
        <div className="era-title-container">
          <h2 className="era-title">{era.name}</h2>
          <p className="era-description">{era.description}</p>
        </div>
        <div className={`era-accent ${era.color}`}></div>
      </div>

      {/* Era Events */}
      <div className="era-events">
        {era.events.map((event, eventIndex) => (
          <TimelineEvent
            key={event.id}
            event={event}
            index={eventIndex}
            eraIndex={eraIndex}
            onClick={() => onEventClick(event)}
          />
        ))}
      </div>

      {/* Era Separator */}
      {eraIndex < 4 && (
        <div className="era-separator">
          <div className="separator-line"></div>
          <div className="separator-dot"></div>
        </div>
      )}
    </div>
  );
};

export default TimelineEra; 