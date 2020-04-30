const { GraphQLList, GraphQLInt, GraphQLBoolean, GraphQLNonNull, GraphQLString } = require('graphql')
const { TodoType } = require('./types')
const data = require('../data.json').todos

const todos = {
    type: new GraphQLList(TodoType),
    description: 'List of todos',
    args: {
        id: { type: GraphQLInt, defaultValue: -1 }
    },
    resolve: (parent, args) => {
        if(args.id !== -1) return data.filter(todo => todo.id === args.id)
        return data
    }
}

const addTodo = {
    type: TodoType,
    description: 'Add a new todo item',
    args: {
        userId: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLNonNull(GraphQLString) },
        completed: { type: GraphQLNonNull(GraphQLBoolean), defaultValue: false }
    },
    resolve: (parent, args) => {
        const newTodo = {
            userId: args.userId,
            id: data.length + 1,
            title: args.title,
            completed: args.completed
        }
        return newTodo
    }
}

module.exports = { addTodo, todos }