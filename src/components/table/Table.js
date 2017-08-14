import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import { omit } from 'lodash'

import Editable from './Editable'

class Table extends Component {
  constructor (props) {
    super(props)
    this.renderEditable = this.renderEditable.bind(this)
    this.columns = this.props.columns.map(column => {
      if (column.editable) {
        return {
          ...column,
          Cell: this.renderEditable
        }
      } else return column
    })
  }

  renderEditable (cell) {
    const { data, save } = this.props
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

  render () {
    const { loading = false, data = [] } = this.props
    const columns = this.columns
    return (
      <div>
        <ReactTable
          loading={loading}
          data={data}
          columns={columns}
          pageSize={data.length}
          showPagination={false}
          style={{textAlign: 'center'}}
          className='-striped -highlight' />
      </div>
    )
  }
}

Table.propTypes = {
  loading: PropTypes.bool,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array,
  save: PropTypes.func
}

export default Table
