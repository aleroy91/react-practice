import React, { useState } from "react";

export const SearchBar = (props) => {
    const {filterData} = {...props};
    const [displaySearchBar, setDisplaySearchBar] = useState(false);
    const toggleSearchBar = (toggle) => {
        setDisplaySearchBar(!toggle);
    }

    return (
        <div className="horizontal-container">
            {displaySearchBar && (
                <input 
                    className="search-bar"
                    onChange={(event) => {
                        filterData(event.target.value);
                    }}
                ></input>
            )}
            <button 
                className="button__search" 
                onClick={() => toggleSearchBar(displaySearchBar)}
            >
            <span className="material-icons">search</span>
            </button>
        </div>
    );
}