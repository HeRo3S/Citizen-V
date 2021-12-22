import React, { useEffect, useState } from 'react'
import { UPDLOCK } from 'sequelize/dist/lib/table-hints';
import ProgressBar from '../component/progress'
import userServices from "../services/user.services.js"
import './regionCodeManager.css'

function RegionCodeManager() {

    const [requestedData, setRequestedData] = useState([]);
    const [inputData, setInputData] = useState([]);
    const [addInputData, setAddInputData] = useState({
        id:"",
        region:"",
    });
    const [uploading, setUploading] = useState(true);

    const updateInputData = () => {
        const newInputData = [...inputData, addInputData];
        setInputData(newInputData);
    }

    const handleChangeData = (event) => {
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
        console.log(inputData);
        uploadingData();
    }, [inputData, uploading]);

    useEffect( () => {
        userServices.getRegionCodeData().then(resp => setRequestedData(resp.data) )
    }, []);

    const getData = () => {
            requestedData.map(item => {
                return (
                    <tr>
                        <td style={{width: "10%"}}>{item.id}</td>
                        <td style={{width: "70%"}}>{item.region}</td>
                    </tr>
                )
            })
    }

    return(
        <>
            <ProgressBar />
            <div className="main" id="declare-page">
                <div className="container">
                    <div className="declare-page-heading">
                        <p className="heading-id">Mã</p>
                        <p className="heading-name">Tên</p>
                    </div>

                    <div className="declare-page-input">
                        <input type="text" name='id' className="text-id" onChange={handleChangeData} />
                        <input type="text" name='region' className="text-region" onChange={handleChangeData}/>
                        <i className="ti-plus" onClick={updateInputData}></i>
                    </div>

                        <div className="declare-page-button">
                            <button id="declare-page-button-add" onClick={() => setUploading(true)}>Add</button>
                            <button id="declare-page-button-edit">Edit</button>
                        </div>

                    <div className="declare-page-content">
                        <table>
                            <tbody>
                                {
                                    getData()
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegionCodeManager;