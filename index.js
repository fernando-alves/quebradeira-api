'use strict'
const express = require('express')
const app = express()
const port = 3000
const glob = require('glob')
const YAML = require('yaml')
const fs = require('fs')

const files = glob.sync('./resources/*.yaml')
const chars = files.reduce((chars, file) => {
  const charInfo = YAML.parse(fs.readFileSync(file, 'utf8'))
  chars[charInfo.name] = charInfo
  return chars
}, {})

app.get('/', (req, res) => {
  res.send(JSON.stringify(Object.keys(chars)))
})

app.get('/char/:name', (req, res) => {
  const name = req.params.name
  res.send(JSON.stringify(chars[name]))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))