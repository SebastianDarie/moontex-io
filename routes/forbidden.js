const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('forbidden')
})

module.exports = router
