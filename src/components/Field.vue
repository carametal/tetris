<template>
<div class="wrapper">
  <table>
    <tbody>
      <tr v-for="(_ ,x) in height" :key="x">
        <td
          v-for="(_, y) in width"
          :key="y"
          :style="{ 'background-color': getColor(x, y)}"
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

interface Tetrimino {
  blocks: Block[]
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
      tetriminos: [] as Tetrimino[],
    }
  },
  created(): void {
    this.addTetrimino()
  },
  methods: {
    addTetrimino(): void {
      const blocks: Block[] = [
        { x: 0, y: 5 },
        { x: 0, y: 6 },
        { x: 1, y: 5 },
        { x: 1, y: 6 },
      ]
      const tetrimino = { blocks: blocks } as Tetrimino
      this.tetriminos.push(tetrimino)
      console.log(this.tetriminos)
    },
    hasBlock(x: number, y: number): boolean {
      const ret = this.tetriminos.some(t => {
        return t.blocks.some(b => b.x === x && b.y === y)
      })
      console.log(x, y, ret)
      return ret
    },
    getColor(x: number, y: number): string {
      if (this.hasBlock(x, y)) {
        return 'black'
      }
      return 'white'
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