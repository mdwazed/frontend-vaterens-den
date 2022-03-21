import React, {useEffect, useState} from 'react';
import {employee_id} from "../../../utils/storage";
import axios from "axios";

const CvDetail = (props) => {
    const update_url = `${process.env.REACT_APP_API_ROOT_V1}cv/${props.match.params.id}/?employee_id=${employee_id()}`
    const [resume, setResume] = useState({})
    useEffect(() => {
        axios
            .get(update_url)
            .then((response) => {
                setResume(response.data)
            });
    }, [props.match.params.id, update_url]);
    console.log(resume)
    return (

        <div>
            <div className="row">
                <div className="col-10">
                    <h2 className="page-header">Resume <span className="text-primary">{resume.resume_name}</span></h2>
                </div>
            </div>
            <div className="card">
                <object width="100%" height="400" data={`${process.env.REACT_APP_API_DOMAIN}${resume.resume}`}
                        type="application/pdf" />
            </div>
        </div>

    );
};

export default CvDetail;