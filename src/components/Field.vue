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

class Point {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

class Block {
  point: Point

  constructor(point: Point) {
    this.point = point
  }
}

interface ITetrimino {
  blocks: Block[]
}

class Tetrimino {
  blocks: Block []

  constructor(blocks: Block[]) {
    this.blocks = blocks
  }

  public getCenter(): Point {
    return this.blocks[0].point
  }

  public hasBlock(x: number, y: number): boolean {
    return this.blocks.some(b => b.point.x === x && b.point.y === y)
  }

  public right(): void {
    this.blocks = this.blocks.map(b => {
      b.point.x++
      return b
    })
  }

  public down(): void {
    this.blocks = this.blocks.map(b => {
      b.point.y++
      return b
    })
  }

  public left(): void {
    this.blocks = this.blocks.map(b => {
      b.point.x--
      return b
    })
  }

}

class Square extends Tetrimino implements ITetrimino {
  constructor(p: Point) {
    const blocks: Block[] = [
      new Block(p),
      new Block(new Point(p.x + 1, p.y)),
      new Block(new Point(p.x, p.y + 1)),
      new Block(new Point(p.x + 1, p.y + 1)),
    ]
    super(blocks)
  }
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
      activeTetrimino: {} as Tetrimino
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
      const tetrimino: Tetrimino = new Square(new Point(5, 0)) 
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
      if(event.code === 'ArrowLeft') {
        this.activeTetrimino.left()
      }
      if(event.code === 'ArrowDown') { 
        this.activeTetrimino.down()
      }
      if(event.code === 'ArrowRight'){ 
        this.activeTetrimino.right()
      }
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