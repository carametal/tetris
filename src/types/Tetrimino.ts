import Block from "./Block"
import { Tilt } from "./ITetrimino"
import Point from "./Point"

export default class Tetrimino {
  widthOfField: number
  heightOfField: number

  tilt: Tilt
  blocks: Block []

  constructor(blocks: Block[], widthOfField: number, heightOfField: number) {
    this.widthOfField = widthOfField
    this.heightOfField = heightOfField
    this.blocks = blocks
    this.tilt = 0
  }

  public hasBlock(x: number, y: number): boolean {
    return this.blocks.some(b => b.point.x === x && b.point.y === y)
  }

  public getCenter(): Point {
    return this.blocks[0].point
  }

  public deleteBlockIfExists(y: number): void {
    this.blocks = this.blocks.filter(b =>  b.point.y !== y)
  }

  // y以下のブロックを一段下げる
  public downIfNeeded(y: number): void {
    this.blocks.forEach(b => {
      if (b.point.y <= y) {
        b.point.y++
      }
    })
  }

  protected incrementTilt(): void {
    if(this.tilt >= 3) {
      this.tilt = 0
      return
    }
    this.tilt++
  }

  public right(): void {
    this.blocks = this.blocks.map(b => {
      b.point.x++
      return b
    })
  }

  public touchingWallRight(): boolean {
    return this.blocks.some(b => {
      return b.point.x >= this.widthOfField - 1
    })
  }

  public down(): void {
    if (!this.touchingBottom()) {
      this.blocks = this.blocks.map(b => {
        b.point.y++
        return b
      })
    }
  }

  public touchingBottom(): boolean {
    return this.blocks.some(b => {
      return b.point.y >= this.heightOfField - 1
    })
  }

  public left(): void {
    this.blocks = this.blocks.map(b => {
      b.point.x--
      return b
    })
  }

  public touchingWallLeft(): boolean {
    return this.blocks.some(b => {
      return b.point.x <= 0
    })
  }
}