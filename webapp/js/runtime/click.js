import DataBus from '../databus'

let databus = new DataBus()

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

export default class Click {
  constructor() {
    // 用于在手指移动的时候标识手指是否已经在**上了
    this.touched = false

    //先remove掉所有监听
    this.removeEvent()

    // 初始化事件监听
    this.initEvent()

    this.selectrubbish = null
    this.selectlevelup = null
  }

  removeEvent() {
    canvas.removeEventListener(
      'touchstart',
      this.touchStartEndEventHandler
    )

    canvas.removeEventListener(
      'touchmove',
      this.touchMoveEndEventHandler
    )

    canvas.removeEventListener(
      'touchend',
      this.touchEndEventHandler
    )

  }

  /**
   * 当手指触摸屏幕的时候
   * 判断手指是否在垃圾上
   * @param {Number} x: 手指的X轴坐标
   * @param {Number} y: 手指的Y轴坐标
   * @return {Boolean}: 用于标识手指是否在垃圾上的布尔值
   */
  checkIsFingerOnAir(x, y) {
    //循环遍历当前所有垃圾

    //偏离
    const deviation = 5

    if (databus.rubbishs.length == 0) {
      return
    }

    //后遍历，上层在上
    for (var i = databus.rubbishs.length - 1; i >= 0; i--) {
      var tmp = databus.rubbishs[i]

      if (x >= tmp.x - deviation &&
        y >= tmp.y - deviation &&
        x <= tmp.x + tmp.width + deviation &&
        y <= tmp.y + tmp.height + deviation) {
        this.selectrubbish = tmp
        return true
      }
    }

    const deviation2 = 1
    // console.log(databus.levelups)
    for (var j = 0; j < databus.levelups.length; j++) {
      var tmp2 = databus.levelups[j]
      if (x >= tmp2.x - deviation2 &&
        y >= tmp2.y - deviation2 &&
        x <= tmp2.x + tmp2.width + deviation2 &&
        y <= tmp2.y + tmp2.height + deviation2) {
        this.selectlevelup = tmp2
        return true
      }
    }

    return false
  }

  /**
   * 根据手指的位置设置垃圾的位置
   * 保证手指处于垃圾中间
   * 同时限定垃圾的活动范围限制在屏幕中
   */
  setAirPosAcrossFingerPosZ(x, y) {
    // console.log(this.selectrubbish)
    let that = this.selectrubbish

    let disX = x - that.width / 2
    let disY = y - that.height / 2

    if (disX < 0)
      disX = 0

    else if (disX > screenWidth * 0.8 - that.width)
      disX = screenWidth * 0.8 - that.width

    if (disY <= 0)
      disY = 0

    else if (disY > screenHeight - that.height)
      disY = screenHeight - that.height

    that.x = disX
    that.y = disY
  }

  /**
   * 玩家响应手指的触摸事件
   * 改变垃圾的位置
   */
  initEvent() {
    //开始触摸事件
    canvas.addEventListener('touchstart', this.touchStartEndEventHandler.bind(this))

    //触摸移动事件
    canvas.addEventListener('touchmove', this.touchMoveEndEventHandler.bind(this))

    //触摸结束事件
    canvas.addEventListener('touchend', this.touchEndEventHandler.bind(this))
  }

  touchStartEndEventHandler(e) {
    e.preventDefault()
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    // console.log(x + ' , ' + y)
    if (this.checkIsFingerOnAir(x, y)) {
      this.touched = true

      if (!this.selectrubbish) {
        //两次次触发问题 √
        if (this.selectlevelup.ltype == 0) {
          //判断金钱是否足够
          // if (databus.money >= 0) {            
          if (databus.money >= (Math.pow(2, databus.black_level - 1) * 5)) {
            databus.money -= ((Math.pow(2, databus.black_level - 1) * 5))
            databus.black_level++
              databus.black_speed += 0.1
            databus.interval -= 5
            for (let i = 0; i < databus.animations.length; i++) {
              if (databus.animations[i].anitype == 'levelup') {
                databus.animations[i].playAnimation()
                break
              }
            }
          } else {
            this.selectlevelup.playAnimation()
          }
        } else if (this.selectlevelup.ltype == 1) {
          // if (databus.money >= 0) {
          if (databus.money >= ((Math.pow(2, databus.brown_level - 1) * 5))) {
            databus.money -= ((Math.pow(2, databus.brown_level - 1) * 5))
            databus.brown_level++
              databus.brown_speed += 0.1
            databus.interval -= 5
            for (let i = 0; i < databus.animations.length; i++) {
              if (databus.animations[i].anitype == 'levelup') {
                databus.animations[i].playAnimation()
                break
              }
            }
          } else {
            this.selectlevelup.playAnimation()
          }
        } else if (this.selectlevelup.ltype == 2) {
          // if (databus.money >=0) {
          if (databus.money >= ((Math.pow(2, databus.red_level - 1) * 5))) {
            databus.money -= ((Math.pow(2, databus.red_level - 1) * 5))
            databus.red_level++
              databus.red_speed += 0.1
            databus.interval -= 5
            for (let i = 0; i < databus.animations.length; i++) {
              if (databus.animations[i].anitype == 'levelup') {
                databus.animations[i].playAnimation()
                break
              }
            }
          } else {
            this.selectlevelup.playAnimation()
          }
        } else if (this.selectlevelup.ltype == 3) {
          // if (databus.money >=0) {
          if (databus.money >= ((Math.pow(2, databus.blue_level - 1) * 5))) {
            databus.money -= ((Math.pow(2, databus.blue_level - 1) * 5))
            databus.blue_level++
              databus.blue_speed += 0.1
            databus.interval -= 5
            //播放升级动画
            for (let i = 0; i < databus.animations.length; i++) {
              if (databus.animations[i].anitype == 'levelup') {
                databus.animations[i].playAnimation()
                break
              }
            }
          } else {
            this.selectlevelup.playAnimation()
          }
        }
        return
      } else {
        this.setAirPosAcrossFingerPosZ(x, y)
      }
    }
  }

  touchMoveEndEventHandler(e) {
    e.preventDefault()
    if (!this.selectrubbish) {
      return
    }

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    if (this.touched)
      this.setAirPosAcrossFingerPosZ(x, y)
  }

  touchEndEventHandler(e) {
    e.preventDefault()
    this.touched = false
    this.selectrubbish = null
    this.selectlevelup = null
  }

}