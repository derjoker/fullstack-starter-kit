## Editable

```jsx
<Editable content={'Editable'} />
```

## Basic Table

```jsx
require('react-table/react-table.css')

const columns = [
  {Header: 'Name', accessor: 'name', minWidth: 50},
  {Header: 'Email', accessor: 'email'},
  {Header: 'Address', accessor: 'address', editable: true},
  {Header: 'Age', accessor: 'age', editable: true}
]

const data = [
  {name: 'name', email: 'email', address: 'address', age: 7},
  {name: 'name', email: 'email', address: 'address'}
]

;

<Table loading={false} columns={columns} data={data} />
```
