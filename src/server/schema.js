const { makeExecutableSchema } = require('graphql-tools')

const { User } = require('./model')

const typeDefs = `
type User {
  id: ID!
  name: String!
  email: String!
  address: String
  age: Int
}

input UserInput {
  id: ID
  name: String
  email: String
  address: String
  age: Int
}

type Query {
  test: String
  fetchUsers (ids: [ID!]) : [User]
  findUsers (condition: UserInput) : [User]
}

type Mutation {
  createUser (user: UserInput!) : User
  createUsers (users: [UserInput]!) : [User]
  updateUser (user: UserInput!): User
}
`

const resolvers = {
  Query: {
    test: () => 'it works!',
    fetchUsers: (_, { ids }) => User.fetch(ids),
    findUsers: (_, { condition }) => User.find(condition)
  },
  Mutation: {
    createUser: (_, { user }) => User.insert(user),
    createUsers: (_, { users }) => User.insert(users),
    updateUser: (_, { user }) => User.update(user)
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = schema
