const axios = require('axios')
const { photos } = require('../data.json')
const { URL } = require('./url.json')

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
}, 10000)