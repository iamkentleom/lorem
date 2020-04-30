const { GraphQLList, GraphQLInputObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql')
const { UserType } = require('./types')
const data = require('../data.json').users

const users = {
    type: new GraphQLList(UserType),
    description: 'List all users',
    resolve: () => data
}

const user = {
    type: UserType,
    description: 'A single user',
    args: {
        id: { type: GraphQLInt }
    },
    resolve: (parent, args) => data.find(user => user.id === args.id)
}

const addUser = {
    type: UserType,
    description: 'Add a new user',
    args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        username: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLInputObjectType},
        phone: { type: GraphQLNonNull(GraphQLString) },
        website: { type: GraphQLNonNull(GraphQLString) },
        company: { type: GraphQLInputObjectType}
    },
    resolve: (parent, args) => {
        const newUser = {
            id: data.length + 1,
            name: args.name,
            username: args.username,
            email: args.email,
            address: args.address,
            phone: args.phone,
            website: args.website,
            company: args.company
        }
        return newUser
    }
}

module.exports = { addUser, user, users }