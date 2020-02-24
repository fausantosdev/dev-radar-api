const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

const devRouts = require('../app/routes/devs')

const app = express()

// Database connection
require('../config/mongoose')

// Configs
app.use(morgan('dev'))

let corsOptions = {
  origin: 'https://devradarweb.herokuapp.com/',
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.get('/', (req, res) => {
  res.json({
    name: "DevRadar",
    description: "Backend da Semana OmniStack 10.0",
    authors: [
      {
        "name": "Fall Santos",
        "email": "fallsantosdev@hotmail.com",
        "homepage": "https://www.fallsantosdev.com.br",
        "role": "Developer"
      }
    ]
  })
})

app.use('/devs', devRouts)

module.exports = app