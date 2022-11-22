import React from "react";
import { SearchBar } from "./search-bar";

export const Toolbar = (props) => {
    const { displaySettings, filterData } = {...props};

    return (
        <div className="toolbar--margin-bottom">
            <div className="toolbar">
                <div className="horizontal-container">
                    <h1 className="toolbar__header">Players Table</h1>
                    <SearchBar filterData={filterData}/>
                    <button className="button__info" onClick={() => displaySettings()}>
                        <span className="material-icons">more_vert</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

