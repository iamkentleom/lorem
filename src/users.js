const { GraphQLList, GraphQLInt } = require('graphql')
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

// const addUser = {
//     type: UserType,
//     description: 'Add a new user',
//     args: {

//     }
// }

module.exports = { user, users }