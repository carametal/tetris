<template>
<div class="wrapper">
  <table>
    <tbody>
      <tr
        v-for="(_, i) in Array(height).fill(0)"
        :key="i"
      >
        <td
          v-for="(_, j) in Array(width).fill(0)"
          :key="j"
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