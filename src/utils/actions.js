import {set, remove, get_key_from_url, local_update, get_all} from "./storage";
import {axios_create, axios_delete, axios_get, axios_put} from "./axios_actions";
import Swal from "sweetalert2";

export const use_local_storage = process.env.REACT_APP_USE_LOCAL

export const loadData = (url, setState) => {
    if (use_local_storage) {
        return setState(get_all(get_key_from_url(url)))
    }
    return axios_get(url, setState)
}
export const create = (data, url, listUrl, setState, setShow) => {
    if (use_local_storage) {
        setShow(false)
        return setState(set(get_key_from_url(url), data))
    }
    return axios_create(data, url, listUrl, setState, setShow)
}

export const update = (data, url, listUrl, setState, setShow) => {
    if (use_local_storage) {
        setShow(false)
        return setState(local_update(get_key_from_url(listUrl), data))
    }
    return axios_put(data, url, listUrl, setState, setShow)
}

export const Delete = (url, id, listUrl, setState) => {
    Swal.fire({
        title: 'Are you sure you want to delete this?',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        icon: 'question',
        confirmButtonColor: 'red'
    }).then((result) => {
        if (result.isConfirmed) {
            if (use_local_storage) {
                return setState(remove(get_key_from_url(listUrl), id))
            }
            return axios_delete(url, id, listUrl, setState)
        }
    })
}