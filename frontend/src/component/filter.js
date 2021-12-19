import React from "react";
import './filter.css'

function FilterBar() {
    return(
        <>
        <div id="filter-bar" className="bar">
            <div className="bar-container">
                <button className="back-button">
                    <i className="ti-arrow-left"></i>
                </button>

                <div className="bar-heading">
                    <h1>Lọc</h1>
                </div>

                <div className="filter-bar-content">
                    <div className="checkbox-form">
                        <input type="checkbox" />
                        <label>
                            Hà Nội
                        </label>
                    </div>

                    <div className="checkbox-form">
                        <input type="checkbox" />
                        <label>
                            Bắc Giang
                        </label>
                    </div>
                </div>
            </div>
            
            <div className="filter-bar-search">
                <div className="search-bar">
                    <input type="text" placeholder="Tìm kiếm ...." />
                    <button type="submit">
                        <i className="ti-search"></i>
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default FilterBar;