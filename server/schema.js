import { makeExecutableSchema } from 'graphql-tools'

const typeDefs = `
type Query {
  test: String
}
`

const resolvers = {
  Query: {
    test: () => 'it works!'
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

export default schema
