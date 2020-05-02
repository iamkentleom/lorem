const axios = require('axios')
const { users, albums, posts, todos } = require('../data.json')
const { URL, TIMEOUT } = require('./config.json')

test('Get a single user', async() => {
    const expected = {
      id: users[0].id,
      name: users[0].name,
      username: users[0].username,
      email: users[0].email,
      phone: users[0].phone,
      website: users[0].website,
      albums: albums.filter(album => album.userId === 1),
      posts: posts.filter(post => post.userId === 1),
      todos: todos.filter(todo => todo.userId === 1)
    }
    const query = `
    {
      users(id: 1){
        id
        name
        username
        email
        phone
        website
        albums{
          userId
          id
          title
        }
        posts{
          userId
          id
          title
          body
        }
        todos{
          userId
          id
          title
          completed
        }
      }
    }
    `
    const res = await axios.post(URL, { query })
    expect(res.data.data.users).toEqual([expected])
}, TIMEOUT)

test('Get all users', async() => {
    const query = `
    {
      users{
        id
        name
        username
        email
        address{
          street
          suite
          city
          zipcode
          geo{
            lat
            lng
          }
        }
        phone
        website
        company{
          name
          catchPhrase
          bs
        }
      }
    }
    `
    const res = await axios.post(URL, { query })
    expect(res.data.data.users).toEqual(users)
}, TIMEOUT)

test('Add a new user', async() => {
  const expected = {
    id: 11,
    name: "Jane Doe",
    username: "jane_doe",
    email: "jane@email.com"
  }
  const query = `
  mutation {
    addUser(input: {
      name: "Jane Doe",
      username: "jane_doe",
      email: "jane@email.com",
    }){
      id
      name
      username
      email
    }
  }
  `
  const res = await axios.post(URL, { query })
  expect(res.data.data.addUser).toEqual(expected)
}, TIMEOUT)