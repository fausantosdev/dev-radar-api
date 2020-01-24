const axios = require('axios')

const Dev = require('../models/Dev')
const parseStringAsArray = require('../../utils/parseStringAsArray')

module.exports = {
  async index(req, res) {
    const devs = await Dev.find()
    res.json(devs)
  },

  async store(req, res) {// Named function
    const { github_username, techs, latitude, longitude } = req.body

    // Evitar cadastros duplicados.
    let dev = await Dev.findOne({ github_username })

    if (!dev) {
      // se o name não existir, o valor padrão será o login
      const response = await axios.get(`https://api.github.com/users/${github_username}`)

      const { name = login, avatar_url, bio } = response.data

      const techsArray = parseStringAsArray(techs)
      //const techsArray = techs.split(' ')

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }

      dev = await Dev.create({
        name,
        github_username,
        avatar_url,
        bio,
        techs: techsArray,
        location
      }/*, (err, dev) => {
        if (err) return handleError(err);
        //console.log(dev)
        res.json(dev)

      }*/)

      res.json(dev)

    } else {
      res.json({ response: false })
    }


  },

  async show(req, res) {
    // Buscar num raio de 10km
    // Filtrar por tecnologia
    //console.log(req.query)
    const { latitude, longitude, techs } = req.query

    const techsArray = parseStringAsArray(techs)

    const devs = await Dev.find({
      techs: {// Filtro
        $in: techsArray// Encontrar se usuários tenham as tecnologias que estejam dentro deste array.
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000// Distância máxima de 10km
        }
      }
    })

    res.json({ devs })
  }
}