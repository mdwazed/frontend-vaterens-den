import React, {useState} from 'react';
import CRUD from "../../../components/crud/CRUD";
import FormInput from "../../../components/form/form_input/FormInput";
import {useForm} from "react-hook-form";
import {user_id} from "../../../utils/storage";

function Award() {
    const {
        handleSubmit,
        register,
        formState: {errors},
        reset,
    } = useForm();
    /* no-unused-vars */
    const list_url = `${process.env.REACT_APP_API_ROOT_V1}award/`
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
        <div className="row">
            <div className="col-8">
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
            <div className="col-4">
                <FormInput
                    name={'issue_date'}
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
                headData={['name',
                    'description',
                    'certificate',
                    'issue_date']}
                handleSubmit={handleSubmit}
                formField={formField}
                page_title={'Award'}
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

export default Award;