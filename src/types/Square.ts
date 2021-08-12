import Block from "./Block"
import ITetrimino from "./ITetrimino"
import Point from "./Point"
import Tetrimino from "./Tetrimino"

export default class Square extends Tetrimino implements ITetrimino {
  constructor(p: Point, widthOfField: number, heightOfField: number) {
    const blocks: Block[] = [
      new Block(p),
      new Block(new Point(p.x + 1, p.y)),
      new Block(new Point(p.x, p.y + 1)),
      new Block(new Point(p.x + 1, p.y + 1)),
    ]
    super(blocks, widthOfField, heightOfField)
  }

  public rotateRight(): void {
    super.incrementTilt()
  }
}