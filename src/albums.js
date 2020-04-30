const { GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql')
const { AlbumType } = require('./types')
const data = require('../data.json').albums

const albums = {
    type: new GraphQLList(AlbumType),
    description: 'List of all albums',
    resolve: () => data
}

const album = {
    type: AlbumType,
    description: 'A single album',
    args: {
        id: { type: GraphQLInt }
    },
    resolve: (parent, args) => data.find(album => album.id === args.id)
}

const addAlbum = {
    type: AlbumType,
    description: 'Add a new album',
    args: {
        userId: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (parent, args) => {
        const newAlbum = {
            userId: args.userId,
            id: data.length + 1,
            title: args.id
        }
        return newAlbum
    }
}

module.exports = { addAlbum, album, albums }