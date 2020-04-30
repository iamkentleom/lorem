const { GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql')
const { AlbumType } = require('./types')
const data = require('../data.json').albums

const albums = {
    type: new GraphQLList(AlbumType),
    description: 'List of albums',
    args: {
        id: { type: GraphQLInt, defaultValue: -1 }
    },
    resolve: (parent, args) => {
        if(args.id !== -1) return data.filter(album => album.id === args.id)
        return data
    }
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

module.exports = { addAlbum, albums }