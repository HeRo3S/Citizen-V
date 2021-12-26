import React, { useState } from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import userServices from '../services/user.services';
import './individualInput.css'
import Layout from './layout';

function IndividualInput(){
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
        code: Yup.string().required(),
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
                                Nhập thông tin cá nhân
                            </div>

                            <table> 
                                <tbody>
                                    <tr>
                                        <th>Mã CCCD/CMND</th>
                                        <th>Họ và tên</th>
                                        <th>Ngày/Tháng/Năm sinh</th>
                                    </tr>

                                    <tr>
                                        <td>
                                            <Field type="text" name='code' placeholder="Nhập CCCD/CMND"  />  
                                            <ErrorMessage name='code' render={renderError} />
                                        </td>
                                        <td>  
                                            <Field type="text" name='name' placeholder="Nhập họ và tên" />
                                            <ErrorMessage name='name' render={renderError} />
                                        </td>
                                        <td>
                                            <Field type="date" name='birthday' placeholder="Nhập ngày/tháng/năm"/>  
                                            <ErrorMessage name='birthday' render={renderError} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Giới tính</th>
                                        <th>Nghề nghiệp</th>
                                        <th>Tôn giáo</th>
                                        <th>Trình độ học vấn</th>
                                    </tr>

                                    <tr>
                                        <td>
                                            <Field as="select" name='gender' placeholder="Nhập giới tính" >
                                                <option>--Chooose--</option>
                                                <option value="nam">Nam</option>
                                                <option value="nu">Nữ</option>
                                            </Field>
                                        </td>
                                        <td>
                                            <Field type="text" name='profession' placeholder="Nhập nghề nghiệp"  />
                                            <ErrorMessage name='profession' render={renderError} />
                                        </td>
                                        <td>  
                                            <Field as="select" name='religion' placeholder="Nhập tôn giáo"  >
                                                <option>--Choose--</option>
                                                <option value="None">Không</option>
                                                <option value="Phat giao">Phật giáo</option>
                                                <option value="Thien chua giao">Thiên chúa giáo</option>
                                                <option value="Kito giao">Kitô giáo</option>
                                            </Field>
                                        </td>
                                        <td>
                                            <Field as="select" name='education' placeholder="Nhập trình độ học vấn" >
                                                <option>--Choose--</option>
                                                <option value="None">Không</option>
                                                <option value="12/12">12/12</option>
                                                <option value="Dai hoc">Đại học</option>
                                            </Field>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Quê quán</th>
                                        <th>Địa chỉ tạm trú</th>
                                        <th>Địa chỉ thường trú</th>
                                    </tr>

                                    <tr>
                                        <td>
                                            <Field type="text" name='origin_address' placeholder="Nhập quê quán" />  
                                            <ErrorMessage name='origin_address' render={renderError} />
                                        </td>
                                        <td>
                                            <Field type="text" name='temporary_address' placeholder="Nhập địa chỉ tạm trú" />  
                                            <ErrorMessage name='temporary_address' render={renderError} />
                                        </td>
                                        <td>
                                            <Field type="text" name='permanent_address' placeholder="Nhập địa chỉ thường trú" />
                                            <ErrorMessage name='permanent_address' render={renderError} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='inputdata-footer' >
                                <button type="submit">
                                    Xác nhận
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