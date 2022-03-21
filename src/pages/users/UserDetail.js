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
            "cv": [],
            "special_activities": [],
            "award": [],
            "armsservices": [],
            "skills": []
        }
    }
    const [user, setUser] = useState(initUserSate)
    const user_id = props.match.params.id ? props.match.params.id : 2

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_ROOT_V1}user/${user_id}/profile/`).then((response) => {
            setUser(response.data)
        })
    }, [user_id])
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
                                                <h5>All CV </h5>
                                                <div className="list-group w-100">
                                                    {user.employee.cv.map((c) => {
                                                        return <Link to={`/employee/cv/${c.id}/detail`} className="list-group-item list-group-item-action  border-0">
                                                            {c.resume_name}  <span className="badge badge-secondary float-right">12 <i className="fa fa-eye" /></span>
                                                        </Link>
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-8 col-md-7">
                                            <div className="team-single-text padding-50px-left sm-no-padding-left">
                                                <h4 className="font-size20 sm-font-size32 xs-font-size30">
                                                    Career Objective
                                                </h4>
                                                <p className="no-margin-bottom">
                                                    {/*{user.employee.cv[0].career_objective}*/}
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
                                                    {user.employee.skills.map(skill => {
                                                        return <div>
                                                            <div className="progress-text">
                                                                <div className="row">
                                                                    <div className="col-7">{skill.name}</div>
                                                                    <div className="col-5 text-right">{skill.skill_level}%</div>
                                                                </div>
                                                            </div>
                                                            <div className="custom-progress progress">
                                                                <div role="progressbar" aria-valuenow="70" aria-valuemin="0"
                                                                     aria-valuemax="100" style={{width: `${skill.skill_level}%`}}
                                                                     className="animated custom-bar progress-bar slideInLeft bg-sky"/>
                                                            </div>
                                                        </div>
                                                    })}
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
