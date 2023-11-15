import styled, {css} from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "success" | "danger"

interface ButtonContainerProps {
  variant: ButtonVariant
}

const buttonVariants = {
  primary: 'purple',
  secondary: 'orange',
  success: 'green',
  danger: 'red',
}

const ButtonContainer = styled.button<ButtonContainerProps>`
  ${({ theme }) => css`
    width: 100px;
    height: 40px;
    background-color: ${theme["green-500"]};

    border: none;
    border-radius: 4px;
  `}
  

  /* ${props => {
    return css`background-color: ${buttonVariants[props.variant]}`
  }} */
`

export { ButtonContainer }