const { GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql')
const { PhotoType } = require('./types')
const  data = require('../data.json').photos

const photos = {
    type: new GraphQLList(PhotoType),
    description: 'List of photos',
    args: {
        id: { type: GraphQLInt, defaultValue: -1 }
    },
    resolve: (parent, args) => {
        if(args.id !== -1) return data.filter(photo => photo.id === args.id)
        return data
    }
}

const addPhoto = {
    type: PhotoType,
    description: 'Add a new photo',
    args: {
        albumId: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLNonNull(GraphQLString) },
        url: { type: GraphQLNonNull(GraphQLString) },
        thumbnailUrl: { type: GraphQLString, defaultValue: "" }
    },
    resolve: (parent, args) => {
        const newPhoto = {
            albumId: args.albumId,
            id: data.length + 1,
            title: args.title,
            url: args.url,
            thumbnailUrl: args.thumbnailUrl || args.url
        }
        return newPhoto
    }
}

module.exports = { addPhoto, photos }