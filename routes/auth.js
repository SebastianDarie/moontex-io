const router = require('express').Router()
const passport = require('passport')

router.get('/', passport.authenticate('discord'))

router.get(
  '/dashboard',
  passport.authenticate('discord', {
    failureRedirect: '/forbidden',
  }),
  (req, res) => {
    res.sendStatus(200)
  }
)

module.exports = router
