/* eslint-env jest */
import { intersectionBy } from 'lodash'

import Column from './column'

const defaultColumns = [
  {Header: 'Name', accessor: 'name', minWidth: 50},
  {Header: 'Email', accessor: 'email'},
  {Header: 'Address', accessor: 'address', editable: true},
  {Header: 'Age', accessor: 'age', editable: true}
]

const column = Column(defaultColumns)

describe('column', () => {
  it('default', () => {
    expect(column.default()).toEqual(defaultColumns)
  })

  it('select by accessor', () => {
    const columns = [
      {accessor: 'name'},
      {accessor: 'address'}
    ]
    expect(column.build(columns)).toEqual(intersectionBy(defaultColumns, columns, 'accessor'))
  })

  it('accessor change to alias', () => {
    const columns = [
      {accessor: 'address', alias: 'addr'}
    ]
    expect(column.build(columns)).toEqual([
      {Header: 'Address', accessor: 'addr', alias: 'addr', editable: true}
    ])
  })
})
