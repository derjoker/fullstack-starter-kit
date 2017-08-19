import React, { Component } from 'react'

import Table from './Table'
import Column from './column'

const defaultColumns = [
  {Header: 'Name', accessor: 'name', minWidth: 50},
  {Header: 'Email', accessor: 'email', minWidth: 100},
  {Header: 'Address', accessor: 'address', minWidth: 100},
  {Header: 'Age', accessor: 'age', minWidth: 50}
]

export const column = Column(defaultColumns)

class UserTable extends Component {
  render () {
    return (
      <Table {...this.props} />
    )
  }
}

UserTable.defaultProps = {
  columns: defaultColumns
}

export default UserTable
