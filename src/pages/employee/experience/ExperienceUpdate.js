import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {update} from "../../../utils/actions";
import FormInput from "../../../components/form/form_input/FormInput";
import Button from "../../../components/button/Button";
import {employee_id} from "../../../utils/storage";
import TextArea from "../../../components/form/form_input/TextArea";
import axios from "axios";

const ExperienceUpdate = (props) => {
    const {
        handleSubmit,
        register,
        formState: {errors},
        reset
    } = useForm();
    const update_url = `${process.env.REACT_APP_API_ROOT_V1}experience/${props.match.params.id}/?employee_id=${employee_id()}`

    useEffect(() => {
        axios
            .get(update_url)
            .then((response) => {
                reset(response.data)
                console.log(response.data)
            });
    }, [reset, props.match.params.id, update_url]);

    const history = useHistory()

    const [joined_date, setJoinedDate] = useState('')
    const [resign_date, setResignDate] = useState('')

    const onSubmit = (data) => {
        const form_data = {
            'designation': data.designation,
            'company': data.company,
            'description': data.description,
            'joined_date': joined_date ? joined_date : data.joined_date,
            'resign_date': resign_date ? resign_date : data.resign_date,
            'still_working': data.still_working,
        }
        console.log(form_data)
        update(
            form_data,
            update_url,
            history, '/employee/experience/'
        )
    };

    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-10">
                        <h2 className="page-header">Update Experience</h2>
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
                                                label={'designation'}
                                                name={'designation'}
                                                register={register}
                                                errors={errors}
                                                required={true}
                                            />
                                        </div>

                                        <div className="col-6">
                                            <FormInput
                                                label={'company name'}
                                                name={'company'}
                                                register={register}
                                                errors={errors}
                                                required={true}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">

                                        <div className="col-6">
                                            <TextArea
                                                label={'description'}
                                                name={'description'}
                                                register={register}
                                                errors={errors}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <FormInput
                                                name={'still_working'}
                                                register={register}
                                                errors={errors}
                                                type={'checkbox'}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <FormInput
                                                name={'joined_date'}
                                                register={register}
                                                errors={errors}
                                                type={'date'}
                                                onChange={e => setJoinedDate(e.target.value)}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <FormInput
                                                name={'resign_date'}
                                                register={register}
                                                errors={errors}
                                                type={'date'}
                                                onChange={e => setResignDate(e.target.value)}
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

export default ExperienceUpdate;