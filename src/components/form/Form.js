import React, { useState } from 'react';
import Button from "../button/Button";

export const FormContext = React.createContext({
  form: {}
});

function Form(props) {
  const { children, submit = () => {}, initialValues } = props;

  const [form, setForm] = useState(initialValues);

  const handleFormChange = (event) => {
    // Get the name of the field that caused this change event
    // Get the new value of this field
    const { name, value } = event.target;

    // Update state
    // Assign new value to the appropriate form field
    setForm({
      ...form,
      [name]: value
    });
  };

  return (
    <form className="Form">
      <FormContext.Provider value={{
        form,
        handleFormChange
      }}>
        {children}
      </FormContext.Provider>

      <Button color={'primary float-right'} type={'submit'} content={'Submit'} onClick={() => submit(form)} />
    </form>
  );
}

export default Form;