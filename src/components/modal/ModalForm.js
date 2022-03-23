import React from 'react';
import {Button, Modal} from "react-bootstrap";

const ModalForm = (props) => {
    return (
        <div>
            <Modal show={props.show} onHide={props.onHide}>
                <form onSubmit={props.onSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {props.formField}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.onHide}>
                            Close
                        </Button>
                        <Button type={'submit'} variant="primary">
                            Save
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
};

export default ModalForm;