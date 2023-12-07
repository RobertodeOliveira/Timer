import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { Routers } from './router/Router'

import { defaultTheme } from './styles/themes/default'
import { GlobalStyles } from './styles/global'
import { CyclesContextProvider } from './context/CyclesContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Routers />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyles />
    </ThemeProvider>
  )
}
