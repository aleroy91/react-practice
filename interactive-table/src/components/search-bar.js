import React, { useState } from "react";

export const SearchBar = (props) => {
    const [displaySearchBar, setDisplaySearchBar] = useState(false);
    const toggleSearchBar = (toggle) => {
        setDisplaySearchBar(!toggle);
    }
    const myDataToFilter = [
        {
            name: "Bruno Fernandes",
            position: "Midfield",
            price: 10         
        }, {
            name: "Cristiano Ronaldo",
            position: "Forward",
            price: 9.7
        }, {
            name: "Christian Eriksen",
            position: "Midfield",
            price: 6,
        }
    ];

    const filterData = (input, dataToFilter = myDataToFilter) => {
        let filteredData = [];
        dataToFilter.forEach((element) => {
            let passesTest = false;
            Object.values(element).filter(item => {
                if (typeof item === "string") {
                    if (item.includes(input)) {
                        filteredData.push(element);
                    }
                }
            });
        });
        console.log("filtered data: ", filteredData);
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