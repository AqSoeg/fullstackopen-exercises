import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

function getAll() {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

function create(newObject) {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}

function update(id, newObject) {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

function remove(id) {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request
}

export default {
  getAll,
  create,
  update,
  remove,
}
