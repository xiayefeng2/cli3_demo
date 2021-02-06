<template>
  <div class="table-wrap">
    <table class="table" :id="tableId">
      <thead class="thead">
        <tr>
          <th
            v-for="(item, name) in headObj"
            :key="name"
          >{{(headObj[name] &&typeof headObj[name] === 'object') ? headObj[name].key : headObj[name]}}</th>
        </tr>
      </thead>
      <table-body
        :head-obj="headObj"
        :table-data="tableData"
        :row-class="rowClassName"
        :row-key="rowKey"
        :col-type="colType"
        :column-key="columnKey"
        :user-defined="userDefined"
      />
    </table>
  </div>
</template>

<script>
import TableBody from './table-body.jsx'

export default {
  props: {
    headObj: {
      type: Object,
      required: true
    },
    tableData: {
      type: Array,
      default: () => []
    },
    rowClassName: {
      type: [Function, String]
    },
    rowKey: {
      type: String
    },
    columnKey: {
      type: String
    },
    tableId: {
      type: String,
      default: ''
    },
    colType: { // {key: val | val:{ s: Text, d: Date, n: Number, b: Boolean, e: Error, z: stub } }
      type: Object
    },
    userDefined: Object
  },
  components: {
    TableBody
  },
  data () {
    return {
      rowClass: []
    }
  }
}
</script>

<style scoped lang="scss">
.table {
  @extend %table;
  margin-bottom: 0;
  width: 100%;

  .thead {
    background: rgba(26, 42, 98, 0.35);
    color: $dp-color;
    line-height: 2.5rem;
  }
  .tbody {
    color: #fff;

    tr td {
      text-align: center;
    }
    .line {
      line-height: 2.4rem;
    }
    /deep/ .heigh-line {
      background: rgba(26, 42, 98, 0.35);
    }
  }
}
</style>