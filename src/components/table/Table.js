import React from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import { omit } from 'lodash'

import Editable from './Editable'

const Table = ({ loading, data = [], save }) => {
  const renderEditable = cell => {
    return (
      <Editable
        style={{ backgroundColor: '#fafafa' }}
        content={data[cell.index][cell.column.id]}
        save={value => {
          console.log(data[cell.index])
          const previous = omit(data[cell.index], '__typename')
          const current = {...previous}
          current[cell.column.id] = value
          console.table([previous, current])
          console.log(data[cell.index])
          save && save(current)
        }}
      />
    )
  }

  const columns = [
    {Header: 'Name', accessor: 'name', minWidth: 50},
    {Header: 'Email', accessor: 'email'},
    {Header: 'Address', accessor: 'address', Cell: renderEditable},
    {Header: 'Age', accessor: 'age', Cell: renderEditable}
  ]

  return (
    <div>
      <ReactTable
        loading={loading}
        data={data}
        columns={columns}
        pageSize={(data && data.length) || 0}
        showPagination={false}
        style={{textAlign: 'center'}}
        className='-striped -highlight' />
    </div>
  )
}

Table.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.array,
  save: PropTypes.func
}

export default Table
