import Block from "./Block"
import ITetrimino, { Color } from "./ITetrimino"
import Point from "./Point"
import Tetrimino from "./Tetrimino"

export default class MinoL extends Tetrimino implements ITetrimino {
  color: Color

  constructor(p: Point, widthOfField: number, heightOfField: number) {
    const blocks: Block[] = [
      new Block(p),
      new Block(new Point(p.x, p.y - 1)),
      new Block(new Point(p.x, p.y + 1)),
      new Block(new Point(p.x + 1, p.y + 1)),
    ]
    super(blocks, widthOfField, heightOfField)
    this.color = 'orange'
  }

  public rotateRight(): void {
    const p = this.getCenter()
    if (this.tilt === 0) {
      this.blocks = [
        new Block(p),
        new Block(new Point(p.x + 1, p.y)),
        new Block(new Point(p.x - 1, p.y)),
        new Block(new Point(p.x - 1, p.y + 1)),
      ]
    } else if (this.tilt === 1) {
      this.blocks = [
        new Block(p),
        new Block(new Point(p.x - 1, p.y - 1)),
        new Block(new Point(p.x, p.y - 1)),
        new Block(new Point(p.x, p.y - 1)),
      ]
    } else if (this.tilt === 2) {
      this.blocks = [
        new Block(p),
        new Block(new Point(p.x - 1, p.y)),
        new Block(new Point(p.x + 1, p.y)),
        new Block(new Point(p.x + 1, p.y - 1)),
      ]
    } else if (this.tilt == 3) {
      this.blocks = [
        new Block(p),
        new Block(new Point(p.x, p.y - 1)),
        new Block(new Point(p.x, p.y + 1)),
        new Block(new Point(p.x + 1, p.y + 1)),
      ]
    }
    this.incrementTilt()
  }
}