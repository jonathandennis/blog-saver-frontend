import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (title, author, url) => {
  const config = {
    headers: { Authorization: token },
  }
  const object = { title, author, url, likes: 0 }

  const response = await axios.post(baseUrl, object, config)
  return response.data
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const addComment = async (id, comment) => {
  const object = { comment }
  const response = await axios.post(`${baseUrl}/${id}/comments`, object)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  const response = await request.data
  return response
}
// eslint-disable-next-line
export default { getAll, create, setToken, update, addComment, remove }
