const { GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql')
const { PostType } = require('./types')
const  data = require('../data.json').posts

const posts = {
    type: new GraphQLList(PostType),
    description: 'List of posts',
    args: {
        id: { type: GraphQLInt, defaultValue: -1 }
    },
    resolve: (parent, args) => {
        if(args.id !== -1) return data.filter(post => post.id === args.id)
        return data
    }
}

const addPost = {
    type: PostType,
    description: 'Add a new post',
    args: {
        userId: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLNonNull(GraphQLString) },
        body: { type: GraphQLNonNull(GraphQLString) }
    },
    resolve: (parent, args) => {
        const newPost = {
            userId: args.userId,
            id: data.length + 1,
            title: args.title,
            body: args.body
        }
        return newPost
    }
}

module.exports = { addPost, posts }