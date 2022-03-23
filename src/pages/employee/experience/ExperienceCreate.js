import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {create} from "../../../utils/actions";
import FormInput from "../../../components/form/form_input/FormInput";
import Button from "../../../components/button/Button";
import {employee_id} from "../../../utils/storage";
import TextArea from "../../../components/form/form_input/TextArea";

const ExperienceCreate = () => {
    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm();
    const history = useHistory()

    const [joined_date, setJoinedDate] = useState('')
    const [resign_date, setResignDate] = useState('')

    const onSubmit = (data) => {
        const form_data = {
            'designation': data.designation,
            'company': data.company,
            'description': data.description,
            'joined_date': joined_date,
            'resign_date': resign_date,
            'still_working': data.still_working,
        }
        console.log(form_data)
        create(
            form_data,
            `${process.env.REACT_APP_API_ROOT_V1}experience/?employee_id=${employee_id()}`,
            history, '/employee/experience/'
        )
    };

    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-10">
                        <h2 className="page-header">Add Experience</h2>
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

export default ExperienceCreate;