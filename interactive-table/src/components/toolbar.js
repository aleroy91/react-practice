import React from "react";
import { SearchBar } from "./search-bar";

export const Toolbar = (props) => {
    const { displaySettings, filterData } = {...props};

    return (
        <div className="toolbar--margin-bottom">
            <div className="toolbar">
                <div className="horizontal-container">
                    <div className="vertical-container">
                        <div className="horizontal-container">
                            <h1>Players Table</h1>
                        </div>
                        <div className="horizontal-container">
                            <SearchBar filterData={filterData}/>
                            <button className="button__info" onClick={() => displaySettings()}>
                                <span className="material-icons">more_vert</span>
                            </button>
                            <button className="button__info" onClick={() => filterData('Midfield')}>
                                <span className="material-icons">filter_list</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
