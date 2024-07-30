import { useState, useEffect } from 'react'
import axios from 'axios'

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

function Persons({ persons }) {
  return (
    <div>
      <div>
        {persons.map((person) => (
          <div key={person.name}>
            {person.name} {person.number}
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
    console.log('effect')

    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data)
      setSearchTerm(response.data)
    })
  }, [])

  function handleClick(event) {
    event.preventDefault()

    console.log(newName)
    console.log(newNumber)
    const names = persons.map((item) => item.name)

    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
      setNewName('')
      setNewNumber('')
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
      <Persons persons={searchTerm} />
    </div>
  )
}

export default App
