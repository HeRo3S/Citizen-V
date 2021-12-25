import React, { Fragment, useEffect, useState } from 'react'
import ProgressBar from '../component/progress'
import userServices from '../services/user.services'
import NonEditableRow from '../component/accountManager/NonEditableRow'
import EditableRow from '../component/accountManager/EditableRow'
import './accountManager.css'
import Navbar from '../component/navbar'
import Layout from './layout'


function AccountManager() {
    const [requestedData, setRequestedData] = useState([
    {
        id:1,
        code:"01",
        name:"Ha Noi",
        password:"xaxa",
        open_status: false,
    },

    {
        id:2,
        code:"02",
        name:"Ho Chi Minh",
        password:"xaxa",
        open_status: true,
    },
    ]);
    //data to post to backend
    const [accountsChangesData, setAccountsChangesData] = useState([]);

    //former data of a row
    const [editAccountFormData, setEditAccountFormData] = useState({
        id: 0,
        code:"",
        name:"",
        password:"",
        open_status: false,
    })

    //tracking id of the clicked row hook
    const [idNumberAccount, setIdNumberAccount] = useState(null);

    //Fetch data function
    useEffect(() => {
        userServices.getAccountManagerData().then(resp => {
            setRequestedData(resp.data);
        })
    }, [])

    //Submit Data to backend function
    const handleSubmitEvent = (event) => {
        event.preventDefault();

        userServices.postAccountManagerData(accountsChangesData).then(resp => {
            window.location.reload(false);
        })
    }

    //handle click event of noneditableRow
    const handleClickEvent = (event, account) =>{
        event.preventDefault();
        setIdNumberAccount(account.id);

        const formData = {
            id: idNumberAccount,
            code: account.code,
            name: account.name,
            password: account.password,
            open_status: account.open_status
        };
        setEditAccountFormData(formData);
    }

    //handle onchange event of editableRow
    const handleEditAccountEvent = (event) => {
        //event.preventDefault();
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newEditAccountFormData = {...editAccountFormData};
        if (fieldName === "open_status") {
            newEditAccountFormData[fieldName] = event.target.checked;
        } else {
            newEditAccountFormData[fieldName] = fieldValue;
        }
        setEditAccountFormData(newEditAccountFormData);
    }

    //handle save click event of editableRow
    const handleSaveAccountEvent = (event) => {
        event.preventDefault();

        const edittedData = {
            id: idNumberAccount,
            code: editAccountFormData.code,
            name: editAccountFormData.name,
            password: editAccountFormData.password,
            open_status: editAccountFormData.open_status,
        }

        const newRequestedData = [...requestedData];
        var newAccountChangesData = [...accountsChangesData];

        const index = requestedData.findIndex((account) => account.id === idNumberAccount);
        const indexInAccountChangesData = accountsChangesData.findIndex((accountChanges) => accountChanges.id === idNumberAccount);

        newRequestedData[index] = edittedData;
        if (indexInAccountChangesData === -1) {
            newAccountChangesData = [...newAccountChangesData, edittedData];
        } else {
            newAccountChangesData[indexInAccountChangesData] = edittedData;
        }

        setRequestedData(newRequestedData);
        setAccountsChangesData(newAccountChangesData);

        setIdNumberAccount(null);

    }

    return (
        <>
            <Layout />
            <ProgressBar />
            <div className="main" id="acc-page">
                <div className="container">
                    <div className="acc-page-content">
                        <form>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{width: "10%"}}>Mã</th>
                                    <th style={{width: "40%"}}>Tên</th>
                                    <th style={{width: "25%"}}>Tài khoản</th>
                                    <th style={{width: "11%"}}>Khai báo</th>
                                    <th style={{width: "14%"}}></th>
                                </tr>      
                            </thead>
                            <tbody>
                                {requestedData.map((item) => {
                                    return (
                                        <Fragment> 
                                        {idNumberAccount === item.id ? (
                                                <EditableRow editAccountFormData={editAccountFormData} handleEditAccountEvent={handleEditAccountEvent} handleSaveAccountEvent={handleSaveAccountEvent} />
                                            ) : (
                                                <NonEditableRow item={item} handleClickEvent={handleClickEvent} /> 
                                            )
                                        }
                                        </Fragment>
                                    )
                                }) 
                            }
                            </tbody>
                        </table>
                        </form>.
                    </div>

                    <div className="acc-page-footer">
                    <button onClick={handleSubmitEvent}>Change</button>
                    <button>Remove all</button>
                    <button>Reset all</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountManager;