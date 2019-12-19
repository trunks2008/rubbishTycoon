import Sprite from '../base/sprite'
import DataBus from '../databus'

let databus = new DataBus()

const TRASH_IMG_SRC_BLUE = 'img/t_blue.png'
const TRASH_SIZE = 130

const screenWidth = window.innerWidth * 0.15
const screenHeight = window.innerHeight * 0.15

const my_x = window.innerWidth *0.65

export default class Trash_blue extends Sprite {

  constructor(ctx) {
    super(TRASH_IMG_SRC_BLUE, screenWidth, screenHeight, my_x,0)
    this.render(ctx)
  }

  render(ctx) {
    let tl=0;
    if (databus.blue_level>=7){
      tl=6
    }else{
      tl = databus.blue_level-1
    }

    ctx.drawImage(
      this.img,
      tl*130,
      0,
      TRASH_SIZE,
      TRASH_SIZE, 
      my_x, 
      0, 
      screenWidth, 
      screenHeight
    )

    ctx.fillStyle = "#000000"
    ctx.font = "18x Arial"

    ctx.fillText(
      '可回收物',
      my_x+10,
      screenHeight+17
    )
  }
}
