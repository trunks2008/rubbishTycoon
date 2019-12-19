import Animation from '../base/animation'

import DataBus from '../databus'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let databus = new DataBus()

//纯动画类
export default class Levelupani extends Animation {
  constructor(ctx) {
    super('', 0, 0, 340, 150)

    this.anitype = 'levelup'
    this.initLevelupAnimation()
  }

  // 预定义帧动画
  initLevelupAnimation() {
    let frames = []
    const ERROR_IMG_PREFIX = 'img/levelup'

    for (let i = 1; i <= 25; i++) {
      frames.push(ERROR_IMG_PREFIX + i + '.png')
    }
    this.initFrames(frames)
  }

}