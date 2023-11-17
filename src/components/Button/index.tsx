import { ButtonContainer, ButtonVariant } from './Button.styles'

interface ButtonProps {
  variant: ButtonVariant
  children: string
}

export function Button({ variant, children }: ButtonProps) {
  return <ButtonContainer variant={variant}>{children}</ButtonContainer>
}
