const { GraphQLList, GraphQLInt } = require('graphql')
const { CommentType } = require('./types')
const data = require('../data.json').comments

const comments = {
    type: new GraphQLList(CommentType),
    description: 'List of all comments',
    resolve: () => data
}

const comment = {
    type: CommentType,
    description: 'A single comment',
    args: {
        id: { type: GraphQLInt }
    },
    resolve: (parent, args) => data.find(comment => comment.id === args.id)
}

module.exports = { comment, comments }