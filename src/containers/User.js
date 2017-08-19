import React from 'react'
import { gql, graphql, compose } from 'react-apollo'

import UserTable, { column } from '../components/table/UserTable'

const columns = column.build([
  {accessor: 'name'},
  {accessor: 'email'},
  {accessor: 'address', editable: true},
  {accessor: 'age', editable: true}
])

const User = ({ data, mutate }) => {
  const { loading, users } = data
  return (
    <div>
      <UserTable
        loading={loading}
        columns={columns}
        data={users}
        save={record => mutate({
          variables: {user: record}
        })} />
    </div>
  )
}

User.fragments = {
  user: gql`
    fragment UserFragment on User {
      name
      email
      address
      age
    }
  `
}

const USER_QUERY = gql`
query {
  users: findUsers (condition: {}) {
    id
    ...UserFragment
  }
}

${User.fragments.user}
`
const withUsers = graphql(USER_QUERY)

const USER_UPDATE = gql`
mutation updateUser ($user: UserInput!) {
  user: updateUser (user: $user) {
    id
    ...UserFragment
  }
}

${User.fragments.user}
`

const withUpdateUser = graphql(USER_UPDATE)

const withData = compose(
  withUsers,
  withUpdateUser
)

export default withData(User)
