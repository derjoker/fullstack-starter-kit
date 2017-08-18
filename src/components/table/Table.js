import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import { omit, omitBy, isNil } from 'lodash'

import Editable from './Editable'

class Table extends Component {
  constructor (props) {
    super(props)
    this.save = this.save.bind(this)
    this.renderEditable = this.renderEditable.bind(this)
    this.renderSelectable = this.renderSelectable.bind(this)
    this.columns = this.props.columns.map(column => {
      if (column.options) {
        return {
          ...column,
          Cell: this.renderSelectable(column.options)
        }
      } else if (column.editable) {
        return {
          ...column,
          Cell: this.renderEditable
        }
      } else return column
    })
  }

  save (cell) {
    const { data, save } = this.props
    return value => {
      console.log(data[cell.index])
      // remove nil first
      const previous = omitBy(
        omit(data[cell.index], '__typename'),
        isNil
      )
      const current = {...previous}
      // new value can be nil
      current[cell.column.id] = value
      console.table([previous, current])
      console.log(data[cell.index])
      save && save(current)
    }
  }

  renderEditable (cell) {
    // const { data } = this.props
    // const content = data[cell.index][cell.column.id]
    return (
      <Editable
        key={cell.index}
        content={cell.value}
        save={this.save(cell)}
      />
    )
  }

  renderSelectable (options) {
    const save = this.save
    return cell => {
      function change (e) {
        const value = e.target.value === '-' ? null : e.target.value
        save(cell)(value)
      }
      return (
        <select
          key={cell.index}
          defaultValue={cell.value || undefined}
          onChange={change} >
          {['-'].concat(options).map((option, index) => <option key={index}>{option}</option>)}
        </select>
      )
    }
  }

  render () {
    const { loading, data } = this.props
    const columns = this.columns
    return (
      <div>
        <ReactTable
          loading={loading}
          columns={columns}
          data={data}
          filterable
          defaultFilterMethod={(filter, row) => (new RegExp(filter.value)).test(row[filter.id])}
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

Table.defaultProps = {
  loading: false,
  data: []
}

export default Table
