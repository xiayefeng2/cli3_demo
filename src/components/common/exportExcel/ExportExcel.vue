<template>
  <div class="export-excel-wrap" hidden>
    <v-table
      :head-obj="headObj"
      :table-data="tableData"
      :table-id="tableId"
      :col-type="colType"
    />
  </div>
</template>

<script>
  import XLSX from 'xlsx'
  const VTable = () => import('@/components/common/table/MyTable.vue')

  export default {
    props: {
      tableData: { // 表格数据
        type: Array,
        default: () => []
      },
      tableId: {
        type: String,
        default: 'export-excel'
      },
      bookName: { // 导出的表格名称
        type: String,
        default: 'book1'
      },
      headObj: { // 表头
        type: Object,
        default: () => ({})
      },
      exportObj: Object, // 开始导出表格控制
      colType: Object
    },
    components: {
      VTable
    },
    watch: {
      exportObj (obj) {
        if (obj.isExporting) {
          this.exportExcel()
        }
      }
    },
    methods: {
      exportExcel () {
      /* var worksheet = XLSX.utils.aoa_to_sheet(obj)
      var newWorkbook = XLSX.utils.book_new() */
        let table = document.getElementById(this.tableId)
        let wb = XLSX.utils.table_to_book(table)
        // XLSX.utils.book_append_sheet(newWorkbook, worksheet, 'SheetJS')
        XLSX.writeFile(wb, this.bookName + '.xlsx')
        this.$emit('change-state')
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>