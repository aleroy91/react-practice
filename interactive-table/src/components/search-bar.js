import React from "react";

export const SearchBar = (props) => {
    const {filterData} = {...props};

    return (
        <div className="horizontal-container">
            <input 
                className="search-bar"
                placeholder="Filter Records"
                onChange={(event) => {
                    filterData(event.target.value);
                }}
            />
            <span className="material-icons icon--search">search</span>
        </div>
    );
}