import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {create} from "../../../utils/actions";
import FormInput from "../../../components/form/form_input/FormInput";
import Button from "../../../components/button/Button";
import {user_id} from "../../../utils/storage";

const TrainingCreate = () => {
    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm();
    const history = useHistory()
    const [fromDate, setFromDate] = useState('');
    const [completionDate, setCompletionDate] = useState('');
    const formData = new FormData();

    const onSubmit = (data) => {
        formData.append('name', data.name)
        formData.append('organization', data.organization)
        formData.append('completion_date', completionDate)
        formData.append('from_date', fromDate)
        if (data.certificate.length > 0) formData.append('certificate', data.certificate[0])
        create(
            formData,
            `${process.env.REACT_APP_API_ROOT_V1}training/?user_id=${user_id()}`,
            history, '/employee/training/'
        )
    };

    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-10">
                        <h2 className="page-header">Add Training</h2>
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
                                                name={'name'}
                                                register={register}
                                                errors={errors}
                                                required={true}
                                            />
                                        </div>

                                        <div className="col-6">
                                            <FormInput
                                                name={'organization'}
                                                register={register}
                                                errors={errors}
                                                required={true}
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
                                                onChange={e => setFromDate(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <FormInput
                                                name={'completion_date'}
                                                register={register}
                                                errors={errors}
                                                type={'date'}
                                                onChange={e => setCompletionDate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <FormInput
                                                name={'certificate'}
                                                register={register}
                                                errors={errors}
                                                type={'file'}
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

export default TrainingCreate;