const app = require('./config/express')
require('dotenv').config()

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${3333}...`)
})