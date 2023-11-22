export interface SignUpModalProps {
    show: boolean
    tagModal: boolean
    onHide: () => void
    onSubmit: () => void
    onChange: {
        handleNameChange: () => void
        handleGenderChange: () => void
        handleEmailChange: () => void
        handleEmailCodeChange: () => void
        handlePasswordChange: () => void
        handleConfirmPasswordChange: () => void
    }
    onClick: {
        sendEmailToServer: () => void
        sendEmailCodeToServer: () => void
        openTagModal: () => void
    }
}