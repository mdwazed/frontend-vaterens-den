import React from 'react';

function SelectInput(props) {
    const {
        name,
        label=name,
        register,
        multiple=false,
        className='form-control',
        errors,
        options,
        required = false
    } = props;
    return (
        <div className={'FormInput'}>
            <label htmlFor={name}>{label?.toUpperCase().replaceAll('_', ' ')}</label>
            <select className={className} multiple={multiple} name={name} id={name} {...register(name, {required: required,})}>
                {options.map((option, index) => {
                    return <option key={index} value={option.value} selected={option.selected} >{option.label}</option>
                })}
            </select>
            <p className={'text-danger'}> {errors[name] && <span>This field is required</span>}</p>
        </div>
    );
}

export default SelectInput;