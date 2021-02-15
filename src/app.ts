import { takeSnapshots } from './function'
import cors from 'cors'
import bodyParser from 'body-parser'

const express = require('express')
const app = express()
const port = 5000

app.use(bodyParser.json());

app.use(cors())
app.get('/', (req, res) => {
  req 
  res.send('Hello World!')
})

app.get('/secret', (req, res) => {
  if (req.headers.origin = 'chrome-extension://kjbmkglohpkfhmdmalpiimojcklgpibp') {
    res.json({clientSecret: process.env.DIARY_CLIENT_SECRET})
  }
})

app.post('/puppeteer', (req, res) => {
  res.send('Hello puppeteer!')
  takeSnapshots(req.query.url, req.body.accessToken)
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
