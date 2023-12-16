import { Modal as ModalContainer, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button} from '@chakra-ui/react'

type PropsTypes = {
    type: 'confirm' | 'description'
    variant?: 'delete' | 'edit'  
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    handleConfirm?: () => void
    modalTitle: string
    btnTitle: 'Delete' | 'Confirm'
}

const Modal = ({variant, type, isOpen, onClose, children, handleConfirm, modalTitle, btnTitle}: PropsTypes) => {
    return (
        <ModalContainer isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>{modalTitle}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {children}
                </ModalBody>
                <ModalFooter>
                    {type === 'confirm' ? (
                        <Button colorScheme={variant === 'delete' ? 'red' : 'blue'} mr={3} onClick={handleConfirm}>
                            {btnTitle}
                        </Button>
                    ) : null}
                    <Button variant='outline' colorScheme='gray' onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </ModalContainer>
    )
}

export default Modal