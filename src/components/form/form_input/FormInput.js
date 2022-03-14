import React, { useContext } from 'react';
import { FormContext } from '../Form';

function FormInput(props) {
  const {
    label,
    type = 'text',
    name,
  } = props;

  const formContext = useContext(FormContext);
  const { form, handleFormChange } = formContext;

  return (
    <div className="FormInput">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleFormChange}
      />


        {/*<p className={'text-danger'}> {errors.gender && errors.gender.message ? errors.gender.message : null}</p>*/}
        {/*<label htmlFor="gender"> Gender </label>*/}
        {/*<input type="text" id={'gender'} {...register("gender", { required: "Gender is required.",})} />*/}
    </div>
  )
}

export default FormInput;