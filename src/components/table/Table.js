import React from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import { omit } from 'lodash'

const Table = ({ loading, data = [], save }) => {
  const renderEditable = cellInfo => {
    return (
      <div
        style={{ backgroundColor: '#fafafa' }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const prev = omit(data[cellInfo.index], '__typename')
          const record = {...prev}
          record[cellInfo.column.id] = e.target.innerText
          console.table([prev, record])
          save && save(record)
        }}
        dangerouslySetInnerHTML={{
          __html: data[cellInfo.index][cellInfo.column.id]
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
