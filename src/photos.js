const { GraphQLList, GraphQLInt } = require('graphql')
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

module.exports = { photo, photos }