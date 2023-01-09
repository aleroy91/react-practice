import React, { useContext, useState } from "react";

const SidePanelContext = React.createContext();
const SidePanelUpdateContext = React.createContext();

export const useSidePanel = () => {
  return useContext(SidePanelContext);
};

export const useSidePanelUpdate = () => {
  return useContext(SidePanelUpdateContext);
};

export const DisplaySidePanelProvider = ({ children }) => {
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
};
