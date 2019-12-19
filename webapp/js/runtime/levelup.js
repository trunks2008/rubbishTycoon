import Animation from '../base/animation'
import Sprite from '../base/sprite'
import DataBus from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let databus = new DataBus()

const CM_IMG_SRC = 'img/common.png'
const CM_WIDTH = 444
const CM_HEIGHT = 200

export default class Levelup extends Animation {

  constructor(ctx, type) {
    super(CM_IMG_SRC, CM_WIDTH, CM_HEIGHT)
    this.render(ctx, type)

    // 用于在手指移动的时候标识手指是否已经在垃圾上了
    this.touched = false

    this.ltype = type

    if (type == 0) {
      this.x = screenWidth * 0.8 + 20
      this.y = 160
    } else if (type == 1) {
      this.x = screenWidth * 0.8 + 20
      this.y = 260
    } else if (type == 2) {
      this.x = screenWidth * 0.8 + 20
      this.y = 310
    } else if (type == 3) {
      this.x = screenWidth * 0.8 + 20
      this.y = 210
    }

    //长高改成这样是为了
    this.width = 100
    this.height = 45

    this.initErrorAnimation()
  }

  render(ctx, type) {
    ctx.fillStyle = "#ffffff"
    ctx.font = "16px Arial"

    if (type == 0) {
      ctx.drawImage(this.img, 348, 48, 45, 45, screenWidth * 0.8 + 12, 160, 45, 45)

      ctx.fillText(
        'Lv' + databus.black_level + '   ' + Math.pow(2, databus.black_level - 1) * 5 + '$',
        screenWidth * 0.8 + 60,
        190
      )
    } else if (type == 1) {
      ctx.drawImage(this.img, 348, 96, 45, 45, screenWidth * 0.8 + 12, 260, 45, 45)
      ctx.fillText(
        'Lv' + databus.brown_level + '   ' + Math.pow(2, databus.brown_level - 1) * 5 + '$',
        screenWidth * 0.8 + 60,
        290
      )
    } else if (type == 2) {
      ctx.drawImage(this.img, 393, 96, 45, 45, screenWidth * 0.8 + 12, 310, 45, 45)
      ctx.fillText(
        'Lv' + databus.red_level + '   ' + Math.pow(2, databus.red_level - 1) * 5 + '$',
        screenWidth * 0.8 + 60,
        340
      )
    } else if (type == 3) {
      ctx.drawImage(this.img, 393, 48, 45, 45, screenWidth * 0.8 + 12, 210, 45, 45)
      ctx.fillText(
        'Lv' + databus.blue_level + '   ' + Math.pow(2, databus.blue_level - 1) * 5 + '$',
        screenWidth * 0.8 + 60,
        240
      )
    }
  }

  // 预定义报错的帧动画
  initErrorAnimation() {
    let frames = []
    const ERROR_IMG_PREFIX = 'img/mne.png'  
    const ERROR_FRAME_COUNT = 25

    for (let i = 0; i < ERROR_FRAME_COUNT; i++) {
      frames.push(ERROR_IMG_PREFIX)
    }
    this.initFrames(frames)
  }

}