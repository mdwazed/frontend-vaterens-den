import React, {useEffect, useState} from "react";
import axios from "axios";
import {create, Delete, update} from "../../utils/actions";
import ModalForm from "../modal/ModalForm";
import {Link} from "react-router-dom";
import IconButton from "../button/IconButton";
import {Button} from "react-bootstrap";
import Table from "../table/Table";

const renderHead = (item, index) => <th key={index}>{item}</th>
const CRUD = (props) => {

    const {
        headData,
        page_title,
        list_url,
        update_url =()=> {},
        delete_url =()=> {},
        handleSubmit =()=> {},
        detailUrl =()=> {},
        create_url,
        hasDetail=false,
        formField,
    } = props

    const tableHead = ['SL', headData, 'action']

    const [dataList, setState] = useState([])
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState(page_title);

    const onHide = () => setShow(false);
    const handleCreate = () => {
        setTitle(`Add New ${page_title}`)
        setShow(true)
    }
    const handleUpdate = () => {
        setTitle(`Update ${page_title}`)
        setShow(true)
    }
    useEffect(() => {
        axios.get(list_url).then((response) => {
            setState(response.data)
        })
    }, [list_url])
    console.log(dataList)

    const onSubmit = async (data) => {
        if (title === `Add New ${page_title}`) create(data, create_url)
        else update(data, update_url)
    };

    const delete_cv = (id) => {
        return Delete(delete_url(id), id, dataList, setState)
    }
    console.log(headData)
    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{index}</td>
            {headData?.map(ele => `<td>${item[ele]}</td>`)}
            <td className={'d-flex'}>
                <IconButton type={'warning'} onClick={handleUpdate} icon_class={'bx-edit'}/>
                <IconButton type={'danger'} icon_class={'bx-trash'} onClick={() => delete_cv(item.id)}/>
                {hasDetail ? <Link to={detailUrl(item.id)}>
                    <IconButton type={'success'} icon_class={'bx-detail'}/>
                </Link> : null}
            </td>
        </tr>
    )
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
                    <Button variant={'primary'} onClick={handleCreate} value={`Add New ${page_title}`}/>
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
