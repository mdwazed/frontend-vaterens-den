import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {update} from "../../../utils/crud";
import {employee_id} from "../../../utils/storage";
import FormInput from "../../../components/form/form_input/FormInput";
import Button from "../../../components/button/Button";
import axios from "axios";

const TrainingUpdate = (props) => {
    const {
        handleSubmit,
        register,
        formState: {errors},
        reset
    } = useForm();

    const history = useHistory()
    const update_url = `${process.env.REACT_APP_API_ROOT_V1}training/${props.match.params.id}/?employee_id=${employee_id()}`
    const [certificate, setCertificate] = useState('')
    useEffect(() => {
        axios
            .get(update_url)
            .then((response) => {
                reset(response.data)
                setCertificate(response.data.certificate)
                console.log(response.data)
            });
    }, [reset, props.match.params.id, update_url]);
    const formData = new FormData();

    const [fromDate, setFromDate] = useState('');
    const [completionDate, setCompletionDate] = useState('');

    const onSubmit = (data) => {
        formData.append('name', data.name)
        formData.append('organization', data.organization)
        formData.append('completion_date', completionDate)
        formData.append('from_date', fromDate)
        if (data.certificate > 0) formData.append('certificate', data.certificate[0])
        update(
            formData,
            update_url,
            history,
            '/employee/training/'
        )
    };

    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-10">
                        <h2 className="page-header">Update Training</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card__body">
                                <form onSubmit={handleSubmit(onSubmit)} encType={''}>
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
                                            <p>
                                                Current Certificate: <a href={certificate} className="text-primary" target={'_blank'} rel={'noopener noreferrer'}>{certificate ? certificate.split('/').pop(): 'No Certificate Uploaded'}</a>
                                            </p>                                        </div>
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

export default TrainingUpdate;