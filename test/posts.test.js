const axios = require('axios')
const { posts } = require('../data.json')
const { URL } = require('./url.json')

test('Get a single post', async() => {
    const expected = [posts[0]]
    const query = `
    {
        posts(id: 1){
          userId
          id
          title
          body
        }
    }
    `
    const res = await axios.post(URL, { query })
    expect(res.data.data.posts).toEqual(expected)
}, 10000)