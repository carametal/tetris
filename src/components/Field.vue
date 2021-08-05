<template>
<div class="wrapper">
  <table>
    <tbody>
      <tr v-for="(row,i ) in field" :key="i">
        <td v-for="(col, j) in row" :key="j"></td>
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
      this.field = Array(this.width).fill(Array(this.width).fill(false))
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