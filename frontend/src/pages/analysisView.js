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
        area: [],
        age: [],
        gender: [],
        education: [],
        job: [],
        religion: [],
    });
    //data prepare to post hook
    const [filterData, setFilterData] = useState([]);

    //chart element hooks
    const [ageData, setAgeData] = useState([]);
    const [educationData, setEducationData] = useState([]);
    const [genderData, setGenderData] = useState([]);
    const [jobData, setJobData] = useState([]);
    const [religionData, setReligionData] = useState([]);


    //local data hooks
    const [citiesRequestedData, setCitiesRequestedData] = useState([]);
    const [districtsRequestedData, setDistrictsRequestedData] = useState([]);
    const [wardsRequestedData, setWardsRequestedData] = useState([]);
    const [villagesRequestedData, setVillagesRequestedData] = useState([]);

    useEffect(()=> {
        const dataLoad = () => {
            userServices.getAnalysisData().then(resp => {
            setRequestedData(resp.data);
            splitElementData();
            storeData();
        })
        }
        return dataLoad()
    }, []);

    //change backend element data from list to array
    const convertListToArray = (splittedData) => {
        var returnArray = [];
        splittedData.map(item => {
            var attributeName = item.attribute;
            var count = item.count;
            returnArray = [...returnArray, [attributeName, count]];
        })
        return returnArray;
    }

    const splitElementData = () => {
        setAgeData(requestedData.age);

        setEducationData([['Cấp học', 'Tổng'], ...convertListToArray(requestedData.education)]);

        setGenderData([['Giới tính', 'Tổng'], ...convertListToArray(requestedData.gender)]);

        setJobData([['Nghè', 'Tổng'], ...convertListToArray(requestedData.profession)]);

        setReligionData([['Đạo', 'Tổng'], ...convertListToArray(requestedData.religion)]);
    }


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
        userServices.filterAnalysisData(filterData).then(resp => {
            setRequestedData(resp.data);
            setExploreLevel(exploreLevel + 1);
            setFilterData([]);
        });
    }
    //handle Filter return click event
    const handleFilterReturnClickEvent = (event) => {
        event.preventDefault();
        setExploreLevel(exploreLevel - 1);
        loadLocalData();
    }

    

    //handle clickbox Onchange evnet
    const handleFilterCheckboxClickedEvent = (event) => {

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
    return(
        <>
            <Layout />
            <div className="main" id="population-page">
                <div className="container">
                   <AgeChart ageData={ageData} />
                   <GenderChart genderData={genderData} />
                   <EducationChart educationData={educationData} />
                   <ReligionChart religionData={religionData} />
                   <JobChart jobData={jobData} />
                </div>
            </div>
           <FilterBar areaData={requestedData.area} handleFilterClickEvent={handleFilterClickEvent} handleFilterReturnClickEvent={handleFilterReturnClickEvent} handleFilterCheckboxClickedEvent={handleFilterCheckboxClickedEvent} />
        </>
    )
}

export default AnalysisView;