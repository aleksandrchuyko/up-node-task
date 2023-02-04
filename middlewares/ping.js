const express = require('express')
const responseTime = require('response-time')

const app1 = express()

app1.use(responseTime())

app1.get('google.com', function (req, res) {
  res.send('hello, world!')
})