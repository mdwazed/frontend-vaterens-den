import React from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import Swal from 'sweetalert2'

import Button from "../../components/button/Button";
import {useHistory} from "react-router-dom";

const CreateUser = () => {

    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm();

    const history = useHistory()
    let formData = new FormData()


    const onSubmit = async (data) => {
        formData.append('first_name', data.first_name)
        formData.append('last_name', data.last_name)
        formData.append('username', data.username)
        formData.append('password', data.password)
        formData.append('email', data.email)
        formData.append('phone', data.phone)
        formData.append('gender', data.gender)
        if (data.photo) formData.append('photo', data.photo[0])
        try {
            await axios.post(`${process.env.REACT_APP_API_ROOT_V1}user/`, formData).then(() => {
                Swal.fire(
                    'Success!',
                    'User created successfully',
                    'success'
                ).then(() => {
                    history.push(`/users/`)
                })
            })

        } catch (error) {
            if (error) {
                console.log(error.response.data);
                let message = ''
                let keys = Object.keys(error.response.data)
                for (let i = 0; i < keys.length; i++) message += `${error.response.data[keys[i]][0]}<br>`
                Swal.fire(
                    'Error',
                    message,
                    'error'
                )
            }

        }
    };

    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-10">
                        <h2 className="page-header">Create User</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card__body">
                                <form onSubmit={handleSubmit(onSubmit)} encType={"multipart/form-data"}>
                                    <div className="row">
                                        <div className="col-6">
                                            <label htmlFor="username"> Username </label>
                                            <input className={'form-control'} type="text"
                                                   id={'username'} {...register("username", {required: "Username is required.",})} />
                                            <p className={'text-danger'}> {errors.username && errors.username.message ? errors.username.message : null}</p>
                                        </div>

                                        <div className="col-6">
                                            <label htmlFor={'password'}> Password </label>
                                            <input className={'form-control'} type="password"
                                                   id={'password'} {...register("password", {required: "Password is required.",})}/>
                                            <p className={'text-danger'}> {errors.password && errors.password.message ? errors.password.message : null}</p>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6">
                                            <label htmlFor="first_name"> First Name </label>
                                            <input className={'form-control'} type="text"
                                                   id={'first_name'} {...register("first_name", {required: "First Name is required.",})} />
                                            <p className={'text-danger'}> {errors.first_name && errors.first_name.message ? errors.first_name.message : null}</p>
                                        </div>

                                        <div className="col-6">
                                            <label htmlFor={'last_name'}> Last Name </label>
                                            <input className={'form-control'} type="text"
                                                   id={'last_name'} {...register("last_name", {required: "Last Name is required.",})}/>
                                            <p className={'text-danger'}> {errors.last_name && errors.last_name.message ? errors.last_name.message : null}</p>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6">
                                            <label htmlFor="email"> Email </label>
                                            <input className={'form-control'} type="email"
                                                   id={'email'} {...register("email", {required: "Email is required.",})} />
                                            <p className={'text-danger'}> {errors.email && errors.email.message ? errors.email.message : null}</p>
                                        </div>

                                        <div className="col-6">
                                            <label htmlFor={'phone'}> Phone Number </label>
                                            <input className={'form-control'} type="text"
                                                   id={'phone'} {...register("phone", {required: "Phone number is required.",})}/>
                                            <p className={'text-danger'}> {errors.phone && errors.phone.message ? errors.phone.message : null}</p>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6">
                                            <label htmlFor="gender"> Gender </label>
                                            <select className={'form-control'} name="gender"
                                                    id="gender" {...register("gender", {required: "Gender is required.",})}>
                                                <option value="F">Female</option>
                                                <option value="M">Male</option>
                                            </select>
                                            <p className={'text-danger'}> {errors.gender && errors.gender.message ? errors.gender.message : null}</p>
                                        </div>

                                        <div className="col-6">
                                            <p className={'text-danger'}> {errors.photo && errors.photo.message ? errors.photo.message : null}</p>
                                            <label htmlFor={'photo'}> Photo </label>
                                            <input className={'form-control'} type="file"
                                                   id={'photo'} {...register("photo", {required: "Photo is required.",})}/>
                                        </div>
                                    </div>

                                    <Button type={'submit'} color={'primary float-right mt-3'}
                                            content={'Save User Info'}/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;
