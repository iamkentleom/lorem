const axios = require('axios')
const { albums } = require('../data.json')
const { URL } = require('./url.json')

test('Adding an album', async() => {
    const expected = {
        userId: 8,
        id: 101,
        title: 'Title'
    }
    const query = `
    mutation{
        addAlbum(userId:8, title:"Title"){
            userId
            id
            title
        }
    }
    `
    const res = await axios.post(URL, { query })
    expect(res.data.data.addAlbum).toEqual(expected)
}, 10000)