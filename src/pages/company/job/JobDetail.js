import React, {useEffect, useState} from 'react';
import axios from "axios";
import parse from 'html-react-parser';

const JobDetail = (props) => {
    let api_root = process.env.REACT_APP_API_ROOT_V1
    const [job, setJob] = useState({})
    useEffect(() => {
        axios
            .get(`${api_root}job/${props.match.params.id}/`)
            .then((response) => {
                setJob(response.data)
            });

    }, [api_root, props.match.params.id])
    return (
        <div>
            <div className="row">
                <div className="col-10">
                    <h2 className="page-header">Job Detail</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h2>{job.title}</h2>
                        </div>
                        <div className="card-body">
                            {job.description ? parse(job.description) : 'No Description provided\n' + job.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetail;