import axios from "axios";
import Swal from "sweetalert2";

export const create = (data, url, history = null, redirect = '') => {
    axios.post(url, data).then(() => {
        Swal.fire(
            'Success!',
            'Created successfully',
            'success'
        )
    })
        .catch(function (error) {
            let message = ''
            let keys = Object.keys(error.response.data)
            for (let i = 0; i < keys.length; i++) message += `${error.response.data[keys[i]][0]}<br>`
            Swal.fire('Error', message, 'error')
        })
        .then(() => {
            if (history !== null && redirect !== '') history.push(redirect)
        })

}

export const update = (data, url, history = null, redirect = '') => {
    axios.put(url, data).then(() => {
        Swal.fire(
            'Success!',
            'Updated successfully',
            'success'
        )
    })

        .catch(function (error) {
            let message = ''
            let keys = Object.keys(error.response.data)
            for (let i = 0; i < keys.length; i++) message += `${error.response.data[keys[i]][0]}<br>`
            Swal.fire('Error', message, 'error')
        })
        .then(() => {
            if (history !== null && redirect !== '') history.push(redirect)
        })
}

export const Delete = (url, id, listData, setState) => {
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
                    setState(listData.filter(i => i.id !== id))
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