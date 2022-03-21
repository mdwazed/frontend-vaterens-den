import React, {useEffect, useState} from 'react'

import Table from '../../../components/table/Table'
import Button from "../../../components/button/Button";
import IconButton from "../../../components/button/IconButton";
import {Link} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {Delete} from "../../../utils/crud";
import {employee_id} from "../../../utils/storage";
import Badge from "../../../components/badge/Badge";
import moment from "moment";

const tableHead = [
    'id',
    'designation',
    'company',
    'description',
    'join date',
    'resign date',
    'still working',
    'action'
]
const renderHead = (item, index) => <th key={index}>{item}</th>



const Experience = () => {
    const [experiences, setState] = useState([])
    useEffect(() => {
        axios.get(`/experience/?employee_id=${employee_id()}`).then((response) => {setState(response.data)})
    }, [])
    const delete_experience = (id) => {
        Swal.fire({
            title: 'Are you sure you want to delete this?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            icon: 'question',
            confirmButtonColor: 'red'
        }).then((result) => {
            if (result.isConfirmed) {
                return Delete(`${process.env.REACT_APP_API_ROOT_V1}experience/${id}/`, id, experiences, setState)
            }
        })
    }
    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item.id}</td>
            <td>{item.designation}</td>
            <td>{item.company}</td>
            <td>{item.description}</td>
            <td>{moment(item.joined_date).format('MMMM d, YYYY')}</td>
            <td>{moment(item.resign_date).format('MMMM d, YYYY')}</td>
            <td>
                <Badge type={'primary'} content={item.still_working ? 'YES' : 'NO'} />
            </td>
            <td className={'d-flex'}>
                <Link to={`/employee/experience/${item.id}/update`}>
                    <IconButton type={'warning'} icon_class={'bx-edit'}/>
                </Link>
                <IconButton type={'danger'} icon_class={'bx-trash'} onClick={() => delete_experience(item.id)}/>
            </td>
        </tr>
    )
    if (!experiences) return <p>Loading ...</p>
    else return (
        <div>
            <div className="row">
                <div className="col-10">
                    <h2 className="page-header">
                        Experience List
                    </h2>
                </div>
                <div className="col-2">
                    <Link to={'/employee/experience/create'}>
                        <Button color={'primary'} content={'Add New Experience'}/>
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
                                bodyData={experiences}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Experience