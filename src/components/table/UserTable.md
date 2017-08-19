* default columns

```jsx
const data = [
  {name: 'name', email: 'email', age: 7},
  {name: 'name', email: 'email', address: 'address'}
]

;

<UserTable data={data} />
```

* Wrap Cell (Address)

```jsx
const { column } = require('./UserTable')

class AddressCell extends React.Component {
  render () {
    const { cell, children } = this.props
    return (
      <div style={{backgroundColor: cell.value ? null : 'yellow'}}>{children}</div>
    )
  }
}

const data = [
  {name: 'name', email: 'email', age: 7},
  {name: 'name', email: 'email', address: 'address'}
]

const columns = column.build([
  {accessor: 'name'},
  {accessor: 'email'},
  {accessor: 'address', editable: true, wrap: AddressCell},
  {accessor: 'age'}
])

;

<UserTable columns={columns} data={data} />
```
