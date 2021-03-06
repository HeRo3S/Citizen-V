import React, { useState, useEffect } from 'react'
import jwt from 'jwt-decode'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import userServices from '../services/user.services';
import './individualInput.css'
import Layout from './layout';
import { useNavigate } from 'react-router-dom';

function IndividualInput(){
    const user = jwt(localStorage.getItem("user"));
    const navigate = useNavigate();
    useEffect(() => {
            if (!user.open_status) {
            navigate("/");
        }
    }, [])
   

    const [data, setData] = useState({
        code: "",
        name: "",
        birthday: "",
        gender: "",
        profession: "",
        religion: "",
        education:"",
        origin_address:"",
        temporary_address:"",
        permanent_address:""
    })

    //Validation schema
    const validationSchema = Yup.object().shape({
        code: Yup.string().min(12).max(12).required(),
        name: Yup.string().required(),
        birthday: Yup.date().required(),
        gender: Yup.string().required(),
        profession: Yup.string().required(),
        religion: Yup.string().required("Please choose a religion"),
        education: Yup.string().required("Please choose an education degree"),
        origin_address: Yup.string().required(),
        temporary_address: Yup.string().required(),
        permanent_address: Yup.string().required(),
    });

    const renderError = (message) => <p className='help is-danger'>{message}</p>

    //submit data click function
    const handleFormSubmitClick = (value) => {
        alert('OK! Submitting');
        userServices.postIndividualInputData(value).then(() => {
            window.location.reload(false);
        })
    }

    return(
        <>
            <Layout />
            <div className="main" id="inputdata-page">
                <div className="container" id="inputdata-container">

                    <Formik initialValues={data} validationSchema={validationSchema} onSubmit={(value) => handleFormSubmitClick(value)} >

                    <Form>
                        <div className="inputdata-form">
                            <div className='inputdata-heading'>
                                Nh???p th??ng tin c?? nh??n
                            </div>

                            <table> 
                                <tbody>
                                    <tr>
                                        <th>M?? CCCD</th>
                                        <th>H??? v?? t??n</th>
                                        <th>Ng??y/Th??ng/N??m sinh</th>
                                    </tr>

                                    <tr>
                                        <td>
                                            <Field type="text" name='code' placeholder="Nh???p CCCD"  />  
                                            <ErrorMessage name='code' render={renderError} />
                                        </td>
                                        <td>  
                                            <Field type="text" name='name' placeholder="Nh???p h??? v?? t??n" />
                                            <ErrorMessage name='name' render={renderError} />
                                        </td>
                                        <td>
                                            <Field type="date" name='birthday' placeholder="Nh???p ng??y/th??ng/n??m"/>  
                                            <ErrorMessage name='birthday' render={renderError} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Gi???i t??nh</th>
                                        <th>Ngh??? nghi???p</th>
                                        <th>T??n gi??o</th>
                                        <th>Tr??nh ????? h???c v???n</th>
                                    </tr>

                                    <tr>
                                        <td>
                                            <Field as="select" name='gender' placeholder="Nh???p gi???i t??nh" >
                                                <option>--Chooose--</option>
                                                <option value="nam">Nam</option>
                                                <option value="nu">N???</option>
                                            </Field>
                                        </td>
                                        <td>
                                            <Field type="text" name='profession' placeholder="Nh???p ngh??? nghi???p"  />
                                            <ErrorMessage name='profession' render={renderError} />
                                        </td>
                                        <td>  
                                            <Field as="select" name='religion' placeholder="Nh???p t??n gi??o"  >
                                                <option>--Choose--</option>
                                                <option value="None">Kh??ng</option>
                                                <option value="Phat giao">Ph???t gi??o</option>
                                                <option value="Thien chua giao">Thi??n ch??a gi??o</option>
                                                <option value="Kito giao">Kit?? gi??o</option>
                                            </Field>
                                        </td>
                                        <td>
                                            <Field as="select" name='education' placeholder="Nh???p tr??nh ????? h???c v???n" >
                                                <option>--Choose--</option>
                                                <option value="None">Kh??ng</option>
                                                <option value="12/12">12/12</option>
                                                <option value="Dai hoc">?????i h???c</option>
                                            </Field>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Qu?? qu??n</th>
                                        <th>?????a ch??? t???m tr??</th>
                                        <th>?????a ch??? th?????ng tr??</th>
                                    </tr>

                                    <tr>
                                        <td>
                                            <Field type="text" name='origin_address' placeholder="Nh???p qu?? qu??n" />  
                                            <ErrorMessage name='origin_address' render={renderError} />
                                        </td>
                                        <td>
                                            <Field type="text" name='temporary_address' placeholder="Nh???p ?????a ch??? t???m tr??" />  
                                            <ErrorMessage name='temporary_address' render={renderError} />
                                        </td>
                                        <td>
                                            <Field type="text" name='permanent_address' placeholder="Nh???p ?????a ch??? th?????ng tr??" />
                                            <ErrorMessage name='permanent_address' render={renderError} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='inputdata-footer' >
                                <button type="submit">
                                    X??c nh???n
                                </button>
                            </div>
                        </div>
                    </Form>
                    </Formik>

                </div>
            </div>
        </>
    )
}

export default IndividualInput;