require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const passport = require('passport')
const discordStrategy = require('./strategies/discordStrategy')
const connectDB = require('./database/config')

connectDB()

const authRouter = require('./routes/auth')

app.use(
  session({
    secret: process.env.SECRET,
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    resave: true,
    saveUninitialized: false,
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRouter)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
