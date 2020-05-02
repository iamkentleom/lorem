const axios = require('axios')
const { photos } = require('../data.json')
const { URL, TIMEOUT } = require('./config.json')

test('Get a single photo', async() => {
    const expected = [photos[0]]
    const query = `
    {
        photos(id: 1){
          albumId
          id
          title
          url
          thumbnailUrl
        }
    }
    `
    const res = await axios.post(URL, { query })
    expect(res.data.data.photos).toEqual(expected)
}, TIMEOUT)

test('Get all photos', async() => {
    const query = `
    {
        photos{
          albumId
          id
          title
          url
          thumbnailUrl
        }
    }
    `
    const res = await axios.post(URL, { query })
    expect(res.data.data.photos).toEqual(photos)
}, TIMEOUT)

test('Add a new photo', async() => {
    const expected = {
      albumId: 1,
      id: 5001,
      title: "Title",
      url: "some_url",
      thumbnailUrl: "some_url"
    }
    const query = `
    mutation {
      addPhoto(albumId: 1, title: "Title", url: "some_url", thumbnailUrl: "some_url") {
        albumId
        id
        title
        url
        thumbnailUrl
      }
    }
    `
    const res = await axios.post(URL, { query })
    expect(res.data.data.addPhoto).toEqual(expected)
}, TIMEOUT)