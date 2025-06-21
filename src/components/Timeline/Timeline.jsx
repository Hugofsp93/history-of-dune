import React, { useState, useEffect } from 'react';
import TimelineEra from './TimelineEra';
import { timelineData } from '../../data/timelineData';
import './Timeline.css';

const Timeline = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Agrupar eventos por era
  const eras = [
    {
      id: 'pre-bg',
      name: 'Pré-Butleriano',
      description: 'Antes da Jihad Butleriana',
      color: 'from-purple-500 to-indigo-600',
      events: timelineData.filter(event => event.era === 'pre-bg')
    },
    {
      id: 'butlerian',
      name: 'Jihad Butleriana',
      description: 'A guerra contra as máquinas',
      color: 'from-red-500 to-orange-600',
      events: timelineData.filter(event => event.era === 'butlerian')
    },
    {
      id: 'imperial',
      name: 'Era Imperial',
      description: 'O Império Corrino',
      color: 'from-amber-500 to-yellow-600',
      events: timelineData.filter(event => event.era === 'imperial')
    },
    {
      id: 'atreides',
      name: 'Era Atreides',
      description: 'A ascensão dos Atreides',
      color: 'from-green-500 to-emerald-600',
      events: timelineData.filter(event => event.era === 'atreides')
    },
    {
      id: 'post-paul',
      name: 'Pós-Paul',
      description: 'Após Muad\'Dib',
      color: 'from-blue-500 to-cyan-600',
      events: timelineData.filter(event => event.era === 'post-paul')
    }
  ];

  // Atualizar barra de progresso de scroll
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      
      document.documentElement.style.setProperty('--scroll-progress', scrollPercent);
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Inicial

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="timeline-container min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="text-center py-12 px-4">
        <h1 className="text-6xl font-bold text-amber-900 mb-4 tracking-wider">
          DUNE
        </h1>
        <p className="text-xl text-amber-700 max-w-2xl mx-auto leading-relaxed">
          Uma jornada através dos milênios do universo de Frank Herbert
        </p>
        <div className="mt-8 text-sm text-amber-600">
          Role para explorar a história
        </div>
      </header>

      {/* Timeline Content */}
      <div className="timeline-content">
        {eras.map((era, eraIndex) => (
          <TimelineEra
            key={era.id}
            era={era}
            eraIndex={eraIndex}
            onEventClick={handleEventClick}
            isAnimating={isAnimating}
          />
        ))}
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 transform transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-amber-900">{selectedEvent.title}</h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="text-sm text-amber-600 mb-4">
              {selectedEvent.date} • {selectedEvent.location}
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">{selectedEvent.description}</p>
            {selectedEvent.characters && (
              <div className="mb-4">
                <h4 className="font-semibold text-amber-800 mb-2">Personagens Principais:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.characters.map((character, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm"
                    >
                      {character}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {selectedEvent.impact && (
              <div>
                <h4 className="font-semibold text-amber-800 mb-2">Impacto:</h4>
                <p className="text-gray-700">{selectedEvent.impact}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Timeline; 