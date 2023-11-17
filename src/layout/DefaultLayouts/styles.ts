import styled, { css } from 'styled-components'

const LayoutContianer = styled.div`
  ${({ theme }) => css`
    max-width: 74rem;
    height: calc(100vh - 10rem);
    margin: 5rem auto;
    padding: 2rem;

    background: ${theme['gray-800']};
    border-radius: 8px;
    flex-direction: column;
  `}
`

export { LayoutContianer }
