import Block from "./Block";

export type Tilt = 0 | 1 | 2 | 3

export default interface ITetrimino {
  blocks: Block[]
  tilt: Tilt 

  hasBlock(x: number, y: number): boolean
  right(): void
  down(): void
  left(): void
  rotateRight(): void
}