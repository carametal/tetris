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
import Point from '@/types/Point'
import { makeTetriminoRandom } from '@/types/MinoMaker'
import ITetrimino from '@/types/ITetrimino'

const HEIGHT= 20
const WIDTH = 10
const getDefaultPoint = () => new Point(4, 0)

export default Vue.extend({
  data() {
    return {
      height: HEIGHT,
      width: WIDTH,
      tetriminos: [] as ITetrimino[],
      activeTetrimino: {} as ITetrimino | null,
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
      this.activeTetrimino = makeTetriminoRandom(getDefaultPoint(), WIDTH, HEIGHT)
    },
    hasBlock(x: number, y: number): boolean {
      return this.tetriminos.some(t => t.hasBlock(x, y))
    },
    getColor(x: number, y: number): string {
      const tetrimino = this.tetriminos.find(t => t.hasBlock(x, y) )
      if(tetrimino) {
        return tetrimino.color
      }
      if(this.activeTetrimino?.hasBlock(x, y)) {
        return this.activeTetrimino.color
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
        this.handleRotate()
      }
    },
    handleDown(): void {
      if(this.canActiveTetriminoMoveDown()) {
        this.activeTetrimino?.down()
      }
      if (!this.canActiveTetriminoMoveDown()) {
        this.switchNewTetrimino()
        this.deleteLineIfFilled()
      }
    },
    handleRotate(): void {
      this.activeTetrimino!.rotateRight()
      Array(this.height).fill(0).forEach((_, y) => {
        if(this.activeTetrimino!.hasBlock(-1, y)) {
          this.activeTetrimino!.right()
        }
        if(this.activeTetrimino!.hasBlock(this.width, y)) {
          this.activeTetrimino!.left()
        }
      })
    },
    deleteLineIfFilled(): void {
      Array(this.height).fill(0).forEach((_, y) => {
        const filledALine = Array(this.width).fill(0).every((_, x) => {
          return this.hasBlock(x, y)
        })
        if(filledALine) {
          this.tetriminos.forEach(t => t.deleteBlockIfExists(y))
          this.tetriminos.forEach(t => t.downIfNeeded(y))
        }
      })
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