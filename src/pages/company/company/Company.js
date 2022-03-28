import React from 'react';
import CRUD from "../../../components/crud/CRUD";
import FormInput from "../../../components/form/form_input/FormInput";
import {useForm} from "react-hook-form";
import {user_id} from "../../../utils/storage";

function Company() {
    const {
        handleSubmit,
        register,
        formState: {errors},
        reset,
    } = useForm();
    /* no-unused-vars */
    const list_url = `${process.env.REACT_APP_API_ROOT_V1}company/`

    const detail_url = (id) => {
        return `${list_url}${id}/?user_id=${user_id()}`
    }
    const formField = <div className="row">
        <div className="col-4">
            <FormInput
                name={'name'}
                register={register}
                errors={errors}
                required={true}
            />
        </div>
        <div className="col-4">
            <FormInput
                name={'type_of_business'}
                register={register}
                errors={errors}
                required={true}
            />
        </div>
        <div className="col-4">
            <FormInput
                name={'number_of_employee'}
                register={register}
                errors={errors}
                type={'number'}
            />
        </div>
    </div>
    return (
        <div>
            <CRUD
                headData={['name', 'type_of_business', 'number_of_employee']}
                handleSubmit={handleSubmit}
                formField={formField}
                page_title={'Company'}
                list_url={`${list_url}?user_id=${user_id()}`}
                create_url={`${list_url}?user_id=${user_id()}`}
                update_url={detail_url}
                delete_url={detail_url}
                reset={reset}
            />
        </div>
    );
}

export default Company;