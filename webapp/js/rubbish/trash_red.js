import Sprite from '../base/sprite'
import DataBus from '../databus'

let databus = new DataBus()

const TRASH_IMG_SRC_RED = 'img/t_red.png'
const TRASH_SIZE = 130

const screenWidth = window.innerWidth / 6.67
const screenHeight = window.innerHeight / 6.67

const my_x = window.innerWidth * 0.65
const my_y = window.innerHeight * 0.8

export default class Trash_red extends Sprite {

  constructor(ctx) {
    super(TRASH_IMG_SRC_RED, screenWidth, screenHeight, my_x, my_y)
    this.render(ctx)
  }

  render(ctx) {
    let tl = 0;
    if (databus.red_level >= 7) {
      tl = 6
    } else {
      tl = databus.red_level - 1
    }

    ctx.drawImage(
      this.img,
      tl * 130,
      0,
      TRASH_SIZE,
      TRASH_SIZE,
      my_x,
      my_y,
      screenWidth,
      screenHeight
    )

    ctx.fillStyle = "#000000"
    ctx.font = "18x Arial"

    ctx.fillText(
      '有害垃圾',
      my_x + 10,
      my_y + screenHeight + 18
    )

  }

}