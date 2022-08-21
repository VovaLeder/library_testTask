import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import CreateForm from './CreateForm';

class RegistrationModal extends Component {
    state = {
        modal: false
    }
    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    }
    render() {
        const isNew = this.props.isNew;
        let title = 'Edit Book';
        let button = '';
        if (isNew) {
            title = 'Add Book';
            button = <Button
                color="success"
                onClick={this.toggle}
                style={{ minWidth: "200px" }}>Add</Button>;
        } else {
            button = <Button
                color="warning"
                onClick={this.toggle}>Edit</Button>;
        }
        return <Fragment>
            {button}
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
                <ModalBody>
                    <CreateForm
                        addBookToState={this.props.addBookToState}
                        updateBookIntoState={this.props.updateBookIntoState}
                        toggle={this.toggle}
                        book={this.props.book} />
                </ModalBody>
            </Modal>
        </Fragment>;
    }
}
export default RegistrationModal;