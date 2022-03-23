import React, {useEffect, useState} from 'react'

import Table from '../../../components/table/Table'
import Button from "../../../components/button/Button";
import IconButton from "../../../components/button/IconButton";
import {Link} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {Delete} from "../../../utils/actions";
import {employee_id} from "../../../utils/storage";
import Badge from "../../../components/badge/Badge";

const tableHead = [
    'id',
    'name',
    'description',
    'skill_level',
    'is_special',
    'action'
]
const renderHead = (item, index) => <th key={index}>{item}</th>



const Skill = () => {
    const [skills, setState] = useState([])
    useEffect(() => {
        axios.get(`/skill/?employee_id=${employee_id()}`).then((response) => {setState(response.data)})
    }, [])
    console.log(skills)
    const delete_skill = (id) => {
        Swal.fire({
            title: 'Are you sure you want to delete this?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            icon: 'question',
            confirmButtonColor: 'red'
        }).then((result) => {
            if (result.isConfirmed) {
                return Delete(`${process.env.REACT_APP_API_ROOT_V1}skill/${id}/`, id, skills, setState)
            }
        })
    }
    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.skill_level}</td>
            <td>
                <Badge type={'primary'} content={item.is_special ? 'YES' : 'NO'} />
            </td>
            <td className={'d-flex'}>
                <Link to={`/employee/skill/${item.id}/update`}>
                    <IconButton type={'warning'} icon_class={'bx-edit'}/>
                </Link>
                <IconButton type={'danger'} icon_class={'bx-trash'} onClick={() => delete_skill(item.id)}/>
            </td>
        </tr>
    )
    if (!skills) return <p>Loading ...</p>
    else return (
        <div>
            <div className="row">
                <div className="col-10">
                    <h2 className="page-header">
                        Skill List
                    </h2>
                </div>
                <div className="col-2">
                    <Link to={'/employee/skill/create'}>
                        <Button color={'primary'} content={'Add New Skill'}/>
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
                                bodyData={skills}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Skill
