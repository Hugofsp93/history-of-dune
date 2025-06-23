import React, { useState, useEffect, useRef, useCallback, useMemo, useLayoutEffect } from 'react';
import TimelineEra from './TimelineEra';
import { useLanguage } from '../../hooks/useLanguage';
import { languages, formatDate } from '../../locales';
import ptTranslations from '../../locales/pt.json';
import enTranslations from '../../locales/en.json';
import ptData from '../../data/eras-pt.json';
import enData from '../../data/eras-en.json';
import './TimelineSkeleton.css';

const TimelineSkeleton = () => {
  const { language, changeLanguage } = useLanguage();
  const [currentEraIndex, setCurrentEraIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [visibleEras, setVisibleEras] = useState(new Set([0, 1])); // Lazy loading
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  // Memoizar dados para evitar re-cálculos desnecessários
  const { erasData, translations, currentEra } = useMemo(() => {
    const data = language === 'pt' ? ptData : enData;
    const trans = language === 'pt' ? ptTranslations : enTranslations;
    return {
      erasData: data,
      translations: trans,
      currentEra: data.eras[currentEraIndex]
    };
  }, [language, currentEraIndex]);

  // Otimizar handleEraChange com debounce
  const handleEraChange = useCallback((newIndex) => {
    if (newIndex === currentEraIndex) return;
    
    // Debounce para evitar mudanças muito frequentes
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(true);
      setCurrentEraIndex(newIndex);
      
      // Aplicar transição visual
      const container = containerRef.current;
      if (container) {
        const era = erasData.eras[newIndex];
        container.style.setProperty('--current-background', era.visual.background);
        container.style.setProperty('--current-accent', era.visual.accentColor);
        container.style.setProperty('--current-text', era.visual.textColor);
        container.style.setProperty('--current-theme', era.visual.theme);
      }

      setTimeout(() => setIsTransitioning(false), 500); // Aumentado para 500ms
    }, 150); // Aumentado de 50ms para 150ms para scroll mais lento
  }, [currentEraIndex, erasData.eras]);

  // Otimizar handleEventClick
  const handleEventClick = useCallback((event) => {
    setSelectedEvent(event);
  }, []);

  // Otimizar handleLanguageChange
  const handleLanguageChange = useCallback((newLanguage) => {
    changeLanguage(newLanguage);
    setCurrentEraIndex(0);
    setSelectedEvent(null);
    setVisibleEras(new Set([0, 1])); // Reset visible eras
  }, [changeLanguage]);

  // Lazy loading de eras baseado no scroll
  const handleScroll = useCallback(() => {
    const windowHeight = window.innerHeight;
    const newVisibleEras = new Set();
    
    erasData.eras.forEach((era, index) => {
      const element = document.getElementById(`era-${era.id}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < windowHeight + 200 && rect.bottom > -200;
        if (isVisible) {
          newVisibleEras.add(index);
          // Pré-carregar próximas eras
          if (index + 1 < erasData.eras.length) newVisibleEras.add(index + 1);
          if (index + 2 < erasData.eras.length) newVisibleEras.add(index + 2);
        }
      }
    });
    
    setVisibleEras(newVisibleEras);
  }, [erasData.eras]);

  // Usar useLayoutEffect para evitar flickering
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (container && currentEra) {
      container.style.setProperty('--current-background', currentEra.visual.background);
      container.style.setProperty('--current-accent', currentEra.visual.accentColor);
      container.style.setProperty('--current-text', currentEra.visual.textColor);
      container.style.setProperty('--current-theme', currentEra.visual.theme);
    }
  }, [currentEra]);

  // IntersectionObserver otimizado com throttle
  useEffect(() => {
    if (!observerRef.current) {
      let ticking = false;
      
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (!ticking) {
            requestAnimationFrame(() => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  const eraIndex = parseInt(entry.target.dataset.eraIndex);
                  if (eraIndex !== currentEraIndex) {
                    handleEraChange(eraIndex);
                  }
                }
              });
              ticking = false;
            });
            ticking = true;
          }
        },
        {
          threshold: 0.5, // Aumentado de 0.3 para 0.5 - precisa estar mais visível
          rootMargin: '-20% 0px -20% 0px' // Aumentado de -10% para -20% - zona de ativação maior
        }
      );
    }

    // Observar elementos das eras
    const eraElements = document.querySelectorAll('.timeline-era');
    eraElements.forEach((element) => {
      observerRef.current.observe(element);
    });

    // Adicionar listener de scroll otimizado
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [erasData.eras, handleEraChange, currentEraIndex, handleScroll]);

  return (
    <div 
      ref={containerRef}
      className={`timeline-skeleton ${isTransitioning ? 'transitioning' : ''}`}
    >
      {/* Language Selector */}
      <div className="language-selector">
        {Object.entries(languages).map(([code, lang]) => (
          <button
            key={code}
            className={`lang-button ${language === code ? 'active' : ''}`}
            onClick={() => handleLanguageChange(code)}
            title={lang.name}
          >
            <span className="lang-flag">{lang.flag}</span>
            <span className="lang-code">{code.toUpperCase()}</span>
          </button>
        ))}
      </div>

      {/* Background Dynamic - Simplificado */}
      <div className="dynamic-background">
        <div className="background-overlay"></div>
        <div className={`particles-container ${currentEra.visual.particles}`}></div>
      </div>

      {/* Header */}
      <div className="header-content">
        <h1 className="main-title">{translations.header.title}</h1>
        <p className="subtitle">{translations.header.subtitle}</p>
      </div>

      {/* Timeline Content - Com lazy loading */}
      <div className="timeline-content">
        {erasData.eras.map((era, eraIndex) => (
          <TimelineEra
            key={era.id}
            era={era}
            eraIndex={eraIndex}
            isActive={eraIndex === currentEraIndex}
            onEventClick={handleEventClick}
            translations={translations}
            language={language}
            isVisible={visibleEras.has(eraIndex)}
          />
        ))}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="event-modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="event-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="event-icon">{selectedEvent.visual?.icon}</div>
              <div className="event-info">
                <h3>{selectedEvent.title}</h3>
                <p>{formatDate(selectedEvent.date, language)} • {selectedEvent.location}</p>
              </div>
              <button className="close-button" onClick={() => setSelectedEvent(null)}>
                {translations.ui.close}
              </button>
            </div>
            <div className="modal-content">
              <p>{selectedEvent.description}</p>
              {selectedEvent.characters && (
                <div className="characters-section">
                  <h4>{translations.ui.characters}</h4>
                  <div className="character-tags">
                    {selectedEvent.characters.map((char, index) => (
                      <span key={index} className="character-tag">{char}</span>
                    ))}
                  </div>
                </div>
              )}
              {selectedEvent.impact && (
                <div className="impact-section">
                  <h4>{translations.ui.impact}</h4>
                  <p>{selectedEvent.impact}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineSkeleton; 