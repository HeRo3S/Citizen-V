import React, { useEffect, useState } from 'react'
import ProgressBar from '../component/progress'
import userServices from "../services/user.services.js"
import './regionCodeManager.css'

function RegionCodeManager() {
    const [inputData, setInputData] = useState({
        id:"",
        region:"",
    });

    const [addInputData, setAddInputData] = useState({
        id:"",
        region:"",
    });

    const updateInputData = () => {
        // const newInputData;
        // if (inputData != null) {
        //     newInputData = [...inputData, addInputData];
        // } else {
        //     newInputData = [addInputData];
        // }
        
        const newInputData = addInputData;
        setInputData(newInputData);
        console.log(inputData);
    }

    const handleChangeData = (event) => {
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newAddInputData = {...addInputData };
        newAddInputData[fieldName] = fieldValue;

        setAddInputData(newAddInputData);
    }

    const submitData = data => {
        userServices.postAccountManagerData(data);
    }
    
    const getData = () => {
        // useEffect(
            userServices.getAccountManagerData().then(resp => {
                resp.data.map(item => {
                    return (
                        <tr>
                            <td style={{width: "10%"}}>{item.id}</td>
                            <td style={{width: "70%"}}>{item.region}</td>
                        </tr>
                    )
                })
            })
        // [inputData]);
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
                            <button id="declare-page-button-add" onClick={submitData(inputData)}>Add</button>
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