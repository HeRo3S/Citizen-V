import React from 'react'

const EditableRow = ({editAccountFormData, handleEditAccountEvent, handleSaveAccountEvent}) => {
    return (
        <>
        <tr >
            <td style={{width: "10%"}}>
                {editAccountFormData.code}
            </td>
            <td style={{width: "40%"}}>
                {editAccountFormData.name}
            </td>
            <td style={{width: "25%"}}>
                <input type="text" name="password" value={editAccountFormData.password} onChange={handleEditAccountEvent}></input>
                <i className="ti-layers"></i>
                <i className="ti-reload"></i>
            </td>
            <td style={{width: "15%"}}>
                <input type="checkbox" name="open_status" defaultChecked={!!editAccountFormData.open_status} onChange={handleEditAccountEvent}></input>
            </td>
            <td style={{width: "10%"}}>
                <button onClick={(event) => {handleSaveAccountEvent(event)}}>Save</button>
            </td>
        </tr>
        </>
    )
}

export default EditableRow;