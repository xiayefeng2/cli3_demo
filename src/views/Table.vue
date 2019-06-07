<template>
  <div class="table-wrap">
    <my-table
      :head-obj="headObj"
      :table-data="tableData"
      :row-class-name="rowClassName"
      :row-key="rowKey"
      :column-key="columnKey"
    />
  </div>
</template>

<script>
import MyTable from '@/components/table/MyTable'
export default {
  components: {
    MyTable
  },
  data () {
    return {
      headObj: {
        rank: '排名',
        province: '地区分布',
        count: '用户数',
        percent: '比例'
      },
      columnKey: '',
      rowKey: 'id',
      tableData: [
        {
          rank: 1,
          province: '广东省',
          count: 3622,
          percent: '50%',
          id: 'ddd'
        },
        {
          rank: 2,
          province: '广西省',
          count: 822,
          percent: '30%',
          id: 'ffdf'
        },
        {
          rank: 3,
          province: '浙江省',
          count: 622,
          percent: '13%',
          id: 'defg'
        },
        {
          rank: 4,
          province: '江西省',
          count: 180,
          percent: '9%',
          id: 'ddhg'
        },
        {
          rank: 5,
          province: '贵州省',
          count: 630,
          percent: '10%',
          id: 'dopd'
        }
      ]
    }
  },
  computed: {

  },
  created () {

  },
  mounted () {

  },
  watch: {

  },
  methods: {
    rowClassName ({ row, rowIndex }) {
      console.log(rowIndex)
      if (rowIndex % 2) {
        return 'heigh-line'
      } else {
        return ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
