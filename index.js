'use strict'
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const glob = require('glob')
const YAML = require('yaml')
const fs = require('fs')

const files = glob.sync('./resources/*.yaml')
const chars = files.reduce((chars, file) => {
  const charInfo = YAML.parse(fs.readFileSync(file, 'utf8'))
  chars[charInfo.name.toLowerCase()] = charInfo
  return chars
}, {})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.get('/', (req, res) => {
  res.send(JSON.stringify(Object.keys(chars)))
})

app.get('/char/:name', (req, res) => {
  const name = req.params.name.toLowerCase()
  res.send(JSON.stringify(chars[name]))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))