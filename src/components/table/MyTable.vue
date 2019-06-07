<template>
  <div class="table-wrap">
    <table class="table">
      <thead class="thead">
        <tr>
          <th
            v-for="(item, name) in headObj"
            :key="name"
          >
            {{ headObj[name] }}
          </th>
        </tr>
      </thead>
      <table-body
        class="tbody"
        :head-obj="headObj"
        :table-data="tableData"
        :row-class="rowClassName"
        :row-key="rowKey"
        :column-key="columnKey"
      />
      <!-- <transition-group
        class="tbody-wrap tbody"
        name="tbody"
        tag="tbody"
      >
        <tr
          v-for="(item, idx) of tableData"
          :key="item[rowKey] || idx + (+new Date())"
          :class="rowClass"
        >
          <td
            v-for="(item2, name) in headObj"
            :key="item[columnKey] || name"
          >{{item[name]}}</td>
        </tr>
      </transition-group> -->
    </table>
  </div>
</template>

<script>
import TableBody from './table-body'

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
      type: [Function, String],
      default: ''
    },
    rowKey: {
      type: String,
      required: true
    },
    columnKey: {
      type: String,
      required: true
    }
  },
  components: {
    TableBody
  },
  data () {
    return {
      rowClass: []
    }
  },
  computed: {},
  created () {
  },
  mounted () {
  },
  watch: {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
// .table-wrap {
//   height: 100%;
//   font-size: 1rem;
//   overflow-y: scroll;
//   /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
//   &::-webkit-scrollbar {
//     width: 0.6rem; /*滚动条宽度*/
//     height: 0.6rem; /*滚动条高度*/
//   }

//   /*定义滚动条轨道 内阴影+圆角*/
//   &::-webkit-scrollbar-track {
//     box-shadow: inset 0 0 0.4rem rgba(0, 0, 0, 0.1);
//     border-radius: 0.4rem; /*滚动条的背景区域的圆角*/
//     background-color: rgba(26, 42, 98, 0.35); /*滚动条的背景颜色*/
//   }

//   /*定义滑块 内阴影+圆角*/
//   &::-webkit-scrollbar-thumb {
//     border-radius: 0.4rem; /*滚动条的圆角*/
//     box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
//     background-color: $dp-color; /*滚动条的背景颜色*/
//   }
// }
.table {
  @extend %table;
  margin-bottom: 0;
  width: 100%;

  .thead {
    background: rgba(26, 42, 98, 0.35);
    color: $dp-color;
    line-height: 0.8rem;
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
