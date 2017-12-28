import React from 'react'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import _ from 'globalStyles'

import Home from '../pages/Home'

injectGlobal`
  body {
    padding: 0;
    margin: 0;
    font-family: 'Open Sans', 'Roboto', sans-serif;
    font-size: 13px;
    background-color: #393d45;
    color: #f5f5f5;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0.3em 0;
  }

  .hero {
    text-align: center;
    background-color: #282c34;
    padding: 20px 0;
    margin: 0 0 12px 0;

    img {
      width: 310px;
    }
  }

  .page{
    padding: 0 20px 60px;
  }
`

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
