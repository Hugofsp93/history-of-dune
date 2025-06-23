import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import TimelineEvent from './TimelineEvent';
import './TimelineEra.css';

const TimelineEra = React.memo(({ era, eraIndex, isActive, onEventClick, translations, language, isVisible: isVisibleProp = true }) => {
  const [isVisible, setIsVisible] = useState(isVisibleProp);
  const [isLoaded, setIsLoaded] = useState(false);
  const eraRef = useRef(null);

  // Atualizar visibilidade quando prop mudar
  useEffect(() => {
    setIsVisible(isVisibleProp);
    if (isVisibleProp && !isLoaded) {
      // Lazy load com delay para suavizar
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, eraIndex * 50); // Stagger loading
      return () => clearTimeout(timer);
    }
  }, [isVisibleProp, isLoaded, eraIndex]);

  // Otimizar o IntersectionObserver
  useEffect(() => {
    if (!isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
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
  }, [isVisible]);

  // Otimizar o callback do evento
  const handleEventClick = useCallback((event) => {
    onEventClick(event);
  }, [onEventClick]);

  // Memoizar eventos para evitar re-renders
  const memoizedEvents = useMemo(() => {
    if (!isLoaded) return [];
    
    return era.events.map((event, eventIndex) => (
      <TimelineEvent
        key={event.id}
        event={event}
        eventIndex={eventIndex}
        onEventClick={handleEventClick}
        translations={translations}
        language={language}
      />
    ));
  }, [era.events, handleEventClick, translations, language, isLoaded]);

  // Se não está visível, renderizar placeholder
  if (!isVisible) {
    return (
      <section 
        ref={eraRef}
        className="timeline-era placeholder"
        id={`era-${era.id}`}
        data-era-index={eraIndex}
        style={{ height: '200px', opacity: 0.3 }}
      />
    );
  }

  return (
    <section 
      ref={eraRef}
      className={`timeline-era ${isVisible ? 'visible' : ''} ${isActive ? 'active' : ''} ${isLoaded ? 'loaded' : ''}`}
      id={`era-${era.id}`}
      data-era-index={eraIndex}
    >
      <div className="era-header">
        <div className="era-marker">
          <div className="era-icon">{era.visual.icon}</div>
          <div className="era-line"></div>
        </div>
        <div className="era-info">
          <h2 className="era-title">{era.name}</h2>
          <p className="era-period">{era.period}</p>
          <p className="era-description">{era.description}</p>
        </div>
      </div>

      <div className="era-events">
        {memoizedEvents}
      </div>

      {era.events.length === 0 && (
        <div className="no-events">
          <p>{translations.ui.noEvents}</p>
        </div>
      )}

      {/* Era Separator - Otimizado */}
      {eraIndex < 4 && (
        <div className="era-separator">
          <div className="separator-line"></div>
          <div 
            className="separator-dot"
            style={{ background: era.visual.accentColor }}
          ></div>
        </div>
      )}
    </section>
  );
});

TimelineEra.displayName = 'TimelineEra';

export default TimelineEra; 