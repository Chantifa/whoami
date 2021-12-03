import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";


/**
 * This component returns the popup alerts
 *
 * @component
 * @param {Object} state State of this Alert
 * @returns {JSX.Element}
 */
export default function PopupAlert({state}) {
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