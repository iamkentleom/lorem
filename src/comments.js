const { GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql')
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

const addComment = {
    type: CommentType,
    description: 'Add a new comment',
    args: {
        postId: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        body: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: () => {
        const newComment = {
            postId: args.postId,
            id: data.length + 1,
            name: args.name,
            email: args.email,
            body: args.body
        }
        return newComment
    }
}

module.exports = { addComment, comment, comments }