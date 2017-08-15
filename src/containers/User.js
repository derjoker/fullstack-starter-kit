import React from 'react'
import { gql, graphql, compose } from 'react-apollo'

import Table from '../components/table/Table'

const columns = [
  {Header: 'Name', accessor: 'name', minWidth: 50},
  {Header: 'Email', accessor: 'email'},
  {Header: 'Address', accessor: 'address', editable: true},
  {Header: 'Age', accessor: 'age', editable: true}
]

const User = ({ data, mutate }) => {
  const { loading, users } = data
  return (
    <div>
      <Table
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
