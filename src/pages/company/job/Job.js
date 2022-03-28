import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Delete} from "../../../utils/actions";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import IconButton from "../../../components/button/IconButton";
import Table from "../../../components/table/Table";
import Badge from "../../../components/badge/Badge";

const tableHead = [
    'id',
    'title',
    'number_of_position',
    'job_location',
    'published_on',
    'application_deadline',
    'salary_range',
    'experience',
    'category',
    'company',
    'key_skills',
    'employment_type',
    'action'
]
const renderHead = (item, index) => <th key={index}>{item.replaceAll('_', ' ')}</th>



const Jobs = () => {
    const [jobList, setState] = useState([])
    useEffect(() => {
        axios.get(`/job/`)
            .then((response) => {
                setState(response.data);
            })
    }, [])
    console.log(jobList)
    const delete_job = (id) => {
        Delete(`${process.env.REACT_APP_API_ROOT_V1}job/${id}/`, id, jobList, setState)
    }
    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.number_of_position}</td>
            <td>{item.job_location}</td>
            <td>{item.published_on}</td>
            <td>{item.application_deadline}</td>
            <td>{item.salary_range}</td>
            <td>{item.experience}</td>
            <td>{item.category.name}</td>
            <td>{item.company.name}</td>
            <td>{item.key_skills.map(skill => {
                return <Badge type={'secondary'}  content={skill.name} />
            })}</td>
            <td>{item.employment_type}</td>
            <td className={'d-flex'}>
                <Link to={`/employer/jobs/${item.id}/update`}>
                    <IconButton type={'warning'} icon_class={'bx-edit'}/>
                </Link>
                <IconButton type={'danger'} icon_class={'bx-trash'} onClick={() => delete_job(item.id)}/>
                <Link to={`/employer/jobs/${item.id}/detail`}>
                    <IconButton type={'success'} icon_class={'bx-detail'}/>
                </Link>
            </td>
        </tr>
    )

    if (!jobList) return <p>Loading User List...</p>
    else return (
        <div>
            <div className="row">
                <div className="col-10">
                    <h2 className="page-header">
                        jobs
                    </h2>
                </div>
                <div className="col-2">
                    <Link to={'/employer/jobs/create'}>
                        <Button color={'primary'}>Add New Job</Button>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <Table
                                className={'table-bordered'}
                                limit='10'
                                headData={tableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={jobList}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs
