<template>
<div class="wrapper">
  <table>
    <tbody>
      <tr v-for="(_ ,y) in height" :key="y">
        <td
          v-for="(_, x) in width"
          :key="x"
          :style="{ 'background-color': getColor(x, y)}"
        ></td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Tetrimino from '@/types/Square'
import Square from '@/types/Square'
import Point from '@/types/Point'

const HEIGHT= 20
const WIDTH = 10

export default Vue.extend({
  data() {
    return {
      height: HEIGHT as number,
      width: WIDTH as number,
      tetriminos: [] as Tetrimino[],
      activeTetrimino: {} as Tetrimino | null
    }
  },
  watch: {
    activeTetrimino(): void {
      if(this.activeTetrimino == null) {
        this.addTetrimino()
      }
    }
  },
  created(): void {
    this.addTetrimino()
    this.addEventListeners()
  },
  beforeDestroy(): void {
    this.removeEventListeners()
  },
  methods: {
    addTetrimino(): void {
      const tetrimino: Tetrimino = new Square(new Point(4, 0), WIDTH, HEIGHT) 
      this.activeTetrimino = tetrimino
    },
    hasBlock(x: number, y: number): boolean {
      return this.tetriminos.some(t => t.hasBlock(x, y))
    },
    getColor(x: number, y: number): string {
      if (this.hasBlock(x, y)) {
        return 'black'
      } else if (this.activeTetrimino != null && this.activeTetrimino.hasBlock(x, y)) {
        return 'gray'
      }
      return 'white'
    },
    addEventListeners(): void {
      window.addEventListener('keyup', this.handleKeyUpArrows)
    },
    removeEventListeners(): void {
      window.removeEventListener('keyup', this.handleKeyUpArrows)
    },
    handleKeyUpArrows(event: KeyboardEvent): void {
      if(event.code === 'ArrowRight' && this.canActiveTetriminoMoveRight()){ 
        this.activeTetrimino?.right()
      }
      if(event.code === 'ArrowDown') { 
        this.activeTetrimino?.down()
        if (this.activeTetrimino && !this.canActiveTetriminoMoveDown()) {
          this.tetriminos.push(this.activeTetrimino)
          this.activeTetrimino = null
        }
      }
      if(event.code === 'ArrowLeft' && this.canActiveTetriminoMoveLeft()) {
        this.activeTetrimino?.left()
      }
    },
    canActiveTetriminoMoveRight(): boolean {
      return !this.activeTetrimino?.touchingWallRight()
    },
    canActiveTetriminoMoveDown(): boolean {
      return !this.activeTetrimino!.touchingBottom()
    },
    canActiveTetriminoMoveLeft(): boolean {
      return !this.activeTetrimino?.touchingWallLeft()
    },
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