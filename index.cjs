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
app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => (
    res.json(notes)
  ))

})

app.post('/api/notes', (request, response) => {
  const body = request.body
  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = new Note ({
    content: body.content,
    important: body.important || false, 
  })
  note.save().then(savedNote => response.json(savedNote))
})

//find note by id
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  Note.findById(id).then(note => {
    note ? response.json(note) : response.json({message: `Note with id: ${id} is not found `})
  }).catch (error => response.status(500).json({message: 'Error finding note', error}))
})

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}




 
 

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})