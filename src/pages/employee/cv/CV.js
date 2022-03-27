import React, {useEffect, useState} from 'react';
import CRUD from "../../../components/crud/CRUD";
import FormInput from "../../../components/form/form_input/FormInput";
import {useForm} from "react-hook-form";
import {user_id} from "../../../utils/storage";
import {FormFieldLoader} from "../../../components/crud/formFieldLoader";

function CV() {
    const {
        handleSubmit,
        register,
        formState: {errors},
        reset,
    } = useForm();
    /* no-unused-vars */
    const list_url = `${process.env.REACT_APP_API_ROOT_V1}cv/`
    const [fileFields, setFileFields] = useState('')

    const detail_url = (id) => {
        return `${list_url}${id}/?user_id=${user_id()}`
    }
    const formField = <div className="row">
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
                name={'resume'}
                register={register}
                errors={errors}
                type={'file'}
                required={true}
            />
            <p>
                Resume:{fileFields[0] ? <a href={fileFields[0]} className="text-primary" target={'_blank'}
                                           rel={'noopener noreferrer'}> {fileFields[0].split('/').pop()} </a> :
                <b> No File Found</b>}
            </p>
        </div>
    </div>
    useEffect(()=> {
        FormFieldLoader(list_url)
    })
    return (
        <div>
            <CRUD
                headData={['name', 'resume']}
                handleSubmit={handleSubmit}
                formField={formField}
                page_title={'Resume'}
                list_url={`${list_url}?user_id=${user_id()}`}
                create_url={`${list_url}?user_id=${user_id()}`}
                update_url={detail_url}
                delete_url={detail_url}
                reset={reset}
                fileFields={['resume']}
                setFileFields={setFileFields}
            />
        </div>
    );
}

export default CV;