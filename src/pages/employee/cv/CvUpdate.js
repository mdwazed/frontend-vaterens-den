import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {update} from "../../../utils/actions";
import FormInput from "../../../components/form/form_input/FormInput";
import TextArea from "../../../components/form/form_input/TextArea";
import Button from "../../../components/button/Button";
import axios from "axios";
import {user_id} from "../../../utils/storage";

const CvUpdate = (props) => {
    const {
        handleSubmit,
        register,
        formState: {errors},
        reset
    } = useForm();

    const history = useHistory()
    let formData = new FormData()
    const update_url = `${process.env.REACT_APP_API_ROOT_V1}cv/${props.match.params.id}/?user_id=${user_id()}`
    const [resume, setResume] = useState('')
    useEffect(() => {
        axios
            .get(update_url)
            .then((response) => {
                reset(response.data)
                console.log(response.data.cv)
                setResume(response.data.cv)
            });
    }, [reset, props.match.params.id, update_url]);

    const onSubmit = async (data) => {
        formData.append('career_objective', data.career_objective)
        formData.append('designation', data.designation)
        // formData.append('social_links', data.social_links)
        if (data.cv?.length > 0) formData.append('cv', data.cv[0])
        console.log(formData)
        await update( formData, update_url, history, '/employee/cv/')
    };

    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-10">
                        <h2 className="page-header">Update CV</h2>
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
                                                label={'Designations'}
                                                name={'designation'}
                                                register={register}
                                                errors={errors}
                                                required={true}
                                            />
                                        </div>

                                        <div className="col-6">
                                            <FormInput
                                                label={'Resume'}
                                                name={'cv'}
                                                register={register}
                                                errors={errors}
                                                type={'file'}
                                            />
                                            <p>
                                                Current Resume: <a href={resume} className="text-primary" target={'_blank'} rel={'noopener noreferrer'}>{resume ? resume.split('/').pop(): 'No Resume Uploaded'}</a>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row">

                                        <div className="col-12">
                                            <TextArea
                                                label={'Career Objective'}
                                                name={'career_objective'}
                                                register={register}
                                                errors={errors}
                                            />
                                        </div>
                                    </div>


                                    <Button type={'submit'} color={'primary float-right mt-3'} content={'Save CV Info'}/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CvUpdate;