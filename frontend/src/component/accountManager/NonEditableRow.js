function NonEditableRow({item, handleClickEvent }) {
    return (
        <tr id={item.id}>
            <td style={{width: "10%"}}>{item.code}</td>
            <td style={{width: "40%"}}>{item.name}</td>
            <td style={{width: "25%"}}>
                {item.password}
                <i className="ti-layers"></i>
                <i className="ti-reload"></i>
            </td>
            <td style={{width: "15%"}}>
                <input type="checkbox" checked={item.open_status} readOnly></input>
            </td>
            <td style={{width: "10%"}}>
                <button onClick={(event) => handleClickEvent(event, item)}>Edit</button>
            </td>
        </tr>
    )
}

export default NonEditableRow;