import React from 'react';
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {create} from "../../../utils/actions";
import FormInput from "../../../components/form/form_input/FormInput";
import Button from "../../../components/button/Button";
import {employee_id} from "../../../utils/storage";

const SkillCreate = () => {
    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm();
    const history = useHistory()

    const onSubmit = (data) => {

        create(
            data,
            `${process.env.REACT_APP_API_ROOT_V1}skill/?employee_id=${employee_id()}`,
            history, '/employee/skill/'
        )
    };

    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-10">
                        <h2 className="page-header">Add Skill</h2>
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
                                                name={'description'}
                                                register={register}
                                                errors={errors}
                                                required={true}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">

                                        <div className="col-6">
                                            <FormInput
                                                name={'skill_level'}
                                                register={register}
                                                errors={errors}
                                                required={true}
                                                type={'number'}
                                                max='100'
                                            />
                                        </div>
                                        <div className="col-6">
                                            <FormInput
                                                name={'is_special'}
                                                register={register}
                                                errors={errors}
                                                type={'checkbox'}
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

export default SkillCreate;