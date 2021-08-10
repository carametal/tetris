import Block from "./Block"
import Point from "./Point"

export default class Tetrimino {
  widthOfField: number
  heightOfField: number
  blocks: Block []

  constructor(blocks: Block[], widthOfField: number, heightOfField: number) {
    this.widthOfField = widthOfField
    this.heightOfField = heightOfField
    this.blocks = blocks
  }

  public getCenter(): Point {
    return this.blocks[0].point
  }

  public hasBlock(x: number, y: number): boolean {
    return this.blocks.some(b => b.point.x === x && b.point.y === y)
  }

  public right(): void {
    const touchingOnWall = this.blocks.some(b => {
      return b.point.x >= this.widthOfField - 1
    })
    if (!touchingOnWall) {
      this.blocks = this.blocks.map(b => {
        b.point.x++
        return b
      })
    }
  }

  public down(): void {
    if (!this.touchingBotton()) {
      this.blocks = this.blocks.map(b => {
        b.point.y++
        return b
      })
    }
  }

  public left(): void {
    const touchingOnWall = this.blocks.some(b => {
      return b.point.x <= 0
    })
    if(!touchingOnWall) {
      this.blocks = this.blocks.map(b => {
        b.point.x--
        return b
      })
    }
  }

  public touchingBotton(): boolean {
    return this.blocks.some(b => {
      return b.point.y >= this.heightOfField - 1
    })
  }

}