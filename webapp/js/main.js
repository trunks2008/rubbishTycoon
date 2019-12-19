import Home from './runtime/home'
import BackGround from './runtime/background'
import GameInfo from './runtime/gameinfo'
import Pipeline from './runtime/pipeline'
import Levelup from './runtime/levelup'
import Click from './runtime/click'

import Rubbish from './rubbish/rubbish'
import Trash_black from './rubbish/trash_black'
import Trash_blue from './rubbish/trash_blue'
import Trash_brown from './rubbish/trash_brown'
import Trash_red from './rubbish/trash_red'
import Levelupani from './rubbish/levelupani'
import Detectani from './rubbish/detectani'

import DataBus from './databus'

let ctx = canvas.getContext('2d')
let databus = new DataBus()

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0

    //事件绑定只初始化一次!
    this.click = new Click()

    this.restart(true)
    // this.restart()

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  //参数用来说明是否从主页进入游戏
  restart(before) {
    // restart() {
    console.log('restart')
    databus.reset()

    databus.gameBefore = before

    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )

    this.home = new Home(ctx)

    this.bg = new BackGround(ctx)
    this.gameinfo = new GameInfo()

    // this.click = new Click()

    this.trash_black = new Trash_black(ctx)
    this.trash_brown = new Trash_brown(ctx)
    this.trash_red = new Trash_red(ctx)
    this.trash_blue = new Trash_blue(ctx)

    this.levelupani = new Levelupani(ctx)
    this.detectani=new Detectani(ctx)

    this.pipeline_black = new Pipeline(ctx, 0)
    this.pipeline_brown = new Pipeline(ctx, 1)
    this.pipeline_red = new Pipeline(ctx, 2)
    this.pipeline_blue = new Pipeline(ctx, 3)

    this.level_black = new Levelup(ctx, 0)
    this.level_brown = new Levelup(ctx, 1)
    this.level_red = new Levelup(ctx, 2)
    this.level_blue = new Levelup(ctx, 3)

    databus.levelups.push(this.level_black)
    databus.levelups.push(this.level_brown)
    databus.levelups.push(this.level_red)
    databus.levelups.push(this.level_blue)

    //不懂 但是管用
    this.bindLoop = this.loop.bind(this)

    this.hasEventBind = false

    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  ecologyDetection() {
    if (databus.gameBefore) {
      return
    } else if (databus.ecology < databus.detection && databus.ecology > 0) {
      console.log('环境恶化' + databus.ecology + '  ' + databus.detection)
      this.detectani.playAnimation()
      databus.detection -= 20
    }
  }

  /**
   * 垃圾生成
   */
  rubbishGenerate() {
    if (databus.frame % databus.interval === 0) {
      // if (databus.frame % 1 === 0) {
      let rubbish = databus.pool.getItemByClass('rubbish', Rubbish)
      rubbish.init(6)
      databus.rubbishs.push(rubbish)
      if (rubbish.rubbishtype != 2) {
        databus.ecology -= 2
      } else {
        databus.ecology -= 3
      }

    }
  }

  // 全局碰撞检测
  //碰撞检测完重绘
  collisionDetection() {
    let that = this

    //检测环境值
    if (databus.ecology <= 0) {
      databus.gameOver = true
    }

    for (let i = 0, i1 = databus.rubbishs.length; i < i1; i++) {
      let rubbish = databus.rubbishs[i]

      //删除进入垃圾桶的元素     
      if (rubbish.isCollideWith(this.trash_blue)) {
        databus.removeRubbish(rubbish, i)
        if (rubbish.rubbishtype == 3) {
          //加入流水线
          databus.line_blue.push(rubbish)
        } else {
          rubbish.playAnimation()
        }
        break
      } else if (rubbish.isCollideWith(this.trash_brown)) {
        databus.removeRubbish(rubbish, i)
        if (rubbish.rubbishtype == 1) {
          databus.line_brown.push(rubbish)
        } else {
          rubbish.playAnimation()
        }
        break
      } else if (rubbish.isCollideWith(this.trash_black)) {
        databus.removeRubbish(rubbish, i)
        if (rubbish.rubbishtype == 0) {
          databus.line_black.push(rubbish)
        } else {
          rubbish.playAnimation()
        }
        break
      } else if (rubbish.isCollideWith(this.trash_red)) {
        databus.removeRubbish(rubbish, i)
        if (rubbish.rubbishtype == 2) {
          databus.line_red.push(rubbish)
        } else {
          rubbish.playAnimation()
        }
        break
      }
    }
    this.render()
  }

  // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameinfo.btnAreaReset
    let shareArea = this.gameinfo.btnShare

    if (x >= area.startX &&
      x <= area.endX &&
      y >= area.startY &&
      y <= area.endY) {
      this.restart(false)
    } else if (x >= shareArea.startX &&
      x <= shareArea.endX &&
      y >= shareArea.startY &&
      y <= shareArea.endY) {
      // console.log('share')
      wx.shareAppMessage({
        title: '垃圾分类回收大作战！',
        imageUrl: 'img/share.png'
      })
    }
  }

  //home 开始页面
  touchStartEventHandler(e) {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.home.startAreaReset
    let popularArea = this.home.popularArea
    let introArea = this.home.introductArea
    let shareArea = this.home.shareArea
    let rulerArea = this.home.rulerArea
    let okArea = this.home.okArea
    let nextArea = this.home.nextArea
    let ok2Area = this.home.ok2Area
    let popunextArea = this.home.popunextArea
    let popuokArea = this.home.popuokArea

    if (databus.gameintro == false &&
      databus.gameruler1 == false &&
      databus.gameruler2 == false &&
      databus.gamepopular == false &&
      databus.gamepopular2 == false &&
      x >= area.startX &&
      x <= area.endX &&
      y >= area.startY &&
      y <= area.endY) {
      this.restart(false)
    } else if (x >= popularArea.startX &&
      x <= popularArea.endX &&
      y >= popularArea.startY &&
      y <= popularArea.endY) {
      databus.gamepopular = true
    } else if (x >= introArea.startX &&
      x <= introArea.endX &&
      y >= introArea.startY &&
      y <= introArea.endY) {
      databus.gameintro = true
    } else if (x >= rulerArea.startX &&
      x <= rulerArea.endX &&
      y >= rulerArea.startY &&
      y <= rulerArea.endY) {
      databus.gameruler1 = true
    } else if (x >= shareArea.startX &&
      x <= shareArea.endX &&
      y >= shareArea.startY &&
      y <= shareArea.endY) {
      wx.shareAppMessage({
        title: '垃圾分类回收大作战！',
        imageUrl: 'img/share.png'
      })
    }
    //介绍页面返回
    else if (databus.gameintro == true &&
      x >= okArea.startX &&
      x <= okArea.endX &&
      y >= okArea.startY &&
      y <= okArea.endY) {
      databus.gameintro = false
    } else if (databus.gameruler1 == true &&
      x >= nextArea.startX &&
      x <= nextArea.endX &&
      y >= nextArea.startY &&
      y <= nextArea.endY) {
      databus.gameruler1 = false
      databus.gameruler2 = true
    } else if (databus.gameruler2 == true &&
      x >= ok2Area.startX &&
      x <= ok2Area.endX &&
      y >= ok2Area.startY &&
      y <= ok2Area.endY) {
      databus.gameruler2 = false
    } else if (databus.gamepopular == true &&
      x >= popunextArea.startX &&
      x <= popunextArea.endX &&
      y >= popunextArea.startY &&
      y <= popunextArea.endY) {
      databus.gamepopular = false
      databus.gamepopular2 = true
    } else if (databus.gamepopular2 == true &&
      x >= popuokArea.startX &&
      x <= popuokArea.endX &&
      y >= popuokArea.startY &&
      y <= popuokArea.endY) {
      databus.gamepopular2 = false
    }
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (!databus.gameBefore) {
      this.bg.render(ctx)
      this.trash_black.render(ctx)
      this.trash_blue.render(ctx)
      this.trash_brown.render(ctx)
      this.trash_red.render(ctx)
      this.pipeline_black.render(ctx, 0)
      this.pipeline_brown.render(ctx, 1)
      this.pipeline_red.render(ctx, 2)
      this.pipeline_blue.render(ctx, 3)
      this.level_black.render(ctx, 0)
      this.level_brown.render(ctx, 1)
      this.level_red.render(ctx, 2)
      this.level_blue.render(ctx, 3)

      databus.rubbishs.forEach((item) => {
        item.drawToCanvas(ctx)
      })

      this.gameinfo.renderGameScore(ctx, databus.ecology, databus.score, databus.money)

      //绘制帧  动画帧
      databus.animations.forEach((ani) => {
        // console.log(ani)
        if (ani.isPlaying) {
          ani.aniRender(ctx)
        }
      })

      //游戏结束停止帧循环
      if (databus.gameOver) {
        this.gameinfo.renderGameOver(ctx, databus.score)

        if (!this.hasEventBind) {
          this.hasEventBind = true
          this.touchHandler = this.touchEventHandler.bind(this)
          canvas.addEventListener('touchstart', this.touchHandler)
        }
      }
    }
    //进入游戏首页
    else {
      this.home.renderHome(ctx)
      // this.click.removeEvent()

      if (!this.hasEventBind) {
        this.hasEventBind = true
        this.touchHandler = this.touchStartEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
      }

      //introduct
      if (databus.gameintro) {
        this.home.renderIntro(ctx)
      } else if (databus.gameruler1) {
        this.home.renderRuler1(ctx)
      } else if (databus.gameruler2) {
        this.home.renderRuler2(ctx)
      } else if (databus.gamepopular) {
        this.home.renderPopular(ctx)
      } else if (databus.gamepopular2) {
        this.home.renderPopular2(ctx)
      }
    }
  }

  // 游戏逻辑更新主函数
  update() {
    if (databus.gameOver) {
      return;
    }

    this.bg.update()

    this.pipeline_black.update(0)
    this.pipeline_brown.update(1)
    this.pipeline_red.update(2)
    this.pipeline_blue.update(3)

    this.rubbishGenerate()
    this.collisionDetection()
    this.ecologyDetection()
  }

  // 实现游戏帧循环
  loop() {
    databus.frame++

      this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

}