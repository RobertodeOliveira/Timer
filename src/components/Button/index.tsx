import { ButtonContainer, ButtonVariant } from "./Button.Styles" 

interface ButtonProps {
  variant: ButtonVariant
  children: string
}

export function Button({variant, children}:ButtonProps) {
  return (
    <ButtonContainer variant={variant}>
      {children}
    </ButtonContainer>
  )
}