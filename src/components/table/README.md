## Editable

```jsx
<Editable content={'Editable'} />
```

* empty string

```jsx
<Editable content={''} />
```

* `undefined`

```jsx
<Editable content={undefined} />
```

* `null`

```jsx
<Editable content={null} />
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

<Table columns={columns} data={data} />
```
