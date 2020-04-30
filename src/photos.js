const { GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql')
const { PhotoType } = require('./types')
const  data = require('../data.json').photos

const photos = {
    type: new GraphQLList(PhotoType),
    description: 'List of all photos',
    resolve: () => data
}

const photo = {
    type: PhotoType,
    description: 'A single photo',
    args: {
        id: { type: GraphQLInt }
    },
    resolve: (parent, args) => data.find(photo => photo.id === args.id)
}

const addPhoto = {
    type: PhotoType,
    description: 'Add a new photo',
    args: {
        albumId: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLNonNull(GraphQLString) },
        url: { type: GraphQLNonNull(GraphQLString) },
        thumbnailUrl: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (parent, args) => {
        const newPhoto = {
            albumId: args.albumId,
            id: data.length + 1,
            title: args.title,
            url: args.title,
            thumbnailUrl: args.thumbnailUrl
        }
        return newPhoto
    }
}

module.exports = { addPhoto, photo, photos }