const { GraphQLList, GraphQLInt, GraphQLBoolean, GraphQLNonNull, GraphQLString } = require('graphql')
const { TodoType } = require('./types')
const data = require('../data.json').todos

const todos = {
    type: new GraphQLList(TodoType),
    description: 'List of all todos',
    resolve: () => data
}

const todo = {
    type: TodoType,
    description: 'A single todo item',
    args: {
        id: { type:  GraphQLInt }
    },
    resolve: (parent, args) => data.find(todo => todo.id === args.id)
}

const addTodo = {
    type: TodoType,
    description: 'Add a new todo item',
    args: {
        userId: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLNonNull(GraphQLString) },
        completed: { type: GraphQLNonNull(GraphQLBoolean) }
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

module.exports = { addTodo, todo, todos }