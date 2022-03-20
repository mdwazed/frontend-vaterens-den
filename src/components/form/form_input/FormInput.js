import React from 'react';

function FormInput(props) {
    const {
        label,
        type = 'text',
        name,
        register,
        required=false,
        className='form-control',
        errors,
        onChange,
        onClick
    } = props;


    return (
        <div className="FormInput">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                className={className}
                id={name}
                {...register( name, {required: "This field is required" ? required : required,})}
                onClick={onClick}
                onChange={onChange}
            />
            <p className={'text-danger'}> {errors[name] && errors[name].message ? errors[name].message : null}</p>
        </div>
    )
}

export default FormInput;