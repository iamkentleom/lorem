const { GraphQLList, GraphQLInt } = require('graphql')
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

module.exports = { album, albums }