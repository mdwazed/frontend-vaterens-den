export const employee_id = () => {
    let e_id = localStorage.getItem('employee_id')
    if (!e_id) {
        localStorage.setItem('employee_id', 2)
        e_id = localStorage.getItem('employee_id')
    }
    return e_id
}