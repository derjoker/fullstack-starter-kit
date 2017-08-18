import { find } from 'lodash'

/*
 * basic or default columns
 * @param: [Column]
 */
export default function Column (defaultColumns) {
  function _build (column) {
    const { accessor, alias } = column
    const _column = find(defaultColumns, {accessor})
    return {
      ..._column,
      ...column,
      accessor: alias || accessor
    }
  }

  return {
    default: () => defaultColumns,
    build: columns => columns.map(_build)
  }
}
