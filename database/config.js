const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('connected to MongoDB')
  } catch (error) {
    console.error('error connecting to MongoDB', error)
  }
}

module.exports = connectDB
