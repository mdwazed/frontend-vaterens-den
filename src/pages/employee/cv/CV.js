import React, {useEffect, useState} from 'react'

import Table from '../../../components/table/Table'
import Button from "../../../components/button/Button";
import IconButton from "../../../components/button/IconButton";
import {Link} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {Delete} from "../../../utils/crud";
import {employee_id} from "../../../utils/storage";

const cvTableHead = [
    'SL',
    'resume name',
    'resume',
    'action'
]
const renderHead = (item, index) => <th key={index}>{item}</th>



const CV = () => {
    const [cvList, setState] = useState([])
    useEffect(() => {
        axios.get(`/cv/?employee_id=${employee_id()}`).then((response) => {setState(response.data)})
    }, [])
    const delete_cv = (id) => {
        Swal.fire({
            title: 'Are you sure you want to delete this?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            icon: 'question',
            confirmButtonColor: 'red'
        }).then((result) => {
            if (result.isConfirmed) {
                return Delete(`${process.env.REACT_APP_API_ROOT_V1}cv/${id}/`, id, cvList, setState)
            }
        })
    }
    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{index}</td>
            <td>{item.resume_name}</td>
            <td>{item.resume ? item.resume.split('/').pop()  : 'No Resume Uploaded'}</td>
            <td className={'d-flex'}>
                <Link to={`/employee/cv/${item.id}/update`}>
                    <IconButton type={'warning'} icon_class={'bx-edit'}/>
                </Link>
                <IconButton type={'danger'} icon_class={'bx-trash'} onClick={() => delete_cv(item.id)}/>
                <Link to={`/employee/cv/${item.id}/detail`}>
                    <IconButton type={'success'} icon_class={'bx-detail'}/>
                </Link>
            </td>
        </tr>
    )
    if (!cvList) return <p>Loading ...</p>
    else return (
        <div>
            <div className="row">
                <div className="col-10">
                    <h2 className="page-header">
                        Resume List
                    </h2>
                </div>
                <div className="col-2">
                    <Link to={'/employee/cv/create'}>
                        <Button color={'primary'} content={'Add New CV'}/>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                limit='10'
                                headData={cvTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={cvList}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CV
