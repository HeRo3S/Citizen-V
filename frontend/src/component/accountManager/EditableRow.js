import React from 'react'
import './EditableRow.css'

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
                <input id='editable-row-text' type="text" name="password" value={editAccountFormData.password} onChange={handleEditAccountEvent}></input>
                &nbsp;
                <i className="ti-layers">&nbsp;</i>
                <i className="ti-reload"></i>
            </td>
            <td style={{width: "15%"}}>
                <input id='editable-row-checkbox'  type="checkbox" name="open_status" defaultChecked={!!editAccountFormData.open_status} onChange={handleEditAccountEvent}></input>
            </td>
            <td style={{width: "10%"}}>
                <button onClick={(event) => {handleSaveAccountEvent(event)}}>Save</button>
            </td>
        </tr>
        </>
    )
}

export default EditableRow;