import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import _ from 'globalStyles'

import Home from '../pages/Home'

const _ApplicationWindow = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: ${props => props.theme.defaultFontFamily};
`

const App = () => {
  return (
    <ThemeProvider theme={_}>
      <Router>
        <_ApplicationWindow>
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </_ApplicationWindow>
      </Router>
    </ThemeProvider>
  )
}

export default App
