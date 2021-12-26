import React, { useEffect, useState }from 'react'
import FilterBar from '../component/populationView/filter'
import userServices from '../services/user.services'
import jwt from 'jwt-decode'
import './populationView.css'
import Layout from './layout.js'
import { Link } from 'react-router-dom'

function PopulationView() {
    const user =  jwt(localStorage.getItem("user"));
    const [exploreLevel, setExploreLevel] = useState(user.access_level);
    const [requestedData, setRequestedData] = useState(
    {
        area:[
            {
                id: 1,
                code: "01",
                name: "Ha Noi",
            },
            {
                id: 2,
                code: "02",
                name: "Da Nang",
            },
        ], citizen: [
            {
                id: "0001",
                code:"",
                name: "Pham Tuan Hung",
                gender: "Helicopter",
                birthday: "2001/09/25",
            },{
                id: "0002",
                code:"",
                name: "Pham Tuan Hung",
                gender: "Futanari",
                birthday: "2001/09/25",
            }
        ]
    });
    //data prepare to post hook
    const [filterData, setFilterData] = useState([])

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

    //load data from local storage function
    const loadLocalData = () => {
        
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
    },[])

    //handle clickbox Onchange evnet
    const handleFilterCheckboxClickedEvent = (event) => {
        //event.preventDefault();

        const fieldID = event.target.getAttribute('id');
        const fieldCode = event.target.getAttribute('name');
        const fieldValue = event.target.checked;

        const addFilterData = {
            id:"",
            full_code:""
        }
        if (fieldValue === true) {
            addFilterData.id = fieldID;
            addFilterData.full_code = fieldCode;
            setFilterData([...filterData, addFilterData]);
        } else if (fieldValue === false) {
            setFilterData(filterData.filter(item => item.id !== fieldID));
        }

    }

    const render =  () => {
        const citizenData = requestedData.citizen;
        return citizenData.map(item => {
            return (
            <tr key={item.id}>
                <td>
                    <Link to={"/individualInput/" + item.code}>{item.code}</Link>
                </td>
                <td>{item.name}</td>
                <td>{item.gender}</td>
                <td>{item.birthday}</td>
            </tr>
            )
        })
    }


    return(
        <>
            <Layout />
            <div className="main" id="population-page">
                <div className="container">
                        <table>
                            <thead>
                                <tr>
                                    <th style={{width: "27%"}}>Căn cước công dân</th>
                                    <th style={{width: "25%"}}>Họ và tên</th>
                                    <th style={{width: "18%"}}>Giới tính</th>
                                    <th style={{width: "30%"}}>Ngày tháng năm sinh</th>
                                </tr>
                            </thead>
                            <tbody>
                                {render()}
                            </tbody>
                        </table>
                </div>
            </div>
                <FilterBar areaData={requestedData.area} handleFilterClickEvent={handleFilterClickEvent} handleFilterReturnClickEvent={handleFilterReturnClickEvent} handleFilterCheckboxClickedEvent={handleFilterCheckboxClickedEvent} />
        </>
    )
}

export default PopulationView;