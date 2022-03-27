import axios from "axios";

const get_type = (type) => {
  switch (type) {
      case type === 'string':
          return 'text'
      case type === 'integer':
          return 'number'
      case type === 'file upload':
          return 'file'
      default:
          return "text"
  }
}
export const FormFieldLoader = (url) => {
    let form = ``
    axios.options(url).then((res) => {
        console.log(res.data.actions)
        Object.entries(res.data.actions.POST).map(field => {
            if(field[1] !== 'ID'){
                form += `<div className={'col-6'}>
                    <label htmlFor={field[1].label}>{field[1].label}</label>
                    <input type={get_type(field[1].type)} name={field[1].name} id={field[1].name} required={field[1].required} />
                </div>`
            }
        })
    })
    console.log(form)
}