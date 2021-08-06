<template>
<div class="wrapper">
  <table>
    <tbody>
      <tr v-for="(row,i ) in field" :key="i">
        <td
          v-for="(col, j) in row"
          :key="j"
          :style="{'background-color': col ? 'black': ''}"
          @click="click(i, j)"
        ></td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    height: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      field: [] as boolean[][]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const field: boolean[][] = []
      for (let i=0; i<this.height; i++) {
        const row: boolean[] = []
        for (let j=0; j<this.width; j++) {
          row.push(false)
        }
        field.push(row)
      }
      this.field = field
    },
    click(i: number, j: number): void {
      const copy = JSON.parse(JSON.stringify(this.field))
      copy[i][j] = !copy[i][j]
      this.field = copy
    }
  },
})
</script>

<style scoped>
table {
  margin: 0 auto;
  border-collapse: collapse;
}
td {
  width: 30px;
  height: 30px;
  border: solid 1px;
}
</style>