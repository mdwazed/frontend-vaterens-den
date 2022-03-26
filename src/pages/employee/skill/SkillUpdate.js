import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {update} from "../../../utils/actions";
import {user_id} from "../../../utils/storage";
import FormInput from "../../../components/form/form_input/FormInput";
import Button from "../../../components/button/Button";
import axios from "axios";

const SkillUpdate = (props) => {
    const {
        handleSubmit,
        register,
        formState: {errors},
        reset
    } = useForm();

    const history = useHistory()
    const update_url = `${process.env.REACT_APP_API_ROOT_V1}skill/${props.match.params.id}/?user_id=${user_id()}`

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
            '/employee/skill/'
        )
    };

    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-10">
                        <h2 className="page-header">Update Skill</h2>
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

export default SkillUpdate;