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
                    street: { type: GraphQLString, defaultValue: '' },
                    suite: { type: GraphQLString, defaultValue: '' },
                    city: { type: GraphQLString, defaultValue: '' },
                    zipcode: { type: GraphQLString, defaultValue: '' },
                    geo: {
                        type: new GraphQLInputObjectType({
                            name: 'GeoInput',
                            description: 'Represents latitude and longitude',
                            fields: () => ({
                                lat: { type: GraphQLString, defaultValue: '' },
                                lng: { type: GraphQLString, defaultValue: '' }
                            })
                        })
                    }
                })
            })
        },
        phone: { type: GraphQLString, defaultValue: '' },
        website: { type: GraphQLString, defaultValue: '' },
        company: {
            type: new GraphQLInputObjectType({
                name: 'CompanyInput',
                fields: () => ({
                    name: { type: GraphQLString, defaultValue: '' },
                    catchPhrase: { type: GraphQLString, defaultValue: '' },
                    bs: { type: GraphQLString, defaultValue: '' }
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