import React, {useEffect, useState} from 'react'

import Table from '../../../components/table/Table'
import Button from "../../../components/button/Button";
import IconButton from "../../../components/button/IconButton";
import {Link} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {Delete} from "../../../utils/actions";
import {employee_id} from "../../../utils/storage";
import moment from "moment";

const tableHead = [
    'id',
    'name',
    'description',
    'certificate',
    'issue_date',
    'action'
]
const renderHead = (item, index) => <th key={index}>{item}</th>



const Award = () => {
    const [awards, setState] = useState([])
    useEffect(() => {
        axios.get(`/award/?employee_id=${employee_id()}`).then((response) => {setState(response.data)})
    }, [])
    console.log(awards)
    const delete_award = (id) => {
        Swal.fire({
            title: 'Are you sure you want to delete this?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            icon: 'question',
            confirmButtonColor: 'red'
        }).then((result) => {
            if (result.isConfirmed) {
                return Delete(`${process.env.REACT_APP_API_ROOT_V1}award/${id}/`, id, awards, setState)
            }
        })
    }
    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.certificate ? item.certificate.split('/').pop()  : 'No Certificate Uploaded'}</td>
            <td>{moment(item.issue_date).format('MMMM d, YYYY')}</td>
            <td className={'d-flex'}>
                <Link to={`/employee/award/${item.id}/update`}>
                    <IconButton type={'warning'} icon_class={'bx-edit'}/>
                </Link>
                <IconButton type={'danger'} icon_class={'bx-trash'} onClick={() => delete_award(item.id)}/>
            </td>
        </tr>
    )
    if (!awards) return <p>Loading ...</p>
    else return (
        <div>
            <div className="row">
                <div className="col-10">
                    <h2 className="page-header">
                        Award List
                    </h2>
                </div>
                <div className="col-2">
                    <Link to={'/employee/award/create'}>
                        <Button color={'primary'} content={'Add New Award'}/>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                limit='10'
                                headData={tableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={awards}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Award
