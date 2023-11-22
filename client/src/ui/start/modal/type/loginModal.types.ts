export interface LoginModalProps {
    onSubmit: (event) => Promise<void>
    onChange: {
      handleEmailChange: (event) => void
      handlePasswordChange: (event) => void
    }
    onClick: (event) => Promise<void>
  }