require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const passport = require('passport')
const path = require('path')
const discordStrategy = require('./strategies/discordStrategy')
const connectDB = require('./database/config')

connectDB()

const authRouter = require('./routes/auth')
const dashboardRouter = require('./routes/dashboard')
const forbiddenRouter = require('./routes/forbidden')

app.use(
  session({
    secret: process.env.SECRET,
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    resave: true,
    saveUninitialized: false,
    name: 'discord.oauth2',
  })
)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRouter)
app.use('/dashboard', dashboardRouter)
app.use('/forbidden', forbiddenRouter)

const isAuthorized = (req, res, next) => {
  if (req.user) {
    console.log('User is logged in')
    res.redirect('/dashboard')
  } else {
    console.log('User is not logged in')
    next()
  }
}

app.get('/', isAuthorized, (req, res) => {
  res.render('home')
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
