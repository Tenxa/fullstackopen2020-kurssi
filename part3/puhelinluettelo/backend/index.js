require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const { request, response } = require('express')
const cors = require('cors')
const app = express()
const Person = require('./models/person')
const person = require('./models/person')

app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.static('build'))

app.use(cors())


app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
    res.send(`<div>Phonebook has info for ${persons.length} people <div></br> ${new Date()}</div></div>`)
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(result => {
        res.json(result)
        //mongoose.connection.close()
    })

})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id).then(note => {
        res.json(person);
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})


app.post('/api/persons', (req, res) => {
    const body = req.body

    if (body.name === undefined || body.number === undefined) {
        return res.status(400).json({
            error: "Name or number missing!"
        })
    }

    /*
    const result = persons.filter(person => person.name == body.name)
    if (result.length > 0) {
        return res.status(400).json({
            error: "Name must be unique"
        })
    }*/

    const person = new Person({
        name: body.name,
        number: body.number,
        id: Number(Math.floor(Math.random() * Math.floor(1500)))
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})