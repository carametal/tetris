import ITetrimino from "./ITetrimino"
import MinoI from "./MinoI"
import MinoJ from "./MinoJ"
import MinoL from "./MinoL"
import MinoO from "./MinoO"
import MinoS from "./MinoS"
import MinoT from "./MinoT"
import MinoZ from "./MinoZ"
import Point from "./Point"

export function makeTetriminoRandom(point: Point, width: number, height: number): ITetrimino {
  const num: number = Math.floor(Math.random() * 7)
  if(num === 0) {
    return new MinoO(point, width, height) 
  } else if (num === 1) {
    return new MinoS(point, width, height) 
  } else if (num === 2) {
    return new MinoZ(point, width, height) 
  } else if (num === 3) {
    return new MinoI(point, width, height) 
  } else if (num === 4) {
    return new MinoL(point, width, height) 
  } else if (num === 5) {
    return new MinoJ(point, width, height) 
  } else if (num === 6) {
    return new MinoT(point, width, height) 
  }
  throw new Error('Not implemented.')
}