export interface SignUpModalProps {
    onSubmit: (event) => Promise<any>
    onChange: {
        handleNameChange: (event) => void
        handleGenderChange: (event) => void
        handleEmailChange: (event) => void
        handleEmailCodeChange: (event) => void
        handlePasswordChange: (event) => void
        handleConfirmPasswordChange: (event) => void
    }
    onClick: {
        handleSendEmailToServer: (event) => Promise<void>
        handleSendEmailCodeToServer: (event) => Promise<void>
    }
}