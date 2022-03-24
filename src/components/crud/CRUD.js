import React, {useEffect, useState} from "react";
import axios from "axios";
import {create, Delete, update} from "../../utils/actions";
import ModalForm from "../modal/ModalForm";
import {Link} from "react-router-dom";
import IconButton from "../button/IconButton";
import {Button} from "react-bootstrap";
import Table from "../table/Table";

const renderHead = (item, index) => <th key={index}>{item.replace('_', ' ')}</th>
const CRUD = (props) => {

    const {
        headData,
        page_title,
        list_url,
        update_url = () => {
        },
        delete_url = () => {
        },
        handleSubmit = () => {
        },
        detailUrl = () => {
        },
        create_url,
        hasDetail = false,
        formField,
    } = props

    const tableHead = ['SL', ...headData, 'action']

    const [dataList, setState] = useState([])
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState(page_title);

    const onHide = () => setShow(false);
    const handleCreate = () => {
        setTitle(`Add New ${page_title}`)
        setShow(true)
        props.reset({})
    }
    // const [fileFields, setFileFields] = useState(props.fileFields)
    const handleUpdate = id => {
        setTitle(`Update ${page_title}`)
        setShow(true)
        axios.get(props.update_url(id)).then((response) => {
            props.reset(response.data)
            console.log(response.data)
            // if (fileFields.length > 0){
            //     let values = []
            //     fileFields.map(file => {values.push(response.data[file])})
            //     setFileFields(values)
            // }
        })
    }
    useEffect(() => {
        axios.get(list_url).then((response) => {
            setState(response.data)
        })
    }, [list_url])

    const delete_cv = (id) => {
        return Delete(delete_url(id), id, dataList, setState)
    }
    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{index}</td>
            {headData?.map((ele, i) => <td key={i}>{item[ele]}</td>)}
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

    const onSubmit = async (data) => {
        await create(data, create_url)
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
