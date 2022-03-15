import React from 'react';

function SelectInput(props) {
    const {
        label,
        name,
        register,
        className='form-control',
        errors,
        options
    } = props;
    return (
        <div className={'FormInput'}>
            <label htmlFor={name}>{label}</label>
            <select className={className} name={name} id={name} {...register(name, {required: "This field is required",})}>
                {options.map((option, index) => {
                    return <option key={index} value={option.value}>{option.label}</option>
                })}
            </select>
            <p className={'text-danger'}> {errors.gender && errors.gender.message ? errors.gender.message : null}</p>
        </div>
    );
}

export default SelectInput;