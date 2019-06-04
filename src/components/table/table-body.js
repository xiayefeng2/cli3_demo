export default {
  name: 'MyTableBody',

  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    headObj: {
      type: Object,
      default: () => ({})
    },
    rowClass: {
      type: [Function, String]
    },
    rowKey: {
      type: String
    },
    columnKey: {
      type: String
    }
  },
  render (h) {
    const data = this.tableData
    return (<tbody>
      {
        data.reduce((acc, row) => {
          return acc.concat(this.rowRender(row, acc.length))
        }, [])
      }
    </tbody>)
  },
  methods: {
    getKeyOfRow (row, index) {
      const rowKey = this.rowKey
      if (rowKey) {
        return this.getRowIdentity(row, rowKey)
      }
      return index
    },
    getKeyOfColumn (row, column) {
      const columnKey = this.columnKey
      if (!row) throw new Error('row is required when get row identity')
      if (columnKey) {
        return row[columnKey]
      }
      return column
    },
    rowRender (row, $index) {
      const columns = Object.keys(this.headObj)
      const rowClass = this.getRowClass(row, $index)
      return (<tr
        class={rowClass}
        key={this.getKeyOfRow(row, $index)}
      >
        {
          columns.map((column, cellIndx) => {
            return (<td
              key={this.getKeyOfColumn(row, column)}
            >
              {
                row[column]
              }
            </td>)
          })
        }
      </tr>)
    },
    getRowClass (row, rowIndex) {
      const arr = ['table_row']
      const rowClassName = this.rowClass
      console.log(row, rowIndex)
      if (typeof rowClassName === 'string') {
        arr.push(rowClassName)
      } else if (typeof rowClassName === 'function') {
        arr.push(rowClassName({ row, rowIndex }))
      }
      console.log(arr)
      return arr
    },
    getRowIdentity (row, rowKey) {
      if (!row) throw new Error('row is required when get row identity')
      if (typeof rowKey === 'string') {
        if (rowKey.indexOf('.') < 0) {
          return row[rowKey]
        }
        let key = rowKey.split('.')
        let current = row
        for (let i = 0; i < key.length; i++) {
          current = current[key[i]]
        }
        return current
      } else if (typeof rowKey === 'function') {
        return rowKey(row)
      }
    }
  }
}
