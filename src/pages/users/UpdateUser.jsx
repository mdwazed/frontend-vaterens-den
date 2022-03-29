import React, {useEffect, useState} from "react";

import Button from "../../components/button/Button";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import axios from "axios";
import FormInput from "../../components/form/form_input/FormInput";
import SelectInput from "../../components/form/form_input/SelectInput";
import Swal from "sweetalert2";

const UpdateUser = (props) => {
    const {
        handleSubmit,
        register,
        formState: {errors},
        reset,
    } = useForm({
        defaultValues: {
            username: '', first_name: '', last_name: '', email: '', phone: '', gender: ''
        }
    });
    const history = useHistory();
    const formData = new FormData();

    let [photo, setPhoto] = useState();
    const handleChangeImage = (e) => {
        if (e.target.files.length !== 0) setPhoto(URL.createObjectURL(e.target.files[0]));
    };
    useEffect(() => {
        console.log(`${process.env.REACT_APP_API_ROOT_V1}user/${props.match.params.id}/`)
        axios
            .get(`${process.env.REACT_APP_API_ROOT_V1}user/${props.match.params.id}/`)
            .then((response) => {
                reset(response.data)
                setPhoto(response.data.photo)
                console.log(response.data)
            });
    }, [reset, props.match.params.id]);

    const onSubmit = async (data) => {
        formData.append('first_name', data.first_name)
        formData.append('last_name', data.last_name)
        formData.append('username', data.username)
        formData.append('email', data.email)
        formData.append('phone', data.phone)
        formData.append('gender', data.gender)
        if (data.photo && data.photo !== photo) formData.append('photo', data.photo[0])
        axios.put(`/user/${props.match.params.id}/`, formData).then((res) => {
            Swal.fire(
                'Success!',
                'Updated successfully',
                'success'
            ).then(() => {
                history.push('/users/')
            })
        })
            .catch(function (error) {
                let message = ''
                let keys = Object.keys(error.response?.data)
                for (let i = 0; i < keys.length; i++) message += `${error.response?.data[keys[i]][0]}<br>`
                Swal.fire('Error', message, 'error')
            })
    };
    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-10">
                        <h2 className="page-header">Update User</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card__body">
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    encType={"multipart/form-data"}
                                >
                                    <div className="row">
                                        <div className="col-6">
                                            <FormInput
                                                label={'Username'}
                                                name={'username'}
                                                register={register}
                                                errors={errors}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <SelectInput
                                                label={'Gender'}
                                                name={'gender'}
                                                register={register}
                                                errors={errors}
                                                options={[
                                                    {'value': 'F', 'label': 'Female'},
                                                    {'value': 'M', 'label': 'Male'},
                                                ]}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6">
                                            <FormInput
                                                label={'First Name'}
                                                name={'first_name'}
                                                register={register}
                                                errors={errors}
                                            />
                                        </div>

                                        <div className="col-6">
                                            <FormInput
                                                label={'Last Name'}
                                                name={'last_name'}
                                                register={register}
                                                errors={errors}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6">
                                            <FormInput
                                                label={'Email'}
                                                name={'email'}
                                                type={'email'}
                                                register={register}
                                                errors={errors}
                                            />
                                        </div>

                                        <div className="col-6">
                                            <FormInput
                                                label={'Phone Number'}
                                                name={'phone'}
                                                register={register}
                                                errors={errors}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6">
                                            <FormInput
                                                label={'Photo'}
                                                name={'photo'}
                                                register={register}
                                                errors={errors}
                                                type={'file'}
                                                accept={"image/*"}
                                                onChange={handleChangeImage}
                                            />
                                        </div>
                                        <div className="col-6">
                                            {photo && <img src={photo} className={"avatar"} height={'100px'}
                                                           alt={'Thumbnail'}/>}
                                        </div>
                                    </div>

                                    <Button
                                        type={"submit"}
                                        color={"primary float-right mt-3"}
                                        content={"Save User Info"}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;
