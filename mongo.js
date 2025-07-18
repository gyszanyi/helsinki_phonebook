const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const phoneNumber = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.9vsi0hw.mongodb.net/helsinki_phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (name === null || phoneNumber === null) {
  Person
    .find({})
    .then(result => {
      result.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close()
    })
} else {
  const person = new Person({
    name: name,
    number: phoneNumber,
  })

  person.save().then(() => {
    console.log(`added ${name} number ${phoneNumber} to the phonebook`)
    mongoose.connection.close()
  })
}
