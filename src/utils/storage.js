export const user_id = () => {
    let u_id = localStorage.getItem('user_id')
    if (!u_id) {
        localStorage.setItem('user_id', 2)
        u_id = localStorage.getItem('user_id')
    }
    return u_id
}
export const get_all = (key) => {
    let values = localStorage.getItem(key)
    return values ? JSON.parse(values) : []
}

export const set = (key, value) => {
    let values = get_all(key)
    value['id'] = values.length + 1
    values.push(value)
    localStorage.setItem(key, JSON.stringify(values))
    return values
}

export const local_update = (key, value) => {
    let listData = JSON.parse(JSON.stringify(get_all(key)))
    let index = listData.findIndex(i => i.id === value.id)
    listData[index] = value
    localStorage.setItem(key, JSON.stringify(listData))
    return listData
}
export const remove = (key, id) => {
    let values = get_all(key)
    values = values.filter(item => item['id'] !== id)
    localStorage.setItem(key, JSON.stringify(values))
    return values
}
export const get_key_from_url = (url) => {
    let key_list = url.split('/')
    let len = key_list.length
    return key_list[len - 1].includes('?') ? key_list[len - 2] : key_list[len - 1]
}

export const get_one = (list_url, id) => {
    let list = get_all(get_key_from_url(list_url))
    return list.find(el => el.id === id)
}