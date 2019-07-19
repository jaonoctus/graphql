const { db } = require('../database/knex')
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLInputObjectType
} = require('graphql')

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString }
    })
})

const UserInputType = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: () => ({
        name: UserType.getFields().name,
        email: UserType.getFields().email
    })
})

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            users: {
                type: new GraphQLList(UserType),
                resolve: async () => await db('users')
            },
            user: {
                type: UserType,
                args: {
                    id: UserType.getFields().id
                },
                resolve: async (_, { id }) => await db('users').where('id', id).first()
            }
        })
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: () => ({
            createUser: {
                type: UserType,
                args: {
                    user: { type: UserInputType }
                },
                resolve: async (_, { user }) => {
                    const [ id ] = await db('users').insert(user)
                    return await db('users').where('id', id).first()
                }
            },
            updateUser: {
                type: UserType,
                args: {
                    id: UserType.getFields().id,
                    user: { type: UserInputType }
                },
                resolve: async (_, { id, user }) => {
                    await db('users').where('id', id).update(user)
                    return await db('users').where('id', id).first()
                }
            },
            deleteUser: {
                type: UserType,
                args: {
                    id: UserType.getFields().id
                },
                resolve: async (_, { id }) => {
                    const user = await db('users').where('id', id).first()
                    await db('users').where('id', id).delete()
                    return user
                }
            },
        })
    })
})

module.exports = schema