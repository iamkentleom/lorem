const axios = require('axios')
const { todos } = require('../data.json')
const { URL } = require('./url.json')

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
}, 10000)