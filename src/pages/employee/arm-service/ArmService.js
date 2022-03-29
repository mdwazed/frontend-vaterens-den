import React from 'react';
import CRUD from "../../../components/crud/CRUD";
import FormInput from "../../../components/form/form_input/FormInput";
import {useForm} from "react-hook-form";
import {user_id} from "../../../utils/storage";

function ArmServices() {
    const {
        handleSubmit,
        register,
        formState: {errors},
        reset,
    } = useForm();
    /* no-unused-vars */
    const list_url = `${process.env.REACT_APP_API_ROOT_V1}arm-service/`

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
                />
            </div>
            <div className="col-6">
                <FormInput
                    name={'description'}
                    register={register}
                    errors={errors}
                />
            </div>
        </div>
    </>
    return (
        <div>
            <CRUD
                headData={['name', 'description']}
                handleSubmit={handleSubmit}
                formField={formField}
                page_title={'Arm Services'}
                list_url={`${list_url}?user_id=${user_id()}`}
                create_url={`${list_url}?user_id=${user_id()}`}
                update_url={detail_url}
                delete_url={detail_url}
                reset={reset}

            />
        </div>
    );
}

export default ArmServices;