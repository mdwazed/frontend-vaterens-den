import React from 'react';

const TextArea = (props) => {
    const {label, name, className = 'form-control', required = false, errors, register = () => {}} = props
    return (
        <div className={'FormInput'}>
            <label htmlFor={name}>{label}</label>
            <textarea className={className} name={name}
                      id={name}
                      {...register(name, {required: "This field is required" ? required : required,})}
            />
            <p className={'text-danger'}> {errors[name] && errors[name].message ? errors[name].message : null}</p>
        </div>
    );
};

export default TextArea;