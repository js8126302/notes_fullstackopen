const mongoose = require('mongoose')

const url = "mongodb+srv://Maxim:Psl505125@cluster0.dd3hd.mongodb.net/NoteApp?retryWrites=true&w=majority&appName=Cluster0"
mongoose.set('strictQuery',false)



const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

mongoose.connect(url)
        .then(() => 'Connection succefull')
        .catch((error) => console.error(`Error connectiong to database`, error.message))

const note = new Note({
  content: 'Mongo makes things easy',
  important: true,
})

note.save()
    .then(result => {
        console.log('note saved!')
        //mongoose.connection.close()
    })

Note.find({})
    .then(result => {
        result.forEach(note => {
            console.log(note)
    })
    
    })
    .then(() => {
        try {
        mongoose.connection.close()
        console.log('Mongo Connection is Closed')
        } catch (error) {
            console.log(`Error closing connection`)
        }
    })
   