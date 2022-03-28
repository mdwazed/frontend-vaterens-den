import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

import {useHistory} from "react-router-dom";
import {create} from "../../../utils/actions";
import FormInput from "../../../components/form/form_input/FormInput";
import Button from "../../../components/button/Button";
import SelectInput from "../../../components/form/form_input/SelectInput";
import './JobCreate.css'
import {Editor} from "@tinymce/tinymce-react";
import axios from "axios";
import {user_id} from "../../../utils/storage";

const CreateUser = () => {

    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm();

    const history = useHistory()
    const [description, setDescription] = useState('')
    const [categories, setCategories] = useState([])
    const [companies, setCompanies] = useState([])
    const [skills, setSkills] = useState([])

    const handleChange = (content, editor) => {
        setDescription(content)
    }
    let api_root = process.env.REACT_APP_API_ROOT_V1

    useEffect(()=>{
        axios.get(`${api_root}category/?user_id=${user_id()}`).then(r => {
            setCategories(r.data.map(i=> {
                return {'value': i.id, 'label': i.name}
            }))
        })
        axios.get(`${api_root}company/?user_id=${user_id()}`).then(r => {
            setCompanies(r.data.map(i=> {
                return {'value': i.id, 'label': i.name}
            }))
        })
        axios.get(`${api_root}skill/?user_id=${user_id()}`).then(r => {
            setSkills(r.data.map(i=> {
                return {'value': i.id, 'label': i.name}
            }))
        })
    }, [api_root])

    const onSubmit = async (data) => {
        data['description'] = description
        create(
            data, `${process.env.REACT_APP_API_ROOT_V1}job/`
        ).then(() => {
            history.push('/employer/jobs')
        })
    };

    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-10">
                        <h2 className="page-header">Create Job</h2>
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
                                                name={'title'}
                                                register={register}
                                                errors={errors}
                                            />
                                        </div>

                                        <div className="col-6">
                                            <FormInput
                                                name={'number_of_position'}
                                                type={'number'}
                                                register={register}
                                                errors={errors}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6">
                                            <FormInput
                                                name={'job_location'}
                                                register={register}
                                                errors={errors}
                                            />
                                        </div>

                                        <div className="col-6">
                                            <FormInput
                                                name={'salary_range'}
                                                register={register}
                                                errors={errors}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6">
                                            <FormInput
                                                name={'application_deadline'}
                                                type={'date'}
                                                register={register}
                                                errors={errors}
                                            />
                                        </div>

                                        <div className="col-6">
                                            <FormInput
                                                name={'published_on'}
                                                register={register}
                                                errors={errors}
                                                type={'date'}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-4">
                                            <FormInput
                                                name={'experience'}
                                                register={register}
                                                errors={errors}
                                            />
                                        </div>
                                        <div className="col-4">
                                            <SelectInput
                                                name={'category'}
                                                register={register}
                                                errors={errors}
                                                options={categories}
                                            />
                                        </div>
                                        <div className="col-4">
                                            <FormInput
                                                name={'employment_type'}
                                                register={register}
                                                errors={errors}
                                                options={categories}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6">
                                            <SelectInput
                                                name={'company'}
                                                register={register}
                                                errors={errors}
                                                options={companies}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <SelectInput
                                                name={'key_skills'}
                                                register={register}
                                                errors={errors}
                                                options={skills}
                                                multiple={'multiple'}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <Editor
                                                apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
                                                init={{
                                                    height: 200,
                                                    menubar: false
                                                }}
                                                onEditorChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <Button type={'submit'} color={'primary float-right mt-3'}
                                            content={'Save User Info'}/>
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
