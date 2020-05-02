const axios = require('axios')
const { todos } = require('../data.json')
const { URL, TIMEOUT } = require('./config.json')

test('Get a todo item', async() => {
    const expected = [todos[0]]
    const query = `
    {
        todos(id: 1){
          userId
          id
          title
          completed
        }
    }
    `
    const res = await axios.post(URL, { query })
    expect(res.data.data.todos).toEqual(expected)
}, TIMEOUT)

test('Get all todos', async() => {
  const query = `
  {
      todos{
        userId
        id
        title
        completed
      }
  }
  `
  const res = await axios.post(URL, { query })
  expect(res.data.data.todos).toEqual(todos)
}, TIMEOUT)

test('Add new todo item', async() => {
  const expected = {
    userId: 8,
    id: 201,
    title: "Finish homework",
    completed: false
  }
  const query = `
  mutation {
    addTodo(userId: 8, title: "Finish homework"){
      userId
      id
      title
      completed
    }
  }
  `
  const res = await axios.post(URL, { query })
  expect(res.data.data.addTodo).toEqual(expected)
}, TIMEOUT)