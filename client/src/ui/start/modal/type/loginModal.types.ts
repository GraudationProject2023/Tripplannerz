export interface LoginModalProps {
    show: boolean
    onHide: () => void
    onSubmit: () => void
    onChange: {
      handleEmailChange: () => void
      handlePasswordChange: () => void
    }
    onClick: {
      closeLoginModal: () => void
      accessToService: () => void
    }
  }