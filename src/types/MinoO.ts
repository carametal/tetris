import Block from "./Block"
import ITetrimino, { Color } from "./ITetrimino"
import Point from "./Point"
import Tetrimino from "./Tetrimino"

export default class MinoO extends Tetrimino implements ITetrimino {
  color: Color
  shape: boolean[][]

  constructor(p: Point, widthOfField: number, heightOfField: number) {
    const blocks: Block[] = [
      new Block(p),
      new Block(new Point(p.x + 1, p.y)),
      new Block(new Point(p.x, p.y + 1)),
      new Block(new Point(p.x + 1, p.y + 1)),
    ]
    super(blocks, widthOfField, heightOfField)
    this.color = 'yellow'
    this.shape = [
      [true, true, false, false],
      [true, true, false, false],
      [false, false, false, false],
    ]
  }

  public rotateRight(): void {
    super.incrementTilt()
  }
}