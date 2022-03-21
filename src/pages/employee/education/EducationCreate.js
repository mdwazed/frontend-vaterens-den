import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {create} from "../../../utils/crud";
import FormInput from "../../../components/form/form_input/FormInput";
import Button from "../../../components/button/Button";
import {employee_id} from "../../../utils/storage";

const EducationCreate = () => {
    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm();
    const history = useHistory()
    const [result, setResult] = useState('');
    const [stillReading, setStillReading] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [completionDate, setCompletionDate] = useState('');


    const onSubmit = (data) => {
        const form_data = {
            'education_level': data.education_level,
            'institute_name': data.institute_name,
            'result': result === '' ? 0 : result,
            'still_reading': stillReading === '' ? false : stillReading,
            'completion_date': completionDate,
            'from_date': fromDate
        }
        console.log(form_data)
        create(
            form_data,
            `${process.env.REACT_APP_API_ROOT_V1}education/?employee_id=${employee_id()}`,
            history, '/employee/education/'
        )
    };

    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-10">
                        <h2 className="page-header">Add Education</h2>
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
                                                max={5.00}
                                                onChange={e => setResult(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <FormInput
                                                name={'still_reading'}
                                                register={register}
                                                errors={errors}
                                                type={'checkbox'}
                                                onChange={e => setStillReading(e.target.value)}
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

export default EducationCreate;