const mongoose = require('mongoose');

const url = "mongodb+srv://Maxim:Psl505125@cluster0.dd3hd.mongodb.net/NoteApp?retryWrites=true&w=majority&appName=Cluster0";

mongoose.set('strictQuery', false);

// Establish MongoDB Connection
mongoose.connect(url)
    .then(() => console.log('Connection successful'))
    .catch((error) => console.error('Error connecting to database:', error.message));

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    important: Boolean
});

const Note = mongoose.model('Note', noteSchema);

// Create and save a new note
const note = new Note({
    content: 'Mongo makes things easy',
    important: true
});

note.save()
    .then(() => {
        console.log('Note saved!');
        return Note.find({}); // Return the promise to chain it
    })
    .then(result => {
        result.forEach(note => {
            console.log(note);
        });

        // Close the connection properly after operations are done
        return mongoose.connection.close();
    })
    .then(() => console.log('MongoDB connection closed'))
    .catch(error => {
        console.error('Error:', error.message);
    });