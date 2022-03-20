import React from "react";
import {useForm} from "react-hook-form";

import Button from "../../components/button/Button";
import FormInput from "../../components/form/form_input/FormInput";
import SelectInput from "../../components/form/form_input/SelectInput";
import {create} from "../../utils/crud";
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
        create(
            formData, `${process.env.REACT_APP_API_ROOT_V1}user/`, history, '/users/'
        )
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
                                <form onSubmit={handleSubmit(onSubmit)} >
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
                                            <FormInput
                                                label={'Password'}
                                                name={'password'}
                                                type={'password'}
                                                register={register}
                                                errors={errors}
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
                                            <SelectInput
                                                label={'Gender'}
                                                name={'gender'}
                                                register={register}
                                                errors={errors}
                                                options={[
                                                    {'value':'F', 'label':'Female'},
                                                    {'value':'M', 'label':'Male'},
                                                ]}
                                            />
                                        </div>

                                        <div className="col-6">
                                            <FormInput
                                                label={'Photo'}
                                                name={'photo'}
                                                register={register}
                                                errors={errors}
                                                type={'file'}
                                            />
                                        </div>
                                    </div>

                                    <Button type={'submit'} color={'primary float-right mt-3'} content={'Save User Info'}/>
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
