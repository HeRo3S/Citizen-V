import React from "react";
import './filter.css'

function FilterBar({areaData, handleFilterClickEvent, handleFilterReturnEvent, handleFilterCheckboxClickedEvent} ) {
    return(
        <form>
        <div id="filter-bar" className="bar">
            <div className="bar-container">
                <button className="back-button" onClick={event => handleFilterReturnEvent(event)}>
                    <i className="ti-arrow-left"></i>
                </button>

                <div className="bar-heading">
                    <h1>Lọc</h1>
                </div>

                <button className="apply-button" onClick={event => handleFilterClickEvent(event)} >Apply</button>

                <div className="filter-bar-content">
                    {
                        areaData.map((item) => {
                            return (
                                <div className="checkbox-form" key={item.id}>
                                    <input type="checkbox" name={item.full_code} id={item.full_code} onChange={handleFilterCheckboxClickedEvent}  />
                                    <label htmlFor={item.full_code}>
                                        {item.name}
                                    </label>
                                </div>
                            )
                        })
                    }
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
        </form>
    )
}

export default FilterBar;