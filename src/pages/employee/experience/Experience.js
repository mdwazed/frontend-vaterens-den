import React from 'react';
import CRUD from "../../../components/crud/CRUD";
import FormInput from "../../../components/form/form_input/FormInput";
import {useForm} from "react-hook-form";
import {user_id} from "../../../utils/storage";
import TextArea from "../../../components/form/form_input/TextArea";

function Skill() {
    const {
        handleSubmit,
        register,
        formState: {errors},
        reset,
    } = useForm();
    /* no-unused-vars */
    const list_url = `${process.env.REACT_APP_API_ROOT_V1}experience/`

    const detail_url = (id) => {
        return `${list_url}${id}/?user_id=${user_id()}`
    }

    const formField = <>
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
                    required={true}
                />
            </div>
            <div className="col-6">
                <FormInput
                    name={'resign_date'}
                    register={register}
                    errors={errors}
                    type={'date'}
                />
            </div>
        </div>
    </>
    return (
        <div>
            <CRUD
                headData={['designation', 'company',
                    'description',
                    'joined_date',
                    'resign_date',
                    'still_working',]}
                handleSubmit={handleSubmit}
                formField={formField}
                page_title={'Experience'}
                list_url={`${list_url}?user_id=${user_id()}`}
                create_url={`${list_url}?user_id=${user_id()}`}
                update_url={detail_url}
                delete_url={detail_url}
                reset={reset}
                booleanFields={['still_working']}

            />
        </div>
    );
}

export default Skill;