import Sprite from '../base/sprite'
import DataBus from '../databus'

let databus = new DataBus()


const TRASH_IMG_SRC_BROWN = 'img/t_brown.png'
const TRASH_SIZE = 130

const screenWidth = window.innerWidth * 0.15
const screenHeight = window.innerHeight *0.15

const my_y = window.innerHeight * 0.8


export default class Trash_brown extends Sprite {

  constructor(ctx) {
    super(TRASH_IMG_SRC_BROWN, screenWidth, screenHeight,0,my_y)
    this.render(ctx)
  }

  render(ctx) {
    let tl = 0;
    if (databus.brown_level >= 7) {
      tl = 6
    } else {
      tl = databus.brown_level - 1
    }

    ctx.drawImage(
      this.img,
      tl*130,
      0,
      TRASH_SIZE,
      TRASH_SIZE, 
      0, 
      my_y, 
      screenWidth, 
      screenHeight
    )
    
    ctx.fillStyle = "#000000"
    ctx.font = "18x Arial"

    ctx.fillText(
      '湿垃圾',
      20,
      my_y + screenHeight+18
    )

  }

}
