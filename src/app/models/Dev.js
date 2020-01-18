const mongoose = require('mongoose')

const PointSchema = require('./utils/PointSchema')

const DevSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  github_username: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    required: true,
    trim: true
  },
  avatar_url: {
    type: String,
    required: true,
    trim: true
  },
  techs: [{
    type: String,
    required: true,
    trim: true
  }],
  location: {
    type: PointSchema,
    index: '2dsphere'
  }
},
  {
    timestamps: true// cria os campos create_at e update_at*
  })

module.exports = mongoose.model('Dev', DevSchema)