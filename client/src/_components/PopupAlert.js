import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";


export default function PopupAlert({state}) {
    /**
     * This component returns the popup alerts
     *
     * @component
     * @param {Object} state State of this Alert
     * @return PopupAlert component
     */
    if (state.thrownError) {
        return <Modal isOpen>
            <ModalHeader>{state.thrownError.name}</ModalHeader>
            <ModalBody>
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