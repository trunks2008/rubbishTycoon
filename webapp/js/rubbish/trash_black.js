import Sprite from '../base/sprite'
import DataBus from '../databus'

let databus = new DataBus()

const TRASH_IMG_SRC_BLACK = 'img/t_black.png'
const TRASH_SIZE = 130

const screenWidth = window.innerWidth * 0.15
const screenHeight = window.innerHeight * 0.15

export default class Trash_black extends Sprite {

  constructor(ctx) {
    super(TRASH_IMG_SRC_BLACK, screenWidth, screenHeight)
    this.render(ctx)
  }

  render(ctx) {
    let tl = 0;
    if (databus.black_level >= 7) {
      tl = 6
    } else {
      tl = databus.black_level - 1
    }

    ctx.drawImage(
      this.img,
       tl*130,
      0,
      TRASH_SIZE,
      TRASH_SIZE, 
      0,
      0, 
      screenWidth, 
      screenHeight
    )     
    
    ctx.fillStyle = "#000000"
    ctx.font = "18x Arial"

    ctx.fillText(
      '干垃圾',
      20,
      screenHeight + 17
    )

  }

}
