const axios = require('axios')
const { albums, photos } = require('../data.json')
const { URL, TIMEOUT } = require('./config.json')

test('Get a single album', async() => {
    let expected = {
        userId: albums[0].userId,
        id: albums[0].id,
        title: albums[0].title,
        photos: photos.filter(photo => photo.albumId === 1)
    }
    const query = `
    {
        albums(id: 1){
            userId
            id
            title
            photos{
                albumId
                id
                title
                url
                thumbnailUrl
            } 
        }
    }
    `
    const res = await axios.post(URL, { query })
    expect(res.data.data.albums).toEqual([expected])
}, TIMEOUT)

test('Get all albums', async() => {
    const query = `
    {
        albums{
            userId
            id
            title
        }
    }
    `
    const res = await axios.post(URL, { query })
    expect(res.data.data.albums).toEqual(albums)
}, TIMEOUT)

test('Add an album', async() => {
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
}, TIMEOUT)