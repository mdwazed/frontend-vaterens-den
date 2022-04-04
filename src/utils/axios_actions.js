import axios from "axios";
import Swal from "sweetalert2";

export const axios_get = (url, setState) => {
    axios.get(url).then((response) => {
        setState(response.data)
    })
}
export const axios_get_one = (url, reset, fileFields, setFileFields) => {
    axios.get(url).then((response) => {
        reset(response.data)
        if (fileFields?.length > 0) {
            let values = []
            fileFields?.map(file => {
                return values.push(response.data[file])
            })
            setFileFields(values)
        }
    })
}
export const axios_create = (data, url, listUrl, setState, setShow) => {
    return axios.post(url, data).then((res) => {
        Swal.fire(
            'Success!',
            'Created successfully',
            'success'
        ).then(() => {
            if (listUrl && setState) {
                axios.get(listUrl).then(() => {
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
            return Swal.fire('Error', message, 'error')
        })


}

export const axios_put = (data, url, listUrl, setState, setShow) => {
    return axios.put(url, data).then((res) => {
        Swal.fire(
            'Success!',
            'Updated successfully',
            'success'
        ).then(() => {
            if (listUrl && setState) {
                axios.get(listUrl).then(() => {
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
            return Swal.fire('Error', message, 'error')
        })
}

export const axios_delete = (url, id, listUrl, setState) => {
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
        return Swal.fire('Error', message, 'error')
    });


}