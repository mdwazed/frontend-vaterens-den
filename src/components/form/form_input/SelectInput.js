import React from 'react';

function SelectInput(props) {
    const {
        label,
        name,
        register,
        multiple=false,
        className='form-control',
        errors,
        options,
        required = false
    } = props;
    return (
        <div className={'FormInput'}>
            <label htmlFor={name}>{label}</label>
            <select className={className} multiple={multiple} name={name} id={name} {...register(name, {required: required,})}>
                {options.map((option, index) => {
                    return <option key={index} value={option.value}>{option.label}</option>
                })}
            </select>
            <p className={'text-danger'}> {errors[name] && <span>This field is required</span>}</p>
        </div>
    );
}

export default SelectInput;