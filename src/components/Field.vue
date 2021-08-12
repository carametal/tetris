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
import Tetrimino from '@/types/MinoO'
import MinoO from '@/types/MinoO'
import MinoS from '@/types/MinoS'
import MinoZ from '@/types/MinoZ'
import Point from '@/types/Point'

const HEIGHT= 20
const WIDTH = 10

export default Vue.extend({
  data() {
    return {
      height: HEIGHT,
      width: WIDTH,
      tetriminos: [] as Tetrimino[],
      activeTetrimino: {} as Tetrimino | null,
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
  mounted(): void {
    this.setAutoDown()
  },
  beforeDestroy(): void {
    this.removeEventListeners()
  },
  methods: {
    setAutoDown(): void {
      setInterval(() => {
        this.handleDown()
      }, 1000)
    },
    addTetrimino(): void {
      this.activeTetrimino = this.makeTetriminoRandom()
    },
    makeTetriminoRandom(): Tetrimino {
      const num: number = Math.floor(Math.random() * 3)
      if(num == 0) {
        return new MinoO(new Point(4, 0), WIDTH, HEIGHT) 
      } else if (num == 1) {
        return new MinoS(new Point(4, 0), WIDTH, HEIGHT) 
      } else if (num == 2) {
        return new MinoZ(new Point(4, 0), WIDTH, HEIGHT) 
      }
      return new MinoZ(new Point(4, 0), WIDTH, HEIGHT)
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
      window.addEventListener('keydown', this.handleKeyUpArrows)
    },
    removeEventListeners(): void {
      window.removeEventListener('keydown', this.handleKeyUpArrows)
    },
    handleKeyUpArrows(event: KeyboardEvent): void {
      if(event.code === 'ArrowLeft' && this.canActiveTetriminoMoveLeft()) {
        this.activeTetrimino?.left()
      }
      if(event.code === 'ArrowDown') { 
        this.handleDown()
      }
      if(event.code === 'ArrowRight' && this.canActiveTetriminoMoveRight()){ 
        this.activeTetrimino?.right()
      }
      if(event.code === 'Space') {
        this.activeTetrimino!.rotateRight()
      }
    },
    handleDown(): void {
      if(this.canActiveTetriminoMoveDown()) {
        this.activeTetrimino?.down()
      }
      if (!this.canActiveTetriminoMoveDown()) {
        this.switchNewTetrimino()
      }
    },
    switchNewTetrimino(): void {
      this.tetriminos.push(this.activeTetrimino!)
      this.activeTetrimino = null
    },
    canActiveTetriminoMoveRight(): boolean {
      return !this.activeTetrimino?.touchingWallRight()
        && !this.touchingOtherBlocksRight()
    },
    canActiveTetriminoMoveDown(): boolean {
      return !this.activeTetrimino!.touchingBottom()
        && !this.touchingOtherBlocksUnder()
    },
    canActiveTetriminoMoveLeft(): boolean {
      return !this.activeTetrimino?.touchingWallLeft()
        && !this.touchingOtherBlocksLeft()
    },
    touchingOtherBlocksRight(): boolean {
      return this.activeTetrimino!.blocks.some(b => {
        return this.hasBlock(b.point.x + 1, b.point.y)
      })
    },
    touchingOtherBlocksUnder(): boolean {
      return this.activeTetrimino!.blocks.some(b => {
        return this.hasBlock(b.point.x, b.point.y + 1)
      })
    },
    touchingOtherBlocksLeft(): boolean {
      return this.activeTetrimino!.blocks.some(b => {
        return this.hasBlock(b.point.x - 1, b.point.y)
      })
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