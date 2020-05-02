const axios = require('axios')
const { comments } = require('../data.json')
const { URL, TIMEOUT } = require('./config.json')

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
}, TIMEOUT)

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
}, TIMEOUT)

test('Add a new comment', async() => {
    const expected = {
        postId: 1,
        id: 501,
        name: "John Doe",
        email: "user@email.com",
        body: "This is a comment"
    }
    const query = `
    mutation {
        addComment(
          postId: 1, name: "John Doe", 
          email: "user@email.com", body: "This is a comment"
        ){
          postId
          id
          name
          email
          body
        }
    }
    `
    const res = await axios.post(URL, { query })
    expect(res.data.data.addComment).toEqual(expected)
}, TIMEOUT)