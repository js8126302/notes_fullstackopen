const dotenv = require('dotenv')
const express = require('express')
const app = express()
const cors = require('cors')
dotenv.config()
app.use(express.json())
const {databaseConnection, Note} = require('./models/note.cjs')
app.use(cors())
app.use(express.static('dist'))

databaseConnection()

//api routes

//show all notes in databse
app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => (
    res.json(notes)
  ))

})

//add new note to databse
app.post('/api/notes', (request, response, next) => {
  const { content, important } = request.body;

  if (!content) {
    return response.status(400).json({ error: 'Content missing' });
  }

  const note = new Note({
    content, 
    important: important || false,
  });

  note.save()
    .then(savedNote => response.json(savedNote))
    .catch(error => next(error)); // Pass error to the global error handler
});

//find note by id
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        return response.json(note)
      } else {
         return response.status(404).end()
      }
    })
    .catch(error => {
      return next(error)
      /*console.log(`Error retreiving note with id: ${request.params.id}: 
        ${error}`)
      return response.status(400).send({ error: 'malformatted id' }) */
    })
})

//delete note
app.delete('/api/notes/:id', (request, response) => {
 const id = request.params.id
 Note.findByIdAndDelete(id)
     .then(() => {
      console.log(`Note with id: ${id} was deleted`)
      response.status(201).end()
     })
     .catch(error => next(error))
})

//update note 
app.put('/api/notes/:id', (request, response, next) => {
  const {content, important} = request.body

  const note = {
    content: content,
    important: important,
  }

  Note.findByIdAndUpdate(request.params.id, 
                         note, 
                        { new: true, runValidators: true, context: 'query' })
      .then(updatedNote => {
      response.json(updatedNote)
    })
      .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  const  url = request.originalUrl
  console.log(`url: ${url} is not found`)
  return response.status(404).json({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if (error.name === 'CastError'){
    return response.status(400).send({error: 'malformatted id'})
  }
  else if (error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})