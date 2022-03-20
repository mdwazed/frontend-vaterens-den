import axios from "axios";
import Swal from "sweetalert2";

export const create = (data, url, history, redirect) => {
    try {
        axios.post(url, data).then(() => {
            Swal.fire(
                'Success!',
                'Created successfully',
                'success'
            )
        }).then(history.push(redirect))

    } catch (error) {
        if (error) {
            let message = ''
            let keys = Object.keys(error.response.data)
            for (let i = 0; i < keys.length; i++) message += `${error.response.data[keys[i]][0]}<br>`
            Swal.fire(
                'Error',
                message,
                'error'
            )
        }

    }
}

export const update = (data, url, history, redirect) => {
    try {
        axios.put(url, data).then(() => {
            return Swal.fire(
                'Success!',
                'Updated successfully',
                'success'
            )
        }).then(history.push(redirect))

    } catch (error) {
        if (error) {
            let message = ''
            let keys = Object.keys(error.response.data)
            for (let i = 0; i < keys.length; i++) message += `${error.response.data[keys[i]][0]}<br>`
            return Swal.fire('Error', message, 'error')
        }

    }
}

export const Delete = (url, id, listData, setState) => {
    try {
        axios.delete(url).then(() => {
            Swal.fire(
                'Delete!',
                'Deleted successfully',
                'success'
            ).then(() => {
                setState(listData.filter(i => i.id !== id))
            })
        })

    } catch (error) {
        if (error) {
            let message = ''
            let keys = Object.keys(error.response.data)
            for (let i = 0; i < keys.length; i++) message += `${error.response.data[keys[i]][0]}<br>`
            return Swal.fire('Error', message, 'error')
        }

    }
}