const { Router } = require('express')

const router = Router()

const devController = require('../controllers/devController')

router.get('/', devController.index)
router.get('/show', devController.show)
router.post('/', devController.store)

//router.get('/read', )

module.exports = router