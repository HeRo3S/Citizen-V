import React, {useEffect, useState} from 'react'
import userServices from '../services/user.services'
import * as Yup from 'yup'
import { Formik, Field, ErrorMessage, Form } from 'formik'
import './individualView.css'
import Layout from './layout';

function IndividualView(){
    const [requestedData, setRequestedData] = useState({
        code: 1234567890,
        name:"Nguyễn Văn A",
        birthday: "06/09/1969",
        gender: "Name",
        profession: "Streamer",
        religion: "",
        education:"",
        origin_address:"",
        temporary_address:"",
        permanent_address:""
    });

    const codeInitialInput = {
        code : "",
    }

    const normalInitialInput = {
        name:"",
        birthday: "",
        gender: "",
        profession: "",
        religion: "",
        education:"",
        origin_address:"",
        temporary_address:"",
        permanent_address:""
    }

    const validationCodeSchema = Yup.object().shape({
        code: Yup.string().min(12).max(12).required(),
    })


    const validationNormalSchema = Yup.object().shape({
        name: Yup.string().required(),
        gender: Yup.string().required(),
        birthday: Yup.date().required(),
    })

    const renderError = (message) => <p className='help is-danger'>{message}</p>

    /** 
    useEffect(() => {
        userServices.getIndividualViewData().then(resp => {
            setRequestedData(resp.data);
        })
    },[]);
    */

    const handleFormSearchClick = (value) => {
        userServices.postIndividualViewData(value).then(resp => {
            alert("Search ok!");
            setRequestedData(resp.data);
        })
    }

    return(
        <>
            <Layout />
            <div className="main" id="information-page">
                <div className="container" id="information-container">
                    <div className="information-form">
                        <div className="information-form-container">
                            <h3>Thông tin cá nhân</h3>

                            <table>
                                <tr>
                                    <th>Mã CCCD/CMND</th>
                                    <th>Họ và tên</th>
                                    <th>Ngày/Tháng/Năm sinh</th>
                                </tr>

                                <tr>
                                    <td>{requestedData.code}</td>
                                    <td>{requestedData.name}</td>
                                    <td>{requestedData.birthday}</td>
                                </tr>

                                <tr>
                                    <th>Giới tính</th>
                                    <th>Nghề nghiệp</th>
                                    <th>Tôn giáo</th>
                                    <th>Trình độ học vấn</th>
                                </tr>

                                <tr>
                                    <td>{requestedData.gender}</td>
                                    <td>{requestedData.profession}</td>
                                    <td>{requestedData.religion}</td>
                                    <td>{requestedData.education}</td>
                                </tr>

                                <tr>
                                    <th>Quê quán</th>
                                    <th>Địa chỉ tạm trú</th>
                                    <th>Địa chỉ thường trú</th>
                                </tr>

                                <tr>
                                    <td>{requestedData.origin}</td>
                                    <td>{requestedData.permanent_address}</td>
                                    <td>{requestedData.temporary_address}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    
                    <Formik initialValues={codeInitialInput} validationSchema={validationCodeSchema} onSubmit={value => handleFormSearchClick(value)}>
                        <Form className='search-form' id='search-code'>
                                <button type="submit" id="code-submit-btn">
                                    <i className="ti-search"></i>
                                </button>

                                <div className="cccd-search">
                                    <label htmlFor="cccd-input">
                                        <h3>Tìm kiếm theo CCCD/CMND: </h3>
                                    </label>
                                    <Field type="text" name="code" id="cccd-input" />
                                    <ErrorMessage name='code' render={renderError} />
                                </div>
                        </Form>
                    </Formik>

                    <Formik initialValues={normalInitialInput} validationSchema={validationNormalSchema} onSubmit={value => handleFormSearchClick(value)}>
                        <Form className='search-form' id='search-all'>
                                <button type="submit" id="normal-submit-btn">
                                    <i className="ti-search"></i>
                                </button>

                                <div className="normal-search">
                                    <h3>Tìm kiếm theo thông tin khác: </h3>
                                    <table>
                                        <tr>
                                            <td>
                                                <label htmlFor="">Họ và tên: </label>
                                                <Field type="text" name='name'/>
                                                <ErrorMessage name='name' render={renderError} />
                                            </td>
                                            <td>
                                                <label htmlFor="">Giới tính: </label>
                                                <Field as="select" name='gender'>
                                                    <option>---Choose---</option>
                                                    <option value="nam">Nam</option>
                                                    <option value="nu">Nữ</option>
                                                </Field>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <label htmlFor="">Nghề nghiệp: </label>
                                                <Field type="text" name='profession' />
                                            </td>
                                            <td>
                                                <label htmlFor="">Tôn giáo: </label>
                                                <Field as="select" name='religion' placeholder="Nhập tôn giáo"  >
                                                    <option>--Choose--</option>
                                                    <option value="None">Không</option>
                                                    <option value="Phat giao">Phật giáo</option>
                                                    <option value="Thien chua giao">Thiên chúa giáo</option>
                                                    <option value="Kito giao">Kitô giáo</option>
                                                </Field>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <label htmlFor="">Ngày/Tháng/Năm sinh: </label>
                                                <Field type="date" name='birthday' />
                                            </td>

                                            <td>
                                                <label htmlFor="">Trình độ học vấn: </label>
                                                <Field as="select" name='education' placeholder="Nhập trình độ học vấn" >
                                                    <option>--Choose--</option>
                                                    <option value="None">Không</option>
                                                    <option value="12/12">12/12</option>
                                                    <option value="Dai hoc">Đại học</option>
                                                </Field>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default IndividualView;