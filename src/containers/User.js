import React from 'react'
import { gql, graphql, compose } from 'react-apollo'

import Table from '../components/table/Table'

const User = ({ data, mutate }) => {
  const { loading, users } = data
  return (
    <div>
      <Table
        loading={loading}
        data={users}
        save={record => mutate({
          variables: {user: record}
        })} />
    </div>
  )
}

const USER_QUERY = gql`
query {
  users: findUsers (condition: {}) {
    id
    name
    email
    address
    age
  }
}
`
const withUsers = graphql(USER_QUERY)

const USER_UPDATE = gql`
mutation updateUser ($user: UserInput!) {
  user: updateUser (user: $user) {
    id
    name
    email
    address
    age
  }
}
`

const withUpdateUser = graphql(USER_UPDATE)

const withData = compose(
  withUsers,
  withUpdateUser
)

export default withData(User)
