import React, {useState, useEffect} from 'react'
import jwt from 'jwt-decode'
import userServices from '../services/user.services.js';
import FilterBar from '../component/analysisView/filter.js'
import AgeChart from '../component/chart/age-chart.js';
import EducationChart from '../component/chart/education-chart'
import GenderChart from '../component/chart/gender-chart'
import ReligionChart from '../component/chart/religion-chart'
import JobChart from '../component/chart/job-chart'
import Layout from './layout.js';


function AnalysisView() {
    const user =  jwt(localStorage.getItem("user"));
    const [exploreLevel, setExploreLevel] = useState(user.access_level);
    const [requestedData, setRequestedData] = useState({
        area:[
            {
                code: "01",
                name: "Ha Noi",
            },
            {
                code: "02",
                name: "Da Nang",
            },
        ], citizen: [
            {
                id: "0001",
                name: "Pham Tuan Hung",
                gender: "Helicopter",
                birthday: "2001/09/25",
            },{
                id: "0002",
                name: "Pham Tuan Hung",
                gender: "Futanari",
                birthday: "2001/09/25",
            }
        ]
    }
    );
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
        userServices.filterAnalysisData(filterData).then(resp => {
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
        userServices.getAnalysisData().then(resp => {
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
            setFilterData([...filterData, fieldID]);
        } else if (fieldValue === false) {
            setFilterData(filterData.filter(item => item !== fieldID));
        }
    }
    return(
        <>
            <Layout />
            <div className="main" id="population-page">
                <div className="container">
                   <AgeChart />
                   <EducationChart />
                   <GenderChart />
                   <ReligionChart />
                   <JobChart />
                </div>
            </div>
           <FilterBar areaData={requestedData.area} handleFilterClickEvent={handleFilterClickEvent} handleFilterReturnClickEvent={handleFilterReturnClickEvent} handleFilterCheckboxClickedEvent={handleFilterCheckboxClickedEvent} />
        </>
    )
}

export default AnalysisView;