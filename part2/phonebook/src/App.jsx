import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'

function Filter({ persons, setSearchTerm }) {
  function filteredPersons(inputValue) {
    inputValue = inputValue.toLowerCase()
    return persons.filter(
      (person) => person.name.toLowerCase().search(inputValue) != -1
    )
  }
  return (
    <div>
      Filter shown with{' '}
      <input
        type='text'
        onChange={(e) => {
          setSearchTerm(filteredPersons(e.target.value))
        }}
      />
    </div>
  )
}

function Name({ newName, setNewName }) {
  return (
    <div>
      name:{' '}
      <input
        type='text'
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
    </div>
  )
}

function Number({ newNumber, setNewNumber }) {
  return (
    <div>
      number:{' '}
      <input
        type='text'
        value={newNumber}
        onChange={(e) => setNewNumber(e.target.value)}
      />
    </div>
  )
}

function Button({ text, handleClick }) {
  return (
    <button type='submit' onClick={handleClick}>
      {text}
    </button>
  )
}

function PersonForm({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  handleClick,
}) {
  return (
    <div>
      <form>
        <Name newName={newName} setNewName={setNewName} />
        <Number newNumber={newNumber} setNewNumber={setNewNumber} />
        <Button text='add' handleClick={handleClick} />
      </form>
    </div>
  )
}

function Persons({ persons, setSearchTerm }) {
  function deletePersonOf(id) {
    console.log(`delete id: ${id}`)
    const target = persons.find((person) => person.id == id)
    if (
      window.confirm(`Are you sure to delete ${target.name}'s phone number?`)
    ) {
      phonebookService
        .remove(id)
        .then(() =>
          phonebookService
            .getAll()
            .then((returnedData) => setSearchTerm(returnedData))
        )
    }
  }

  return (
    <div>
      <div>
        {persons.map((person) => (
          <div key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deletePersonOf(person.id)}>delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState(persons)

  useEffect(() => {
    phonebookService.getAll().then((returnedData) => {
      setPersons(returnedData)
      setSearchTerm(returnedData)
    })
  }, [])

  function handleClick(event) {
    event.preventDefault()

    console.log(newName)
    console.log(newNumber)
    const names = persons.map((item) => item.name)
    const newPerson = { name: newName, number: newNumber }

    if (names.includes(newName)) {
      if (
        confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const targetId = persons.find((person) => person.name == newName).id
        phonebookService.update(targetId, newPerson).then(() => {
          const changedPersons = persons.map((item) => {
            if (item.name === newName) {
              return newPerson
            } else {
              return item
            }
          })
          setPersons(changedPersons)
          setSearchTerm(changedPersons)
        })
      } else {
        alert(`${newName} is already added to phonebook`)
      }
    } else {
      phonebookService.create(newPerson).then((returnedData) => {
        setPersons(persons.concat(returnedData))
        setSearchTerm(searchTerm.concat(newPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} setSearchTerm={setSearchTerm} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleClick={handleClick}
      />
      <h2>Numbers</h2>
      <Persons persons={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  )
}

export default App
