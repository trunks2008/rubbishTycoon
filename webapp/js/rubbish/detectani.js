import Animation from '../base/animation'

import DataBus from '../databus'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let databus = new DataBus()

//纯动画类
export default class Detectani extends Animation {
  constructor(ctx) {
    super('', 0, 0, 340, 150)

    this.anitype = 'detect'
    this.initWorseAnimation()
  }

  // 预定义帧动画
  initWorseAnimation() {
    let frames = []
    const WORSE_IMG_PREFIX = 'img/worse.png'

    for (let i = 1; i <= 25; i++) {
      // frames.push(ERROR_IMG_PREFIX + i + '.png')
      frames.push(WORSE_IMG_PREFIX)
    }
    this.initFrames(frames)
  }

}