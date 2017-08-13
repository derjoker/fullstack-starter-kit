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
  findUsers (name: String!) : [User]
}

type Mutation {
  createUser (userInput: UserInput!) : User
  createUsers (userInputs: [UserInput]!) : [User]
  updateUser (userInput: UserInput!): User
}
`

const resolvers = {
  Query: {
    test: () => 'it works!',
    fetchUsers: (_, { ids }) => User.fetch(ids),
    findUsers: (_, { name }) => User.find({ name: new RegExp(name) })
  },
  Mutation: {
    createUser: (_, { userInput }) => User.insert(userInput),
    createUsers: (_, { userInputs }) => User.insert(userInputs),
    updateUser: (_, { userInput }) => User.update(userInput)
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = schema
