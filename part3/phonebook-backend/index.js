require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => res.json(persons))
})

app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    res.send(`
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
    `)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).json({ error: 'person not found' })
      }
    })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body
  if (!name) return res.status(400).json({ error: 'name missing' })
  if (!number) return res.status(400).json({ error: 'number missing' })

  const person = new Person({ name, number })
  person.save()
    .then(saved => res.json(saved))
    .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updated => res.json(updated))
    .catch(err => next(err))
})

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
