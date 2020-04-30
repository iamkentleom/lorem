const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLBoolean, GraphQLInt, GraphQLString } = require('graphql')
const { albums, comments, photos, posts, todos } = require('../data.json')

const AlbumType = new GraphQLObjectType({
    name: 'Album',
    description: 'Represents an album of photos',
    fields: () => ({
        userId: { type: GraphQLNonNull(GraphQLInt) },
        id: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLNonNull(GraphQLString) },
        photos: {
            type: new GraphQLList(PhotoType),
            resolve: (album) => {
                return photos.filter(photo => photo.albumId === album.id)
            }
        }
    })
})

const CommentType = new GraphQLObjectType({
    name: 'Comment',
    description: 'Represents a comment from a post',
    fields: () => ({
        postId: { type: GraphQLNonNull(GraphQLInt) },
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        body: { type: GraphQLNonNull(GraphQLString) }
    })
})

const PhotoType = new GraphQLObjectType({
    name: 'Photo',
    description: 'Represents a photo',
    fields: () => ({
        albumId: { type: GraphQLNonNull(GraphQLInt) },
        id: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLNonNull(GraphQLString) },
        url: { type: GraphQLNonNull(GraphQLString) },
        thumbnailUrl: { type: GraphQLNonNull(GraphQLString) }
    })
})

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Represents a post from a user',
    fields: () => ({
        userId: { type: GraphQLNonNull(GraphQLInt) },
        id: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLNonNull(GraphQLString) },
        body: { type: GraphQLNonNull(GraphQLString) },
        comments: {
            type: new GraphQLList(CommentType),
            resolve: (post) => {
                return comments.filter(comment => comment.postId === post.id)
            }
        }
    })
})

const TodoType = new GraphQLObjectType({
    name: 'Todo',
    description: 'Represent a todo item',
    fields: () => ({
        userId: { type: GraphQLNonNull(GraphQLInt) },
        id: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLNonNull(GraphQLString) },
        completed: { type: GraphQLNonNull(GraphQLBoolean) }
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Represents a user',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        username: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        address: {
            type: new GraphQLObjectType({
                name: 'Address',
                fields: () => ({
                    street: { type: GraphQLString },
                    suite: { type: GraphQLString },
                    city: { type: GraphQLString },
                    zipcode: { type: GraphQLString },
                    geo: {
                        type: new GraphQLObjectType({
                            name: 'Geo',
                            description: 'Represents latitude and longitude',
                            fields: () => ({
                                lat: { type: GraphQLString },
                                lng: { type: GraphQLString }
                            })
                        })
                    }
                })
            })
        },
        phone: { type: GraphQLString },
        website: { type: GraphQLString },
        company: {
            type: new GraphQLObjectType({
                name: 'Company',
                fields: () => ({
                    name: { type: GraphQLString },
                    catchPhrase: { type: GraphQLString },
                    bs: { type: GraphQLString }
                })
            })
        },
        albums: {
            type: new GraphQLList(AlbumType),
            resolve: (user) => {
                return albums.filter(album => album.userId === user.id)
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve: (user) => {
                return posts.filter(post => post.userId === user.id)
            }
        },
        todos: {
            type: new GraphQLList(TodoType),
            resolve: (user) => {
                return todos.filter(todo => todo.userId === user.id)
            }
        }
    })
})

module.exports = { AlbumType, CommentType, PhotoType, PostType, TodoType, UserType }