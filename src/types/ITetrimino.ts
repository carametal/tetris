import Block from "./Block";
import Point from "./Point"

export type Tilt = 0 | 1 | 2 | 3

export type Color = 'yellow' | 'green' | 'red' | 'aqua' | 'orange' | 'blue' | 'purple'

export default interface ITetrimino {
  color: Color

  blocks: Block[]
  tilt: Tilt 
  shape: boolean[][]

  hasBlock(x: number, y: number): boolean
  getCenter(): Point
  right(): void
  down(): void
  left(): void
  rotateRight(): void
  deleteBlockIfExists(y: number): void
  downIfNeeded(y: number): void
  touchingWallRight(): boolean
  touchingBottom(): boolean
  touchingWallLeft(): boolean
}