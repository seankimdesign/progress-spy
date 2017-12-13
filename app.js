const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const config = require('./config.json')

const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);

const USE_PORT = 3000

const txtRecent = 'About a minute ago'

let trainees = []

;(() => {

  app.use(bodyParser.text())
  app.use(cookieParser())
  app.use('/public', express.static('public'))

  app.set('view engine', 'pug')

  app.get('/', (req, res) => {
    recalculateRanTime(trainees)
    res.render('index')
  })

  app.get('/api/trainees', (req, res) => {
    res.json({trainees})
  })

  app.get('/invalidate/:id', (req, res) => {
    let { cookies } = req
    let { id } = req.params
    if (cookies.react === config['authorization-cookie']) {
      trainees = trainees.filter(trainee => trainee.id !== id)
      return res.redirect('/')
    }
    res.send('<pre>Cannot GET /invalidate/' + id + '</pre>')
  })

  app.post('/update/:id', (req, res) => {
    const { body } = req
    const { id } = req.params
    const parsed = JSON.parse(body)
    const testResult = {
      numPassedTestSuites : parsed.numPassedTestSuites,
      numFailedTestSuites : parsed.numFailedTestSuites,
      timeRan: parsed.startTime,
      lastRan: txtRecent,
      failureDetails: parseFailure(parsed.testResults.slice()),
      id: id,
      name: parsed.author,
      subname: `[ ${parsed.hostname}  |  ${parsed.homedir} ]`
    }
    let omitted = trainees.filter(trainee => trainee.id !== id)
    trainees = [...omitted, testResult]
    recalculateRanTime(trainees)
    io.emit('update', {
      trainees
    })
    res.send('OK')
  })

  http.listen(USE_PORT, ()=>{
    console.log(`Application started on port ${USE_PORT}`)
  })

})()

const getMinutesDifference = (testRan) =>{
  const now = new Date()
  let difference = Math.floor(Math.abs(now - testRan) / 60000)
  let unit = 'minutes'
  if (difference > 180){
    if (difference > 2880){
      difference = Math.floor(difference / 1440)
      unit = 'days'
    } else{
      difference = Math.floor(difference / 60)
      unit = 'hours'
    }
  }

  return difference > 2 ? `${difference} ${unit} ago` : txtRecent
}

const recalculateRanTime = records => {
  records.map(record => {
    record.lastRan = getMinutesDifference(record.timeRan)
  })
}

const parseFailure = (results) => {
  let output = []
  results.filter(result => result.status === "failed").forEach(result => {
    const details = result.assertionResults.filter(test => test.status === "failed").map(test => {
      return {
        title: test.title,
        messages: test.failureMessages.map(formatDetails).join('\n\n')
      }
    })
    output.push({
      fileName: shortenSlash(result.name),
      longFileName: result.name,
      message: result.message,
      details: details
    })
  })
  return output
}

const shortenSlash = (str) => {
  let exp = str.split('/')
  return exp.length < 3 ? str : [exp[exp.length-2],exp[exp.length-1]].join('/')
}

const formatDetails = str => str.replace(/\[\d+m/g, '')
