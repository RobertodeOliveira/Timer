import { ThemeProvider } from "styled-components"
import { Button } from "./components/Button"

import { defaultTheme } from "./styles/themes/default"
import { GlobalStyles } from "./styles/global"

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <div>Hello world</div>
      <Button variant="primary">Enviar</Button>

      <GlobalStyles />
    </ThemeProvider>
  )
}

