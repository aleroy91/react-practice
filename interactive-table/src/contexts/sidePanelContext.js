import React, { useContext, useState } from "react";

const SidePanelDisplayContext = React.createContext();
const SidePanelUpdateDisplayContext = React.createContext();

export function useSidePanelDisplay() {
  return useContext(SidePanelDisplayContext);
}

export function useSidePanelDisplayUpdate() {
  return useContext(SidePanelUpdateDisplayContext);
}

export function DisplaySidePanelProvider({ children }) {
  const [showSidePanel, setShowSidePanel] = useState(false);

  const toggleSidePanel = () => {
    setShowSidePanel(!showSidePanel);
  };

  return (
    <SidePanelDisplayContext.Provider value={showSidePanel}>
      <SidePanelUpdateDisplayContext.Provider value={toggleSidePanel}>
        {children}
      </SidePanelUpdateDisplayContext.Provider>
    </SidePanelDisplayContext.Provider>
  );
}
