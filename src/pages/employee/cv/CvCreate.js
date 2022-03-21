import React from 'react';
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {create} from "../../../utils/crud";
import FormInput from "../../../components/form/form_input/FormInput";
import Button from "../../../components/button/Button";
import {employee_id} from "../../../utils/storage";

const CvCreate = () => {
    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm();

    const history = useHistory()
    let formData = new FormData()


    const onSubmit = async (data) => {
        formData.append('resume_name', data.resume_name)
        // formData.append('social_links', data.social_links)
        if (data.cv) formData.append('resume', data.resume[0])
        create(
            formData, `${process.env.REACT_APP_API_ROOT_V1}cv/?employee_id=${employee_id()}`, history, '/employee/cv/'
        )
    };

    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-10">
                        <h2 className="page-header">Create CV</h2>
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
                                                name={'resume_name'}
                                                register={register}
                                                errors={errors}
                                                required={true}
                                            />
                                        </div>

                                        <div className="col-6">
                                            <FormInput
                                                name={'resume'}
                                                register={register}
                                                errors={errors}
                                                type={'file'}
                                                required={true}
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

export default CvCreate;