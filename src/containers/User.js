import React from 'react'
import { gql, graphql } from 'react-apollo'

import Table from '../components/table/Table'

const User = ({ data }) => {
  const { loading, users } = data
  return (
    <div>
      <Table loading={loading} data={users} />
    </div>
  )
}

const query = gql`
  query {
    users: findUsers (name: "name") {
      id
      name
      email
      address
      age
    }
  }
`

export default graphql(query)(User)
