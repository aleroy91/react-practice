import React, { useContext, useState } from "react";

const SidePanelContext = React.createContext();
const SidePanelUpdateContext = React.createContext();

export function useSidePanel() {
  return useContext(SidePanelContext);
}

export function useSidePanelUpdate() {
  return useContext(SidePanelUpdateContext);
}

export function DisplaySidePanelProvider({ children }) {
  const [showSidePanel, setShowSidePanel] = useState(false);

  const toggleSidePanel = () => {
    setShowSidePanel(!showSidePanel);
  };

  return (
    <SidePanelContext.Provider value={showSidePanel}>
      <SidePanelUpdateContext.Provider value={toggleSidePanel}>
        {children}
      </SidePanelUpdateContext.Provider>
    </SidePanelContext.Provider>
  );
}
