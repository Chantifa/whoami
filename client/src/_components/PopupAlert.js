import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";


export default function PopupAlert({state}) {
    if (state.thrownError) {
        return <Modal isOpen>
            <ModalHeader>Something bad happened: {state.thrownError.name}</ModalHeader>
            <ModalBody>Please contact the admin and provide the information onw what you just did.<br/>
                Please also provide the following:<br/>
                <code>{state.thrownError.message}</code></ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={state.setThrownError.bind(null, null)}
                >
                    Okay..
                </Button>
            </ModalFooter>
        </Modal>
    }
    return null;
}