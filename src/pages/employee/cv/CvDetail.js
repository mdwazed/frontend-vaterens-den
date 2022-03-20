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
    }, [props.match.params.id]);
    console.log(resume)
    return (

        <div>
            <div className="row">
                <div className="col-10">
                    <h2 className="page-header">Resume <span className="text-primary">{resume.designation}</span></h2>
                </div>
            </div>
            <div className="card">
                <div className="row ">
                    <div className="col-md-4">
                        <img src={`${process.env.REACT_APP_API_DOMAIN}${resume?.user?.photo}`} className="w-100"
                             alt={resume.designation}/>
                    </div>
                    <div className="col-md-8 px-3">
                        <div className="card-block px-3">
                            <h4 className="card-title">{resume.designation}</h4>
                            <p className="card-text">{resume.career_objective}</p>
                        </div>
                    </div>
                </div>
                <object width="100%" height="400" data={`${process.env.REACT_APP_API_DOMAIN}${resume.cv}`}
                        type="application/pdf" />
            </div>
        </div>

    );
};

export default CvDetail;