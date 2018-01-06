import React from 'react'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import _ from 'globalStyles'

import { Banner } from '../global/components'
import Home from '../pages/Home'

injectGlobal`
  html, body {
    font-family: ${_.defaultFontFamily};
  }

  body {
    padding: 0;
    margin: 0;
    font-size: 13px;
    background-color: #393d45;
    color: #f5f5f5;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0.3em 0;
  }
`

const Page = styled.div`
  padding: 0 20px 60px;
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
      <div>
        <Banner src='/public/react-training-banner-clear.png' />
        <Page>
          <Router>
            <_ApplicationWindow>
              <Switch>
                <Route exact path='/' component={Home} />
              </Switch>
            </_ApplicationWindow>
          </Router>
        </Page>
      </div>
    </ThemeProvider>
  )
}

export default App
