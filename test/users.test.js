const axios = require('axios')
const { users } = require('../data.json')
const { URL } = require('./url.json')

test('Get a single user', async() => {
    const expected = [users[0]]
    const query = `
    {
      users(id: 1){
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
    expect(res.data.data.users).toEqual(expected)
}, 10000)

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
}, 10000)