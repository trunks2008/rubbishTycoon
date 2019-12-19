import Sprite from '../base/sprite'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC = 'img/bg1.png'
const BG_WIDTH = 1024
const BG_HEIGHT = 768

export default class Background extends Sprite {
  
  constructor(ctx){
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)
    this.render(ctx)
  }

  update(){
  }

  /**
   * 背景图重绘函数
   */
  render(ctx){    
    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      0,
      0,
      screenWidth,
      screenHeight
    )     
    
  }
}