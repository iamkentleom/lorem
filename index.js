const express = require('express')
const expressGraphQL = require('express-graphql')
const cors = require('cors')
const { GraphQLSchema, GraphQLObjectType } = require('graphql')

const { album, albums } = require('./src/albums')
const { comment, comments }  = require('./src/comments')
const { photo, photos } = require('./src/photos')
const { post, posts } = require('./src/posts')  
const { addTodo, todo, todos } = require('./src/todos')
const { user, users } = require('./src/users')


const app = express()
const port = process.env.PORT || 8000


const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        album,
        albums,
        comment,
        comments,
        photo,
        photos,
        post,
        posts,
        todo,
        todos,
        user,
        users
    })
})

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addTodo
    })
})


const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

app.use(cors())
app.use(express.static('public'))
app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))
app.use(express.json())

app.listen(port, () => console.log('Server running at port: ', port))