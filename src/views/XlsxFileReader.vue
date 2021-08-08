<template>
  <div>
    <input
      type="file"
      accept=".xls,.xlsx"
      @change="fileChange"
    >
  </div>
</template>

<script>
import xlsx from 'xlsx'
import { dateFormat } from '@/utils'
export default {
  data () {
    return {}
  },
  created () {},
  methods: {
    fileChange (e) {
      var file, files
      files = e.target.files
      if (!files || files.length === 0) return

      file = files[0]
      var reader = new FileReader()
      reader.onload = function (e) {
        // var binary = ''
        var bytes = new Uint8Array(e.target.result)
        /* var length = bytes.byteLength
        for (let i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i])
        }
        var wb = xlsx.read(binary, { type: 'binary' })
        var wsname = wb.SheetNames[0]
        var ws = wb.Sheets[wsname]
        var json = xlsx.utils.sheet_to_json(ws)
        console.log(json) */
        var wb = xlsx.read(bytes, { type: 'array', cellDates: true })
        var wsname = wb.SheetNames[0]
        var ws = wb.Sheets[wsname]
        var json = xlsx.utils.sheet_to_json(ws)
        console.log(json)
        const date = json[0].日期
        // console.log(dateFormat({ date: addDays(date) }))
        console.log(dateFormat({ date: new Date(date.getTime() + 43 * 1000) }))
      }
      reader.readAsArrayBuffer(file)
    },
    handle_fr (e) {
      var files = e.target.files
      var f = files[0]
      var reader = new FileReader()
      var rABS = !!reader.readAsBinaryString
      reader.onload = e => {
        var data = e.target.result
        if (!rABS) data = new Uint8Array(data)
        var wb = xlsx.read(data, { type: rABS ? 'binary' : 'array' })
        this.process_wb(wb)
      }
      if (rABS) reader.readAsBinaryString(f)
      else reader.readAsArrayBuffer(f)
    },
    process_wb (wb) {
      console.log(this.to_json(wb))
    },
    to_json (workbook) {
      var result = {}
      workbook.SheetNames.forEach(function (sheetName) {
        var roa = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {
          header: 1
        })
        if (roa.length) result[sheetName] = roa
      })
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
