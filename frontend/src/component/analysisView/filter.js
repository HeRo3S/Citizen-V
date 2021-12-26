import React from "react";
import './filter.css'

function FilterBar({areaData, handleFilterClickEvent, handleFilterReturnEvent, handleFilterCheckboxClickedEvent} ) {
    return(
        <form>
        <div id="filter-bar-div">
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
                                        <input type="checkbox" name={item.full_code} id={item.id} onChange={handleFilterCheckboxClickedEvent}  />
                                        <label htmlFor={item.full_code}>
                                            {item.name}
                                        </label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <label id='filter-bar-btn' htmlFor='filter-bar-input'>
                <i className='ti-search'></i>
            </label>

            <input type={'checkbox'} id='filter-bar-input'></input>

            <label className='filter-overlay' htmlFor='filter-bar-input'></label>

            <div id='filter-bar-res'>
                <label htmlFor='filter-bar-input' className='close-filter'>
                    <i className='ti-close'></i>
                </label>
                <div id="filter-res">
                    {
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
                                                <input type="checkbox" name={item.full_code} id={item.id} onChange={handleFilterCheckboxClickedEvent}  />
                                                <label htmlFor={item.full_code}>
                                                    {item.name}
                                                </label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
        </form>
    )
}

export default FilterBar;