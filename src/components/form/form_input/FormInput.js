import React from 'react';

function FormInput(props) {
    const {
        type = 'text',
        name,
        label = name,
        register,
        required = false,
        className = 'form-control',
        errors,
        onChange,
        onClick,
        ...other_config
    } = props;


    return (
        <div className="FormInput">
            <label htmlFor={name}>{label.toUpperCase().replace('_', ' ')}</label>
            <input
                type={type}
                className={className}
                id={name}
                {...register(name, {required: required,})}
                onClick={onClick}
                onChange={onChange}
                {...other_config}
            />
            <p className={'text-danger'}> {errors[name] && <span>This field is required</span>}</p>
        </div>
    )
}

export default FormInput;