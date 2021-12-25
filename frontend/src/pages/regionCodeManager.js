import React, { useEffect, useState } from 'react'
import ProgressBar from '../component/progress'
import userServices from "../services/user.services.js"
import './regionCodeManager.css'
import Layout from './layout'

function RegionCodeManager() {

    const [requestedData, setRequestedData] = useState([]);
    const [inputData, setInputData] = useState([]);
    const [addInputData, setAddInputData] = useState({
        code:"",
        name:"",
    });

    const [uploading, setUploading] = useState(false);

    const updateInputData = () => { 
       setInputData(prevState => [...prevState, addInputData]);
    }
    const handleChangeData = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newAddInputData = {...addInputData };
        newAddInputData[fieldName] = fieldValue;

        setAddInputData(newAddInputData);
    }

    useEffect( () => {
        const uploadingData = () => {
            userServices.postRegionCodeData(inputData);
        };
        
        uploadingData();
    }, [uploading]);

    useEffect( () => {
        userServices.getRegionCodeData().then(resp => setRequestedData(resp.data) );
    }, []);
    
    const getData = () => {
        return requestedData.map(item => {
            return (
                <tr>
                    <td style={{width: "10%"}}>{item.code}</td>
                    <td style={{width: "70%"}}>{item.name}</td>
                </tr>
            );
        });
    }

    return(
        <>
            <Layout />
            <ProgressBar />
            <div className="main" id="declare-page">
                <div className="container">
                    <div className="declare-page-heading">
                        <p className="heading-id">Mã</p>
                        <p className="heading-name">Tên</p>
                    </div>

                    <div className="declare-page-input">
                        <input type="text" name='code' className="text-code" onChange={handleChangeData} />
                        <input type="text" name='name' className="text-name" onChange={handleChangeData}/>
                        <i className="ti-plus" onClick={updateInputData}></i>
                    </div>

                        <div className="declare-page-button">
                            <button id="declare-page-button-add" onClick={() => setUploading(true)}>Add</button>
                            <button id="declare-page-button-edit">Edit</button>
                        </div>

                    <div className="declare-page-content">
                        <table>
                            <tbody>
                                {getData()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegionCodeManager;