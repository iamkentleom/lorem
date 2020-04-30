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

const UserInput = new GraphQLInputObjectType({
    name: 'UserInput',
    description: 'User input object',
    fields: () => ({
        name: { type: GraphQLNonNull(GraphQLString) },
        username: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        address: {
            type: new GraphQLInputObjectType({
                name: 'AddressInput',
                fields: () => ({
                    street: { type: GraphQLNonNull(GraphQLString) },
                    suite: { type: GraphQLNonNull(GraphQLString) },
                    city: { type: GraphQLNonNull(GraphQLString) },
                    zipcode: { type: GraphQLNonNull(GraphQLString) },
                    geo: {
                        type: new GraphQLInputObjectType({
                            name: 'GeoInput',
                            description: 'Represents latitude and longitude',
                            fields: () => ({
                                lat: { type: GraphQLNonNull(GraphQLString) },
                                lng: { type: GraphQLNonNull(GraphQLString) }
                            })
                        })
                    }
                })
            })
        },
        phone: { type: GraphQLNonNull(GraphQLString) },
        website: { type: GraphQLNonNull(GraphQLString) },
        company: {
            type: new GraphQLInputObjectType({
                name: 'CompanyInput',
                fields: () => ({
                    name: { type: GraphQLNonNull(GraphQLString) },
                    catchPhrase: { type: GraphQLNonNull(GraphQLString) },
                    bs: { type: GraphQLNonNull(GraphQLString) }
                })
            })
        }
    })
})

const addUser = {
    type: UserType,
    description: 'Add a new user',
    args: {
        input: { type: new GraphQLNonNull(UserInput) }
    },
    resolve: (parent, { input }) => {
        input.id = data.length + 1
        return input
    }
}

module.exports = { addUser, users }