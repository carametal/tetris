<template>
<div class="outer-wrapper">
  <header>
    <h1>Tetris</h1>
  </header>
  <div class="wrapper">
    <div class="main">
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
    <div class="sub">
      <div>
        <button @click="togglePause">Pause</button>
      </div>
      <next-tetrimino v-model="nextTetrimino" />
      <point-counter v-model="point" />
    </div>
    <div v-show="lost" class="overlay">
      <h1 class="lost">You are Lost.</h1>
      <button class="lost" @click="start">Retry</button>
    </div>
    <div v-show="pause" class="overlay">
      <h1 class="lost">pause</h1>
      <button class="lost" @click="togglePause">Restart</button>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Point from '@/types/Point'
import { makeTetriminoRandom } from '@/types/MinoMaker'
import ITetrimino from '@/types/ITetrimino'
import NextTetrimino from './NextTetrimino.vue'
import PointCounter from './PointCounter.vue'

const HEIGHT= 20
const WIDTH = 10
const DEFAULT_INTERVAL_KEY = -1
const getDefaultPoint = () => new Point(4, 0)

export default Vue.extend({
  components: { NextTetrimino, PointCounter },
  data() {
    return {
      height: HEIGHT,
      width: WIDTH,
      tetriminos: [] as ITetrimino[],
      nextTetrimino: makeTetriminoRandom(getDefaultPoint(), WIDTH, HEIGHT),
      activeTetrimino: makeTetriminoRandom(getDefaultPoint(), WIDTH, HEIGHT),
      intervalKey: DEFAULT_INTERVAL_KEY,
      lost: false,
      pause: false,
      point: 0,
    }
  },
  mounted(): void {
    this.start()
  },
  beforeDestroy(): void {
    this.removeEventListeners()
  },
  methods: {
    start(): void {
      this.addEventListeners()
      this.clearTetrimino()
      this.lost = false
      this.addTetrimino()
      this.setAutoDown()
    },
    togglePause(): void {
      this.pause = !this.pause
    },
    clearTetrimino(): void {
      this.tetriminos = []
    },
    setAutoDown(): void {
      this.intervalKey = setInterval(() => {
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
      if(this.activeTetrimino.hasBlock(x, y)) {
        return this.activeTetrimino.color
      }
      if(y === 0) {
        return 'lightgray'
      }
      return 'darkgray'
    },
    addEventListeners(): void {
      window.addEventListener('keydown', this.handleKeyUpArrows)
    },
    removeEventListeners(): void {
      window.removeEventListener('keydown', this.handleKeyUpArrows)
    },
    handleKeyUpArrows(event: KeyboardEvent): void {
      if(event.code === 'ArrowLeft' && this.canActiveTetriminoMoveLeft()) {
        this.activeTetrimino.left()
      }
      if(event.code === 'ArrowDown') { 
        this.handleDown()
      }
      if(event.code === 'ArrowRight' && this.canActiveTetriminoMoveRight()){ 
        this.activeTetrimino.right()
      }
      if(event.code === 'Space') {
        this.handleRotate()
      }
      if(event.code === 'Enter') {
        this.handleDownToBotttom()
      }
    },
    handleDown(): void {
      if(this.pause) return
      if(this.canActiveTetriminoMoveDown()) {
        this.activeTetrimino.down()
      }
      if (!this.canActiveTetriminoMoveDown()) {
        this.switchNewTetrimino()
        this.deleteLineIfFilled()
        this.finishGameIfLost()
      }
    },
    handleRotate(): void {
      this.activeTetrimino.rotateRight()
      Array(this.height).fill(0).forEach((_, y) => {
        if(this.activeTetrimino.hasBlock(-1, y)) {
          this.activeTetrimino.right()
        }
        if(this.activeTetrimino.hasBlock(this.width, y)) {
          this.activeTetrimino.left()
        }
      })
    },
    handleDownToBotttom(): void {
      while(this.activeTetrimino.getCenter().y > 0) {
        this.handleDown()
      }
    },
    deleteLineIfFilled(): void {
      Array(this.height).fill(0).forEach((_, y) => {
        const filledALine = Array(this.width).fill(0).every((_, x) => {
          return this.hasBlock(x, y)
        })
        if(filledALine) {
          this.tetriminos.forEach(t => t.deleteBlockIfExists(y))
          this.tetriminos.forEach(t => t.downIfNeeded(y))
          this.point++
        }
      })
    },
    finishGameIfLost(): void {
      const lost = Array(this.width).fill(0).some((_, x) => this.hasBlock(x, 0))
      if(lost) {
        clearInterval(this.intervalKey)
        this.intervalKey = DEFAULT_INTERVAL_KEY
        this.removeEventListeners()
        this.lost = true
        return
      }
    },
    switchNewTetrimino(): void {
      const tetrimino = this.activeTetrimino
      this.activeTetrimino = this.nextTetrimino
      this.nextTetrimino = makeTetriminoRandom(getDefaultPoint(), WIDTH, HEIGHT)
      this.tetriminos.push(tetrimino)
    },
    canActiveTetriminoMoveRight(): boolean {
      return !this.activeTetrimino.touchingWallRight()
        && !this.touchingOtherBlocksRight()
    },
    canActiveTetriminoMoveDown(): boolean {
      return !this.activeTetrimino.touchingBottom()
        && !this.touchingOtherBlocksUnder()
    },
    canActiveTetriminoMoveLeft(): boolean {
      return !this.activeTetrimino.touchingWallLeft()
        && !this.touchingOtherBlocksLeft()
    },
    touchingOtherBlocksRight(): boolean {
      return this.activeTetrimino.blocks.some(b => {
        return this.hasBlock(b.point.x + 1, b.point.y)
      })
    },
    touchingOtherBlocksUnder(): boolean {
      return this.activeTetrimino.blocks.some(b => {
        return this.hasBlock(b.point.x, b.point.y + 1)
      })
    },
    touchingOtherBlocksLeft(): boolean {
      return this.activeTetrimino.blocks.some(b => {
        return this.hasBlock(b.point.x - 1, b.point.y)
      })
    },
  },
})
</script>

<style scoped>
div.outer-wrapper {
  max-width: 500px;
  margin: 0 auto;
}

div.wrapper {
  display: flex;
  width: 100%;
}

div.main {
  flex-grow: 1;
  max-width: 400px;
}

div.sub {
  flex-grow: 1;
  max-width: 100px;
}

table {
  margin: 0 auto;
  border-collapse: collapse;
}

td {
  width: 30px;
  height: 30px;
  border: solid 1px;
}

.overlay {
  background: rgba(100, 100, 100, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

h1.lost,
button.lost {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

button.lost {
  top: 60%;
  width: 100px;
  height: 45px;
  background-color: silver;
}
</style>