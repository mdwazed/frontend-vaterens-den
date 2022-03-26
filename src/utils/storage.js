export const user_id = () => {
    let u_id = localStorage.getItem('user_id')
    if (!u_id) {
        localStorage.setItem('user_id', 2)
        u_id = localStorage.getItem('user_id')
    }
    return u_id
}