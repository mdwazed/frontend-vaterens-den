import React, {useEffect, useState} from 'react'

import Table from '../../../components/table/Table'
import Button from "../../../components/button/Button";
import IconButton from "../../../components/button/IconButton";
import {Link} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {Delete} from "../../../utils/actions";
import {employee_id} from "../../../utils/storage";

const tableHead = [
    'id',
    'name',
    'description',
    'action'
]
const renderHead = (item, index) => <th key={index}>{item}</th>



const ArmService = () => {
    const [arm_services, setState] = useState([])
    useEffect(() => {
        axios.get(`/arm-service/?employee_id=${employee_id()}`).then((response) => {setState(response.data)})
    }, [])
    console.log(arm_services)
    const delete_arm_service = (id) => {
        Swal.fire({
            title: 'Are you sure you want to delete this?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            icon: 'question',
            confirmButtonColor: 'red'
        }).then((result) => {
            if (result.isConfirmed) {
                return Delete(`${process.env.REACT_APP_API_ROOT_V1}arm-service/${id}/`, id, arm_services, setState)
            }
        })
    }
    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td className={'d-flex'}>
                <Link to={`/employee/arm-service/${item.id}/update`}>
                    <IconButton type={'warning'} icon_class={'bx-edit'}/>
                </Link>
                <IconButton type={'danger'} icon_class={'bx-trash'} onClick={() => delete_arm_service(item.id)}/>
            </td>
        </tr>
    )
    if (!arm_services) return <p>Loading ...</p>
    else return (
        <div>
            <div className="row">
                <div className="col-10">
                    <h2 className="page-header">
                        ArmService List
                    </h2>
                </div>
                <div className="col-2">
                    <Link to={'/employee/arm-service/create'}>
                        <Button color={'primary'} content={'Add New ArmService'}/>
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
                                bodyData={arm_services}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArmService
