import React, {useEffect, useState} from 'react'

import Table from '../../components/table/Table'
// import userList from '../../assets/JsonData/user-list.json'
import Badge from "../../components/badge/Badge";
import Button from "../../components/button/Button";
import IconButton from "../../components/button/IconButton";
import {Link} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {Delete} from "../../utils/actions";

const userTableHead = [
    'id',
    'first_name',
    'last_name',
    'email',
    'username',
    'phone',
    'gender',
    'is_superuser',
    'is_staff',
    'is_active',
    'action'
]
const renderHead = (item, index) => <th key={index}>{item}</th>



const Users = () => {
    const [userList, setState] = useState([])
    useEffect(() => {
        axios.get(`/user/`)
            .then((response) => {
                setState(response.data);
            })
    }, [])
    const delete_user = (id) => {
        Swal.fire({
            title: 'Are you sure you want to delete this?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            icon: 'question',
            confirmButtonColor: 'red'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Delete(`${process.env.REACT_APP_API_ROOT_V1}user/${id}/`, id, userList, setState)
            }
        })
    }
    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item.id}</td>
            <td>{item.first_name}</td>
            <td>{item.last_name}</td>
            <td>{item.email}</td>
            <td>{item.username}</td>
            <td>{item.phone}</td>
            <td>{item.gender}</td>
            <td>
                <Badge type={item.is_superuser ? 'success' : 'danger'} content={item.is_superuser ? 'Yes' : 'No'}/>
            </td>
            <td>
                <Badge type={item.is_staff ? 'success' : 'danger'} content={item.is_staff ? 'Yes' : 'No'}/>
            </td>
            <td>
                <Badge type={item.is_active ? 'success' : 'danger'} content={item.is_active ? 'Active' : 'Not Active'}/>
            </td>
            <td className={'d-flex'}>
                <Link to={`/users/${item.id}/update`}>
                    <IconButton type={'warning'} icon_class={'bx-edit'}/>
                </Link>
                <IconButton type={'danger'} icon_class={'bx-trash'} onClick={() => delete_user(item.id)}/>
                <Link to={`/users/${item.id}/profile`}>
                    <IconButton type={'success'} icon_class={'bx-detail'}/>
                </Link>
            </td>
        </tr>
    )
    if (!userList) return <p>Loading User List...</p>
    else return (
        <div>
            <div className="row">
                <div className="col-10">
                    <h2 className="page-header">
                        users
                    </h2>
                </div>
                <div className="col-2">
                    <Link to={'/users/create'}>
                        <Button color={'primary'} content={'Create New User'}/>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                limit='10'
                                headData={userTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={userList}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users
