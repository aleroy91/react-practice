import React from "react";

export const SearchBar = (props) => {
  const { filterStringData } = { ...props };

  return (
    <div className="horizontal-container">
      <input
        className="search-bar"
        placeholder="Filter Records"
        onChange={(event) => {
          filterStringData(event.target.value);
        }}
      />
      <span className="material-icons icon--search">search</span>
    </div>
  );
};
