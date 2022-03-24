import React from 'react';
import CRUD from "../../../components/crud/CRUD";
import FormInput from "../../../components/form/form_input/FormInput";
import {useForm} from "react-hook-form";
import {employee_id} from "../../../utils/storage";

function CV() {
    const {
        handleSubmit,
        register,
        formState: {errors},
        reset,
    } = useForm();
    const list_url = `${process.env.REACT_APP_API_ROOT_V1}cv/`
    const detail_url = (id) => {
        return `${list_url}${id}/?employee_id=${employee_id()}`
    }
    const formField = <div className="row">
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
            {/*<p>*/}
            {/*    Current Resume:*/}
            {/*    <a href={resume} className="text-primary" target={'_blank'} rel={'noopener noreferrer'}>*/}
            {/*        {resume ? resume.split('/').pop() : 'No Resume Uploaded'}*/}
            {/*    </a>*/}
            {/*</p>*/}
        </div>
    </div>
    return (
        <div>
            <CRUD
                headData={['resume_name', 'resume']}
                handleSubmit={handleSubmit}
                formField={formField}
                page_title={'Resume'}
                list_url={`${list_url}?employee_id=${employee_id()}`}
                create_url={`${list_url}?employee_id=${employee_id()}`}
                update_url={detail_url}
                delete_url={detail_url}
                reset={reset}
                fileFields={['resume']}
            />
        </div>
    );
}

export default CV;