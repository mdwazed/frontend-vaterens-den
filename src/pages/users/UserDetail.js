import React, {useEffect, useState} from "react";
import './UserDetail.css'
import axios from "axios";
import {Link} from "react-router-dom";

const UserDetail = (props) => {
    const initUserSate = {
        "id": null,
        "last_login": null,
        "is_superuser": false,
        "phone": "",
        "username": "",
        "email": "",
        "first_name": "",
        "last_name": "",
        "is_staff": null,
        "is_active": null,
        "gender": "",
        "photo": null,
        "groups": [],
        "user_permissions": [],
        "full_name": "",
        "employee": {
            "id": null,
            "designation": "",
            "company": "",
            "address": {
                "id": null,
                "house_no": "",
                "street_name": "",
                "care_of": "",
                "village": "",
                "division": "",
                "district": "",
                "upazila": "",
                "post_code": ""
            },
            "educations": [],
            "experience": [],
            "trainings": [],
            "cv": {
                "id": null,
                "cv": null,
                "career_objective": "",
                "designation": "",
                "social_links": null,
            },
            "special_activities": [],
            "award": [],
            "armsservices": [],
            "skills": []
        }
    }
    const [user, setUser] = useState(initUserSate)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_ROOT_V1}user/${props.match.params.id}/profile/`).then((response) => {
            setUser(response.data)
        })
    }, [props.match.params.id])
    return (
        <div>
            <div className="row">
                <div className="col-10">
                    <h2 className="page-header">User Profile</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <div className="container">
                                <div className="team-single">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-5 xs-margin-30px-bottom">
                                            <div className="team-single-img">
                                                <img src={user.photo} alt={user.full_name} className={'img-thumbnail'}/>
                                            </div>
                                            <div
                                                className="bg-light-gray padding-30px-all md-padding-25px-all sm-padding-20px-all text-center">
                                                <h4 className="margin-10px-bottom font-size24 md-font-size22 sm-font-size20 font-weight-600">
                                                    {user.full_name}
                                                </h4>
                                                <p className="sm-width-95 sm-margin-auto">
                                                    {user.employee.designation}
                                                </p>
                                                <div className="margin-20px-top team-single-icons">
                                                    <ul className="no-margin">
                                                        <li>
                                                            <a href={window.location.href}>
                                                                <i className="fab fa-facebook-f"/>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href={window.location.href}>
                                                                <i className="fab fa-twitter"/>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href={window.location.href}>
                                                                <i className="fab fa-google-plus-g"/>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href={window.location.href}>
                                                                <i className="fab fa-instagram"/>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="bg-light-gray mt-4 p-3">
                                                    <h5>Jobs Applied</h5>
                                                <a href={window.location.href} className="list-group-item list-group-item-action  border-0">
                                                    MC Solution Looking for Python Dev <span className="badge badge-success float-right">Short Listed</span>
                                                </a>
                                                <a href={window.location.href} className="list-group-item list-group-item-action  border-0">
                                                    Sapience Trio Looking For Frontend Dev <span className="badge badge-primary float-right">reviewed</span>
                                                </a>
                                                <a href={window.location.href} className="list-group-item list-group-item-action  border-0">
                                                    F&R Looking for Senior Developer <span className="badge badge-danger float-right">rejected</span>
                                                </a>
                                            </div>
                                            <div className="bg-light-gray mt-4 p-3">
                                                <h5>All CV </h5>
                                                <div className="list-group w-100">
                                                    <Link to={`/users/${props.match.params.id}/resume`} className="list-group-item list-group-item-action  border-0">
                                                        Python Developer resume  <span className="badge badge-secondary float-right">12 <i className="fa fa-eye" /></span>
                                                    </Link>
                                                    <a href={window.location.href} className="list-group-item list-group-item-action  border-0">
                                                        Software Engineer resume  <span className="badge badge-secondary float-right">34 <i className="fa fa-eye" /></span>
                                                    </a>
                                                    <a href={window.location.href} className="list-group-item list-group-item-action  border-0">
                                                        React Developer resume  <span className="badge badge-secondary float-right">0 <i className="fa fa-eye" /></span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-8 col-md-7">
                                            <div className="team-single-text padding-50px-left sm-no-padding-left">
                                                <h4 className="font-size20 sm-font-size32 xs-font-size30">
                                                    Career Objective
                                                </h4>
                                                <p className="no-margin-bottom">
                                                    {user.employee.cv.career_objective}
                                                </p>
                                                <div className="contact-info-section margin-40px-tb">
                                                    <ul className="list-style9 no-margin">
                                                        <li>

                                                            <div className="row">
                                                                <div className="col-md-5 col-5">
                                                                    <i className="fas fa-graduation-cap"/>
                                                                    <strong
                                                                        className="ml-1">Educations:</strong>
                                                                </div>
                                                                <div className="col-md-7 col-7">
                                                                    {user.employee.educations.map((degree) => {
                                                                        return <div key={degree.id}>
                                                                            <p> {degree.education_level}
                                                                                <span className="badge badge-success ml-3">{degree.result}</span>
                                                                            </p>
                                                                        </div>
                                                                    })}
                                                                </div>
                                                            </div>

                                                        </li>
                                                        <li>

                                                            <div className="row">
                                                                <div className="col-md-5 col-5">
                                                                    <i className="far fa-gem"/>
                                                                    <strong
                                                                        className="ml-1">Experience:</strong>
                                                                </div>
                                                                <div className="col-md-7 col-7">
                                                                    {user.employee.experience.map((e) => {
                                                                        return <div key={e.id}>
                                                                            <p>
                                                                                {e.designation}
                                                                                <span className="badge badge-dark ml-3">
                                                                                {e.joined_date} To {e.resign_date}
                                                                            </span>
                                                                            </p>
                                                                            <p>{e.description.length > 200 ? e.description.substring(0, 200) + "..." : e.description}</p>
                                                                        </div>
                                                                    })}
                                                                </div>
                                                            </div>

                                                        </li>
                                                        <li>

                                                            <div className="row">
                                                                <div className="col-md-5 col-5">
                                                                    <i className="far fa-file"/>
                                                                    <strong
                                                                        className="ml-1">Training:</strong>
                                                                </div>
                                                                <div className="col-md-7 col-7">
                                                                    {user.employee.trainings.map(e=>{
                                                                        return <div key={e.id} className={'border-bottom'}>
                                                                             <p className={'lead'}>
                                                                                  {e.name}
                                                                            </p>
                                                                            <p>
                                                                                Duration: {e.from_date} To {e.completion_date}
                                                                            </p>
                                                                            <p>Organization: {e.organization}</p>
                                                                            <p>Certificate : {e.certificate}</p>
                                                                        </div>
                                                                    })}
                                                                </div>
                                                            </div>

                                                        </li>
                                                        <li>

                                                            <div className="row">
                                                                <div className="col-md-5 col-5">
                                                                    <i className="fas fa-map-marker-alt"/>
                                                                    <strong
                                                                        className="ml-1">Address:</strong>
                                                                </div>
                                                                <div className="col-md-7 col-7">
                                                                    <p>
                                                                        {user.employee.address.village}, {user.employee.address.upazila}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                        </li>
                                                        <li>

                                                            <div className="row">
                                                                <div className="col-md-5 col-5">
                                                                    <i className="fas fa-mobile-alt"/>
                                                                    <strong
                                                                        className="ml-1">Phone:</strong>
                                                                </div>
                                                                <div className="col-md-7 col-7">
                                                                    <p>{user.phone}</p>
                                                                </div>
                                                            </div>

                                                        </li>
                                                        <li>
                                                            <div className="row">
                                                                <div className="col-md-5 col-5">
                                                                    <i className="fas fa-envelope"/>
                                                                    <strong
                                                                        className="ml-1">Email:</strong>
                                                                </div>
                                                                <div className="col-md-7 col-7">
                                                                    <p>
                                                                        <a href="mailto:">{user.email}</a>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <h5 className="font-size24 sm-font-size22 xs-font-size20">
                                                    Professional Skills
                                                </h5>
                                                <div className="sm-no-margin">
                                                    <div className="progress-text">
                                                        <div className="row">
                                                            <div className="col-7">Positive Behaviors</div>
                                                            <div className="col-5 text-right">40%</div>
                                                        </div>
                                                    </div>
                                                    <div className="custom-progress progress">
                                                        <div role="progressbar" aria-valuenow="70" aria-valuemin="0"
                                                             aria-valuemax="100" style={{width: "40%"}}
                                                             className="animated custom-bar progress-bar slideInLeft bg-sky"/>
                                                    </div>
                                                    <div className="progress-text">
                                                        <div className="row">
                                                            <div className="col-7">Teamworking Abilities</div>
                                                            <div className="col-5 text-right">50%</div>
                                                        </div>
                                                    </div>
                                                    <div className="custom-progress progress">
                                                        <div role="progressbar" aria-valuenow="70" aria-valuemin="0"
                                                             aria-valuemax="100" style={{width: "50%"}}
                                                             className="animated custom-bar progress-bar slideInLeft bg-orange"/>
                                                    </div>
                                                    <div className="progress-text">
                                                        <div className="row">
                                                            <div className="col-7">Time Management</div>
                                                            <div className="col-5 text-right">60%</div>
                                                        </div>
                                                    </div>
                                                    <div className="custom-progress progress">
                                                        <div role="progressbar" aria-valuenow="70" aria-valuemin="0"
                                                             aria-valuemax="100" style={{width: "60%"}}
                                                             className="animated custom-bar progress-bar slideInLeft bg-green"/>
                                                    </div>
                                                    <div className="progress-text">
                                                        <div className="row">
                                                            <div className="col-7">Excellent Communication</div>
                                                            <div className="col-5 text-right">80%</div>
                                                        </div>
                                                    </div>
                                                    <div className="custom-progress progress">
                                                        <div role="progressbar" aria-valuenow="70" aria-valuemin="0"
                                                             aria-valuemax="100" style={{width: "80%"}}
                                                             className="animated custom-bar progress-bar slideInLeft bg-yellow"/>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
