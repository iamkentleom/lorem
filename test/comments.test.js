const axios = require('axios')
const { comments } = require('../data.json')
const { URL } = require('./url.json')

test('Get a single comment', async() => {
    const expected = [comments[0]]
    const query = `
    {
        comments(id: 1){
            postId
            id
            name
            email
            body
        }
    }
    `
    const res = await axios.post(URL, { query })
    expect(res.data.data.comments).toEqual(expected)
}, 10000)

test('Get all comments', async() => {
    const query = `
    {
        comments{
            postId
            id
            name
            email
            body
        }
    }
    `
    const res = await axios.post(URL, { query })
    expect(res.data.data.comments).toEqual(comments)
}, 10000)