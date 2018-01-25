const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const config = require('./config.json')
const { PORT, socketMessages, clientMessages } = require('../common/config.js')

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

let trainees = []

;(() => {
  app.use(bodyParser.text())
  app.use(cookieParser())
  app.use('/public', express.static('public'))

  app.set('view engine', 'pug')

  app.post('/update/:id', (req, res) => {
    const { body } = req
    const { id } = req.params
    const parsed = JSON.parse(body)
    const testResult = {
      numPassedTestSuites: parsed.numPassedTestSuites,
      numFailedTestSuites: parsed.numFailedTestSuites,
      timeRan: parsed.startTime,
      failureDetails: parseFailure(parsed.testResults.slice()),
      id,
      name: parsed.author,
      subname: `[ ${parsed.hostname}  |  ${parsed.homedir} ]`
    }
    let omitted = trainees.filter(trainee => trainee.id !== id)
    trainees = [...omitted, testResult]
    io.emit(socketMessages.USER_UPDATED, {
      id,
      testResult,
      name: parsed.author
    })
    res.send('OK')
  })

  app.get('*', (req, res) => {
    const { cookies } = req
    if (cookies.viewPage === config['authorization-cookie']) {
      res.render('index')
    } else {
      res.sendStatus(401)
    }
  })

  io.on('connection', socket => {
    socket.emit(socketMessages.CONNECTION_STARTED, { trainees })

    socket.on(clientMessages.DELETE_USER, (msg) => {
      const { deleteCookie, id } = msg
      if (deleteCookie === config['authorization-delete-cookie']) {
        trainees = trainees.filter(trainee => trainee.id !== id)
        io.emit(socketMessages.USER_REMOVE_SUCCESS, { id })
      } else {
        io.emit(socketMessages.USER_REMOVE_FAILURE)
      }
    })
  })

  http.listen(PORT, () => {
    console.log(`Application started on port ${PORT}`)
  })
})()

const parseFailure = (results) => {
  return results
    .filter(result => result.status === 'failed')
    .map(result => {
      const details = result.assertionResults
        .filter(test => test.status === 'failed')
        .map(test => ({
          title: test.title,
          messages: test.failureMessages.map(formatDetails).join('\n\n')
        }))

      return {
        fileName: shortenSlash(result.name),
        longFileName: result.name,
        message: result.message,
        details
      }
    })
}

const shortenSlash = (str) => {
  let exp = str.split('/')
  return exp.length < 3 ? str : [exp[exp.length - 2], exp[exp.length - 1]].join('/')
}

const formatDetails = str => str.replace(/\[\d+m/g, '')
