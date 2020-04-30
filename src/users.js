const { GraphQLList, GraphQLInputObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql')
const { UserType } = require('./types')
const data = require('../data.json').users

const users = {
    type: new GraphQLList(UserType),
    description: 'List of users',
    args: {
        id: { type: GraphQLInt, defaultValue: -1 }
    },
    resolve: (parent, args) => {
        if(args.id !== -1) return data.filter(user => user.id === args.id)
        return data
    }
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

module.exports = { addUser, users }