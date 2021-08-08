<template>
<div class="wrapper">
  <table>
    <tbody>
      <tr v-for="(_ ,i) in height" :key="i">
        <td
          v-for="(_, j) in width"
          :key="j"
        ></td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script lang="ts">
import Vue from 'vue'

interface Block {
  x: number
  y: number
}

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
    }
  },
  methods: {
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