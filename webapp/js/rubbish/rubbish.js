import Animation from '../base/animation'
import DataBus from '../databus'

const RUBBISH_IMG_SRC_DRY = ['img/bone.png', 'img/towel.png', 'img/basketball.png', 'img/adhesivetape.png', 'img/broom.png', 'img/chopsticks.png', 'img/closestool.png', 'img/glass.png', 'img/toiletpaper.png', 'img/walnut.png']
const RUBBISH_IMG_SRC_WET = ['img/vegetable.png', 'img/biscuit.png', 'img/apple.png', 'img/banana.png', 'img/chocolate.png', 'img/fishbone.png', 'img/melon.png', 'img/onion.png', 'img/pear.png', 'img/strawberry.png']
const RUBBISH_IMG_SRC_HARM = ['img/thermometer.png', 'img/capsule.png', 'img/battery.png', 'img/paintdrum.png', 'img/negative.png', 'img/gastank.png', 'img/lighter.png', 'img/lightbulb.png', 'img/palette.png', 'img/tablet.png']
const RUBBISH_IMG_SRC_RECYCLE = ['img/dress.png', 'img/bottle.png', 'img/phone.png', 'img/bookbag.png', 'img/can.png', 'img/cola.png', 'img/glassbottle.png', 'img/pot.png', 'img/shoes.png', 'img/toothbrush.png']

const RUBBISH_IMG_SRC_LIST = [RUBBISH_IMG_SRC_DRY, RUBBISH_IMG_SRC_WET, RUBBISH_IMG_SRC_HARM, RUBBISH_IMG_SRC_RECYCLE]

const RUBBISH_WIDTH = 48
const RUBBISH_HEIGHT = 48

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let databus = new DataBus()

function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Rubbish extends Animation {
  constructor() {
    var j = Math.floor(Math.random() * 4)
    var tlen = RUBBISH_IMG_SRC_LIST[j].length
    var i = Math.floor(Math.random() * tlen)

    super(RUBBISH_IMG_SRC_LIST[j][i], RUBBISH_WIDTH, RUBBISH_HEIGHT)

    this.rubbishtype = j
    this.detailtype = i 

    this.initErrorAnimation()
  }

  init() {
    this.x = rnd(screenWidth * 0.15, screenWidth * 0.65 - RUBBISH_WIDTH)
    this.y = rnd(screenHeight * 0.15, screenHeight * 0.85 - RUBBISH_HEIGHT)
    this.visible = true
  }

  // 每一帧更新位置
  update() {
    // 对象回收
    // if (this.y > window.innerHeight + this.height)
    // databus.removeRubbish(this)
  }

  // 预定义报错的帧动画
  initErrorAnimation() {
    let frames = []
    const ERROR_IMG_PREFIX = 'img/error.png'
    const ERROR2_IMG_PREFIX = 'img/error2.png'
    const ERROR_FRAME_COUNT = 30

    for (let i = 0; i < 15; i++) {
      frames.push(ERROR_IMG_PREFIX)
    }
    for (let i = 0; i < 15; i++) {
      frames.push(ERROR2_IMG_PREFIX)
    }
    for (let i = 0; i < 15; i++) {
      frames.push(ERROR_IMG_PREFIX)
    }

    this.initFrames(frames)
  }

}