import React, {useEffect, useState} from "react";
import {create, Delete, loadData, update, use_local_storage} from "../../utils/actions";
import ModalForm from "../modal/ModalForm";
import {Link} from "react-router-dom";
import IconButton from "../button/IconButton";
import {Button} from "react-bootstrap";
import Table from "../table/Table";
import Badge from "../badge/Badge";
import {get_one} from "../../utils/storage";
import {axios_get_one} from "../../utils/axios_actions";

const renderHead = (item, index) => <th key={index}>{item.replaceAll('_', ' ')}</th>
const CRUD = (props) => {

    const {
        headData,
        page_title,
        list_url,
        update_url = (id) => {
        },
        delete_url = (id) => {
        },
        handleSubmit = (onSubmit) => {
        },
        detailUrl = () => {
        },
        create_url,
        hasDetail = false,
        formField,
        fileFields, setFileFields,
        reset,
        booleanFields,
    } = props

    const tableHead = ['SL', ...headData, 'action']

    const [dataList, setState] = useState([])
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState(page_title);
    const [createForm, setCreate] = useState(true);
    const [updateUrl, setUpdateUrl] = useState('');

    const onHide = () => setShow(false);
    const handleCreate = () => {
        setTitle(`Add New ${page_title}`)
        setShow(true)
        reset({})
        setCreate(true)
    }
    const handleUpdate = id => {
        setTitle(`Update ${page_title}`)
        setShow(true)
        setCreate(false)
        setUpdateUrl(update_url(id))
        if (use_local_storage) {
            let data = get_one(list_url, id)
            reset(data)
            if (fileFields?.length > 0) {
                let values = []
                fileFields?.map(file => {
                    return values.push(data[file])
                })
                setFileFields(values)
            }
        } else axios_get_one(update_url(id), reset, fileFields, setFileFields)
    }
    useEffect(() => {
        loadData(list_url, setState)
    }, [list_url])

    const delete_cv = (id) => {
        return Delete(delete_url(id), id, list_url, setState)
    }
    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            {headData?.map((ele, i) => {
                if (fileFields?.includes(ele)) {
                    return (
                        <td key={i}>
                            <a className={'badge badge-secondary'} target={'_blank'} rel={'noreferrer'}
                               href={item[ele]}>
                                {item[ele]?.split('/').pop()}
                            </a>
                        </td>
                    )
                } else if (booleanFields?.includes(ele)) {
                    return <td key={i}>
                        <Badge type={'primary'} content={item[ele] ? 'YES' : 'NO'}/>
                    </td>
                } else return <td key={i}>{item[ele]}</td>
            })}
            <td className={'d-flex'}>
                <IconButton type={'warning'} onClick={() => {
                    handleUpdate(item.id)
                }} icon_class={'bx-edit'}/>
                <IconButton type={'danger'} icon_class={'bx-trash'} onClick={() => delete_cv(item.id)}/>
                {hasDetail ? <Link to={detailUrl(item.id)}>
                    <IconButton type={'success'} icon_class={'bx-detail'}/>
                </Link> : null}
            </td>
        </tr>
    )
    const getFormData = (data) => {
        if (fileFields?.length > 0) {
            const formData = new FormData()
            headData.forEach(field => {

                if (!fileFields?.includes(field)) formData.append(field, data[field])
                else if (typeof data[field] !== "string") {
                    formData.append(field, data[field][0])
                }
            })
            return formData
        } else return data
    }
    const onSubmit = async (data) => {
        let formData = getFormData(data)
        if (createForm) await create(formData, create_url, list_url, setState, setShow)
        else await update(formData, updateUrl, list_url, setState, setShow)
    };
    if (!dataList) return <p>Loading ...</p>
    else return (
        <div>
            <div className="row">
                <div className="col-10">
                    <h2 className="page-header">
                        {page_title} List
                    </h2>
                </div>
                <div className="col-2">
                    <Button variant={'primary'} onClick={handleCreate}>
                        {`Add New ${page_title}`}
                    </Button>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                limit='10'
                                headData={tableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={dataList}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ModalForm
                show={show}
                onHide={onHide}
                onSubmit={handleSubmit(onSubmit)}
                title={title}
                formField={formField}
            />
        </div>
    )
}

export default CRUD
