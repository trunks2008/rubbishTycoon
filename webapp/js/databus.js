import Pool from './base/pool'

let instance

/**
 * 全局状态管理器
 */
export default class DataBus {

  constructor() {
    if (instance)
      return instance

    instance = this
    this.pool = new Pool()
    this.reset()
  }

  reset() {
    this.frame = 0

    this.interval = 120
    this.speedup=5

    this.ecology = 100
    this.score = 0
    this.money = 0

    this.rubbishs = []
    this.animations = []

    this.line_black = []
    this.line_brown = []
    this.line_red = []
    this.line_blue = []

    this.levelups = []

    this.black_level = 1
    this.brown_level = 1
    this.red_level = 1
    this.blue_level = 1

    this.black_speed = 0.1
    this.brown_speed = 0.1
    this.red_speed = 0.1
    this.blue_speed = 0.1

    this.gameBefore = true
    this.gameOver = false

    this.gamepopular = false
    this.gamepopular2 = false

    this.gameintro = false

    this.gameruler1 = false
    this.gameruler2 = false

    this.detection=80
  }

  /**
   * 回收垃圾，进入对象池
   * 此后不进入帧循环
   */
  removeRubbish(rubbish, pos) {
    // let temp=this.rubbishs.shift()
    // temp.visible=false
    // console.log('remove rubbish')
    this.rubbishs.splice(pos, 1)
    rubbish.visible = false

    //删除 否则会持续生成上一个被清除的垃圾
    // this.pool.recover('rubbish',rubbish)
    // console.log('remove end')
  }

}