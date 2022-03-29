import axios from "axios";
import Swal from "sweetalert2";

export const create = (data, url, listUrl, setState, setShow) => {
    return axios.post(url, data).then((res) => {
        Swal.fire(
            'Success!',
            'Created successfully',
            'success'
        ).then(() => {
            if (listUrl && setState) {
                axios.get(listUrl).then(res => {
                    setState(res.data)
                })
            }
            if (setShow) setShow(false)
        })
    })
        .catch(function (error) {
            let message = ''
            let keys = Object.keys(error.response.data)
            for (let i = 0; i < keys.length; i++) message += `${error.response.data[keys[i]][0]}<br>`
            Swal.fire('Error', message, 'error')
        })


}

export const update = (data, url, listUrl, setState, setShow) => {
    return axios.put(url, data).then((res) => {
        Swal.fire(
            'Success!',
            'Updated successfully',
            'success'
        ).then(() => {
            if (listUrl && setState) {
                axios.get(listUrl).then(res => {
                    setState(res.data)
                })
            }
            if (setShow) setShow(false)
        })
    })
        .catch(function (error) {
            let message = ''
            let keys = Object.keys(error.response?.data)
            for (let i = 0; i < keys.length; i++) message += `${error.response?.data[keys[i]][0]}<br>`
            Swal.fire('Error', message, 'error')
        })
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
            axios.delete(url).then(() => {
                Swal.fire(
                    'Delete!',
                    'Deleted successfully',
                    'success'
                ).then(() => {
                    if (listUrl && setState) {
                        axios.get(listUrl).then(res => {
                            setState(res.data)
                        })
                    }
                })
            }).catch(function (error) {
                let message = ''
                let keys = Object.keys(error.response.data)
                for (let i = 0; i < keys.length; i++) message += `${error.response.data[keys[i]][0]}<br>`
                Swal.fire('Error', message, 'error')
            });
        }
    })


}