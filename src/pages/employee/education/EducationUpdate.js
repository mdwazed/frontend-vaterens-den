import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {update} from "../../../utils/crud";
import {employee_id} from "../../../utils/storage";
import FormInput from "../../../components/form/form_input/FormInput";
import Button from "../../../components/button/Button";
import axios from "axios";

const EducationUpdate = (props) => {
    const {
        handleSubmit,
        register,
        formState: {errors},
        reset
    } = useForm();

    const history = useHistory()
    const update_url = `${process.env.REACT_APP_API_ROOT_V1}education/${props.match.params.id}/?employee_id=${employee_id()}`

    useEffect(() => {
        axios
            .get(update_url)
            .then((response) => {
                reset(response.data)
                console.log(response.data)
            });
    }, [reset, props.match.params.id, update_url]);
    const onSubmit = async (data) => {
        update(
            data,
            update_url,
            history,
            '/employee/education/'
        )
    };

    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-10">
                        <h2 className="page-header">Update Education</h2>
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
                                                label={'education level'}
                                                name={'education_level'}
                                                register={register}
                                                errors={errors}
                                                required={true}
                                            />
                                        </div>

                                        <div className="col-6">
                                            <FormInput
                                                label={'institute name'}
                                                name={'institute_name'}
                                                register={register}
                                                errors={errors}
                                                required={true}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">

                                        <div className="col-6">
                                            <FormInput
                                                label={'Result in GPA/CGPA'}
                                                name={'result'}
                                                register={register}
                                                errors={errors}
                                                type={'number'}
                                                step="0.01"
                                            />
                                        </div>
                                        <div className="col-6">
                                            <FormInput
                                                name={'still_reading'}
                                                register={register}
                                                errors={errors}
                                                type={'checkbox'}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <FormInput
                                                name={'from_date'}
                                                register={register}
                                                errors={errors}
                                                type={'date'}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <FormInput
                                                name={'completion_date'}
                                                register={register}
                                                errors={errors}
                                                type={'date'}
                                            />
                                        </div>
                                    </div>
                                    <Button type={'submit'} color={'primary float-right mt-3'} content={'Save'}/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EducationUpdate;