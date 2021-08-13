import Block from "./Block";

export type Tilt = 0 | 1 | 2 | 3

export type Color = 'yellow' | 'green' | 'red' | 'aqua'

export default interface ITetrimino {
  color: Color

  blocks: Block[]
  tilt: Tilt 

  hasBlock(x: number, y: number): boolean
  right(): void
  down(): void
  left(): void
  rotateRight(): void
}