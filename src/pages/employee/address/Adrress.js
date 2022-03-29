import React, {useEffect} from "react";

import {useForm} from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import FormInput from "../../../components/form/form_input/FormInput";
import Button from "../../../components/button/Button";

const Address = (props) => {
    const {
        handleSubmit,
        register,
        formState: {errors},
        reset,
    } = useForm({});

    useEffect(() => {
        console.log(`${process.env.REACT_APP_API_ROOT_V1}address/2/`)
        axios
            .get(`${process.env.REACT_APP_API_ROOT_V1}user/${props.match.params.id}/`)
            .then((response) => {
                reset(response.data)
            });
    }, [reset, props.match.params.id]);

    const onSubmit = async (data) => {
        axios.put(`/user/${props.match.params.id}/`, data).then((res) => {
            Swal.fire(
                'Success!',
                'Updated successfully',
                'success'
            )
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
                        <h2 className="page-header">Update Address</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card__body">
                                <form onSubmit={handleSubmit(onSubmit)}>

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
                                        content={"Save Address Info"}
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

export default Address;
