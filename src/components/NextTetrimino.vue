<template>
<div>
  <h3>Next</h3>
  <table class="next">
    <tr v-for="(_, y) in Array(height).fill(0)" :key="y">
      <td
        v-for="(_, x) in Array(width).fill(0)"
        :key="x"
        class="next"
        :style="styles[x][y]"
      ></td>
    </tr>
  </table>
</div>
  
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import ITetrimino from '@/types/ITetrimino'

type Style = {
  [k: string]: string | undefined
}

export default Vue.extend({
  props: {
    value: {
      type: Object as PropType<ITetrimino>,
      required: true,
    }
  },
  computed: {
    styles(): Style[][] {
      return Array(this.width).fill(0).map((_, x) => {
        return Array(this.height).fill(0).map((_, y) => {
          if(this.value.shape[x][y]) {
            return {
              'background-color': this.value.color,
              'border': 'solid 1px' 
            }
          } 
          return {}
        })
      })
    }
  },
  data() {
    return {
      width: 3,
      height: 4,
    }
  }
})
</script>

<style scoped>

table.next {
  margin: 0 auto;
  border-collapse: collapse;
}

td.next {
  width: 30px;
  height: 30px;
}
</style>