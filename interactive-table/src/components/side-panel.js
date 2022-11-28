import React from "react";

export const SidePanel = (props) => {
  const { showSidePanel } = { ...props };

  return (
    <div>
      {showSidePanel && <div className="side-panel">Panel Goes here</div>}
    </div>
  );
};
