import React from 'react';
import CRUD from "../../../components/crud/CRUD";
import FormInput from "../../../components/form/form_input/FormInput";
import {useForm} from "react-hook-form";
import {user_id} from "../../../utils/storage";

function Skill() {
    const {
        handleSubmit,
        register,
        formState: {errors},
        reset,
    } = useForm();
    /* no-unused-vars */
    const list_url = `${process.env.REACT_APP_API_ROOT_V1}skill/`

    const detail_url = (id) => {
        return `${list_url}${id}/?user_id=${user_id()}`
    }

    const formField = <>
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
    </>
    return (
        <div>
            <CRUD
                headData={['name',
                    'description',
                    'skill_level',
                    'is_special']}
                handleSubmit={handleSubmit}
                formField={formField}
                page_title={'Skill'}
                list_url={`${list_url}?user_id=${user_id()}`}
                create_url={`${list_url}?user_id=${user_id()}`}
                update_url={detail_url}
                delete_url={detail_url}
                reset={reset}
                booleanFields={['is_special']}

            />
        </div>
    );
}

export default Skill;