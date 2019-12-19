import DataBus from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let atlas = new Image()
atlas.src = 'img/common.png'

let databus = new DataBus()

export default class GameInfo {

  renderGameScore(ctx, ecology,score,money) {
    ctx.fillStyle = "#ffffff"
    ctx.font = "18px Arial"

    ctx.drawImage(atlas, 348, 0, 32, 32, screenWidth *0.8+15, 20, 32, 32)
    ctx.fillText(
      '环境：' + ecology,
      screenWidth * 0.8 + 50,
      50
    )
    ctx.drawImage(atlas, 380, 0, 32, 32, screenWidth * 0.8 + 15, 55, 32, 32)
    ctx.fillText(
      '得分：'+score,
      screenWidth*0.8+50,
      80
    )

    ctx.drawImage(atlas, 412, 0, 32, 32, screenWidth * 0.8 + 15, 90, 32, 32)
    ctx.fillText(
      '金钱：' + money,
      screenWidth * 0.8 + 50,
      110
    )

    ctx.fillText(
      '升级设施：',
      screenWidth * 0.8 + 20,
      145
    )
  }

  renderGameOver(ctx,score){
    ctx.drawImage(atlas, 0, 0, 300, 200, screenWidth / 2 - 250, screenHeight / 2 - 200, 500, 400)

    ctx.fillStyle = "#000000"
    ctx.font = "30px Arial "

    ctx.fillText(
      '你的城市填满了垃圾！',
      screenWidth / 2 -140,
      screenHeight / 2 - 100 + 50
    )

    ctx.fillText(
      '得分: ' + score,
      screenWidth / 2 -70,
      screenHeight / 2 - 100 + 90
    )

    ctx.font = "18px Arial "

    ctx.drawImage(atlas, 300, 48, 48, 48, screenWidth / 2 - 120, screenHeight / 2 + 20, 50, 50)
    ctx.fillText(
      '分享游戏 ',
      screenWidth / 2 - 130,
      screenHeight / 2 + 90
    )

    ctx.drawImage(atlas, 300, 0, 48, 48, screenWidth / 2 +30, screenHeight / 2+20, 50, 50)
    ctx.fillText(
      '重新开始 ',
      screenWidth / 2 + 20,
      screenHeight / 2 + 90
    )    

    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    this.btnAreaReset = {
      startX: screenWidth / 2 + 20,
      startY: screenHeight / 2 + 20,
      endX: screenWidth / 2 + 70,
      endY: screenHeight / 2 +110
    }

    this.btnShare={
      startX: screenWidth / 2 -120,
      startY: screenHeight / 2 + 20,
      endX: screenWidth / 2 -70,
      endY: screenHeight / 2 + 110
    }

  }


}