import React, {useState} from 'react';
import CRUD from "../../../components/crud/CRUD";
import FormInput from "../../../components/form/form_input/FormInput";
import {useForm} from "react-hook-form";
import {user_id} from "../../../utils/storage";

function Training() {
    const {
        handleSubmit,
        register,
        formState: {errors},
        reset,
    } = useForm();
    /* no-unused-vars */
    const list_url = `${process.env.REACT_APP_API_ROOT_V1}training/`
    const [fileFields, setFileFields] = useState('')

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
                    name={'organization'}
                    register={register}
                    errors={errors}
                    required={true}
                />
            </div>
        </div>
        <div className="row">
            <div className="col-6">
                <FormInput
                    name={'from_date'}
                    register={register}
                    errors={errors}
                    type={'date'}
                />
            </div>
            <div className="col-6">
                <FormInput
                    name={'completion_date'}
                    register={register}
                    errors={errors}
                    type={'date'}
                />
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <FormInput
                    name={'certificate'}
                    register={register}
                    errors={errors}
                    type={'file'}
                />
                <p>
                    Certificate:{fileFields[0] ? <a href={fileFields[0]} className="text-primary" target={'_blank'}
                                               rel={'noopener noreferrer'}> {fileFields[0].split('/').pop()} </a> :
                    <b> No File Found</b>}
                </p>
            </div>
        </div>
    </>
    return (
        <div>
            <CRUD
                headData={['name',
                    'organization',
                    'certificate',
                    'from_date',
                    'completion_date']}
                handleSubmit={handleSubmit}
                formField={formField}
                page_title={'Training'}
                list_url={`${list_url}?user_id=${user_id()}`}
                create_url={`${list_url}?user_id=${user_id()}`}
                update_url={detail_url}
                delete_url={detail_url}
                reset={reset}
                fileFields={['certificate']}
                setFileFields={setFileFields}

            />
        </div>
    );
}

export default Training;