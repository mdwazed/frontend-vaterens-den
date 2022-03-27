import React from 'react';
import CRUD from "../../../components/crud/CRUD";
import FormInput from "../../../components/form/form_input/FormInput";
import {useForm} from "react-hook-form";
import {user_id} from "../../../utils/storage";
import SelectInput from "../../../components/form/form_input/SelectInput";

function Education() {
    const {
        handleSubmit,
        register,
        formState: {errors},
        reset,
    } = useForm();
    /* no-unused-vars */
    const list_url = `${process.env.REACT_APP_API_ROOT_V1}education/`

    const detail_url = (id) => {
        return `${list_url}${id}/?user_id=${user_id()}`
    }
    const formField = <>
        <div className="row">
            <div className="col-6">
                <SelectInput
                    label={'education level'}
                    name={'education_level'}
                    register={register}
                    errors={errors}
                    required={true}
                    options={[
                        {'value':'', 'label':'Select Option'},
                        {'value':'SSC', 'label':'Secondary School Certificate'},
                        {'value':'HSC', 'label':'Higher School Certificate'},
                        {'value':'Diploma', 'label':'Diploma In Engineering'},
                        {'value':'BSC', 'label':'Bachelor Of Science'},
                    ]}
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
                    label={'Result'}
                    name={'result'}
                    register={register}
                    errors={errors}
                />
            </div>
            <div className="col-6">
                <FormInput
                    name={'still_reading'}
                    register={register}
                    errors={errors}
                    type={'checkbox'}
                />
            </div>
        </div>
        <div className="row">
            <div className="col-6">
                <FormInput
                    name={'year_of_completion'}
                    register={register}
                    errors={errors}
                    type={'number'}
                />
            </div>
        </div>
    </>

    return (
        <div>
            <CRUD
                headData={['education_level', 'institute_name', 'result', 'still_reading', 'year_of_completion']}
                handleSubmit={handleSubmit}
                formField={formField}
                page_title={'Education'}
                list_url={`${list_url}?user_id=${user_id()}`}
                create_url={`${list_url}?user_id=${user_id()}`}
                update_url={detail_url}
                delete_url={detail_url}
                reset={reset}
                booleanFields={['still_reading']}

            />
        </div>
    );
}

export default Education;