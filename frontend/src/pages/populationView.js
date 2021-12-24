import React, { useEffect, useState }from 'react'
import Navbar from '../component/navbar.js'
import FilterBar from '../component/populationView/filter'
import userServices from '../services/user.services'
import jwt from 'jwt-decode'
import './populationView.css'
import Layout from './layout.js'

function PopulationView() {
    const user =  jwt(localStorage.getItem("user"));
    const [exploreLevel, setExploreLevel] = useState(user.access_level);
    /**
     * required element in package
     * 
     * id (area)
     * name (area)
     * 
     * citizen:
     * id:
     * name:
     * age:
     */
    const [requestedData, setRequestedData] = useState([{
        area: {
            id: "01",
            name: "Ha Noi",
        },
        citizen: {
            id: "0001",
            name: "Pham Tuan Hung",
            gender: "Helicopter",
            birthday: "2001/09/25",
        }
    },{
        area: {
            id: "02",
            name: "Da Nang",
        },
        citizen: {
            id: "0002",
            name: "Pham Tuan Hung",
            gender: "Futanari",
            birthday: "2001/09/25",
        }
    }
    ]);
    //data prepare to post hook
    const [filterData, setFilterData] = useState([])
    //onchange tracking hook
    const [addFilterData, setAddFilterData] = useState();

    //local data hooks
    const [citiesRequestedData, setCitiesRequestedData] = useState([]);
    const [districtsRequestedData, setDistrictsRequestedData] = useState([]);
    const [wardsRequestedData, setWardsRequestedData] = useState([]);
    const [villagesRequestedData, setVillagesRequestedData] = useState([]);
    //store Data based on explore level function
    const storeData = () => {
        if (exploreLevel < user.access_level) {
            alert('Access denied!');
            return;
        }
        switch(exploreLevel) {
            case 0:
                setRequestedData(citiesRequestedData);
                break;
            case 1:
                setRequestedData(districtsRequestedData);
                break;
            case 2:
                setRequestedData(wardsRequestedData);
                break;
            case 3:
                setRequestedData(villagesRequestedData);
                break;
            default:
                alert("Can't explore any further!");
                return;
        }
    }

    //load data from local storage function
    const loadLocalData = () => {
        switch(exploreLevel) {
            case 0:
                setCitiesRequestedData(requestedData);
                break;
            case 1:
                setDistrictsRequestedData(requestedData);
                break;
            case 2:
                setWardsRequestedData(requestedData);
                break;
            case 3:
                setVillagesRequestedData(requestedData);
                break;
            default:
                alert("Can't explore any further!");
                return;
        }       
    }

    //handle apply Filter click event
    const handleFilterClickEvent = (event) => {
        event.preventDefault();
        userServices.postPopulationRequested(filterData).then(resp => {
            setRequestedData(resp.data);
            setExploreLevel(exploreLevel + 1);
            storeData();
            setFilterData([]);
        });
    }
    //handle Filter return click event
    const handleFilterReturnClickEvent = (event) => {
        event.preventDefault();
        setExploreLevel(exploreLevel - 1);
        loadLocalData();
    }

    useEffect(()=> {
        userServices.getPopulationData().then(resp => {
            setRequestedData(resp.data);
            storeData();
        })
    })

    //handle clickbox Onchange evnet
    const handleFilterCheckboxClickedEvent = (event) => {
        //event.preventDefault();

        const fieldID = event.target.getAttribute('id');
        const fieldValue = event.target.checked;

        if (fieldValue === true) {
            setFilterData([...filterData, fieldValue]);
        } else if (fieldValue === false) {
            setFilterData(filterData.filter(item => item.value !== fieldID));
        }
    }

    return(
        <>
            <Layout />
            <div className="main" id="population-page">
                <div className="container">
                    <div className="population-page-breadscrumb">
                        <table>
                            <thead>
                                <tr>
                                    <td>Can cuoc cong dan</td>
                                    <td>Ho va ten</td>
                                    <td>Gioi tinh</td>
                                    <td>Ngay thang nam sinh</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    requestedData.map((item) => {
                                        return (
                                        <tr>
                                            <td>{item.citizen.id}</td>
                                            <td>{item.citizen.name}</td>
                                            <td>{item.citizen.gender}</td>
                                            <td>{item.citizen.birthday}</td>
                                        </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <FilterBar requestedData={requestedData} handleFilterClickEvent={handleFilterClickEvent} handleFilterReturnClickEvent={handleFilterReturnClickEvent} handleFilterCheckboxClickedEvent={handleFilterCheckboxClickedEvent} />
        </>
    )
}

export default PopulationView;