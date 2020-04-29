const { GraphQLList, GraphQLInt } = require('graphql')
const { PostType } = require('./types')
const  data = require('../data.json').posts

const posts = {
    type: new GraphQLList(PostType),
    description: 'List of all posts',
    resolve: () => data
}

const post = {
    type: PostType,
    description: 'A single post',
    args: {
        id: { type: GraphQLInt }
    },
    resolve: (parent, args) => data.find(post => post.id === args.id)
}


module.exports = { posts, post }