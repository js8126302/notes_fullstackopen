
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URL

const databaseConnection = () => {
    console.log('Connecting to database...')
    return mongoose.connect(url)
            .then(() => console.log('Connection succesfull'))
            .catch(error => console.error('Error connecting to database', error.message))
}

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    important: Boolean
});
  
  noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  const Note = mongoose.model('Note', noteSchema)


module.exports = {
    databaseConnection, Note
}