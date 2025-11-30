import React, { createContext, useContext, useState, useCallback } from 'react';

interface WidgetHoverContextType {
  hoveredWidget: string | null;
  setHoveredWidget: (id: string | null) => void;
  widgetPositions: Map<string, DOMRect>;
  updateWidgetPosition: (id: string, rect: DOMRect) => void;
}

const WidgetHoverContext = createContext<WidgetHoverContextType | undefined>(undefined);

export const WidgetHoverProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hoveredWidget, setHoveredWidget] = useState<string | null>(null);
  const [widgetPositions, setWidgetPositions] = useState<Map<string, DOMRect>>(new Map());

  const updateWidgetPosition = useCallback((id: string, rect: DOMRect) => {
    setWidgetPositions(prev => {
      const newMap = new Map(prev);
      newMap.set(id, rect);
      return newMap;
    });
  }, []);

  return (
    <WidgetHoverContext.Provider value={{ hoveredWidget, setHoveredWidget, widgetPositions, updateWidgetPosition }}>
      {children}
    </WidgetHoverContext.Provider>
  );
};

export const useWidgetHover = () => {
  const context = useContext(WidgetHoverContext);
  if (!context) {
    throw new Error('useWidgetHover must be used within WidgetHoverProvider');
  }
  return context;
};

