const { GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql')
const { CommentType } = require('./types')
const data = require('../data.json').comments

const comments = {
    type: new GraphQLList(CommentType),
    description: 'List of comments',
    args: {
        id: { type: GraphQLInt, defaultValue: -1 }
    },
    resolve: (parent, args) => {
        if(args.id !== -1) return data.filter(comment => comment.id === args.id)
        return data
    }
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
    resolve: (parent, args) => {
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

module.exports = { addComment, comments }