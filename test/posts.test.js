const axios = require('axios')
const { posts, comments } = require('../data.json')
const { URL, TIMEOUT } = require('./config.json')

test('Get a single post', async() => {
    const expected = {
      userId: posts[0].userId,
      id: posts[0].id,
      title: posts[0].title,
      body: posts[0].body,
      comments: comments.filter(comment => comment.postId === 1)
    }
    const query = `
    {
        posts(id: 1){
          userId
          id
          title
          body
          comments{
            postId
            id
            name
            email
            body
          }
        }
    }
    `
    const res = await axios.post(URL, { query })
    expect(res.data.data.posts).toEqual([expected])
}, TIMEOUT)

test('Get all posts', async() => {
  const query = `
  {
      posts{
        userId
        id
        title
        body
      }
  }
  `
  const res = await axios.post(URL, { query })
  expect(res.data.data.posts).toEqual(posts)
}, TIMEOUT)

test('Add a new post', async() => {
  const expected = {
    userId: 8,
    id: 101,
    title: "Post Title",
    body: "This is a post"
  }
  const query = `
  mutation {
    addPost(userId: 8, title: "Post Title", body: "This is a post"){
      userId
      id
      title
      body
    }
  }
  `
  const res = await axios.post(URL, { query })
  expect(res.data.data.addPost).toEqual(expected)
}, TIMEOUT)