import Sprite from '../base/sprite'
import DataBus from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const RBS_MAP_IMG_SRC = 'img/rubbishmap.png'
const MAP_WIDTH = 500
const MAP_HEIGHT = 200

let databus = new DataBus()

export default class Pipeline extends Sprite {

  constructor(ctx, type) {
    super(RBS_MAP_IMG_SRC, MAP_WIDTH, MAP_HEIGHT)
    this.type = type

    this.top = 0
    this.bottom = 0
    this.right = 0
    this.left = 0

    this.render(ctx, type)
  }

  update(type) {
    if (type == 0 && databus.line_black.length != 0) {
      this.top += databus.black_speed
      if (this.top >= 48) {
        this.top = 0
        databus.line_black.shift()
        databus.score += 2
        databus.money += 1
        databus.ecology += 2
      }
    } else if (type == 1 && databus.line_brown.length != 0) {
      this.left += databus.brown_speed
      if (this.left >= 48) {
        this.left = 0
        databus.line_brown.shift()
        databus.score += 2
        databus.money += 1
        databus.ecology += 2
      }
    } else if (type == 2 && databus.line_red.length != 0) {
      this.bottom += databus.red_speed
      if (this.bottom >= 48) {
        this.bottom = 0
        databus.line_red.shift()
        databus.score += 2
        databus.money += 1
        databus.ecology += 3
      }
    } else if (type == 3 && databus.line_blue.length != 0) {
      this.right += databus.blue_speed
      if (this.right >= 48) {
        this.right = 0
        databus.line_blue.shift()
        databus.score += 2
        databus.money += 2
        databus.ecology += 2
      }
    }
  }

  render(ctx, type) {
    let tmp = 0
    if (type == 0) {
      let it = databus.line_black
      if (it.length > 5) {
        tmp = 5
      } else {
        tmp = it.length
      }
      // for (let i = 0; i < it.length; i++) {
      for (let i = 0; i < tmp; i++) {
        ctx.drawImage(
          this.img,
          it[i].detailtype * 50,
          type * 50,
          48,
          48,
          25,
          screenHeight * 0.15 + 48 * i + 40 - this.top,
          48,
          48
        )
      }
    } else if (type == 1) {
      let it = databus.line_brown      
      if (it.length > 5) {
        tmp = 5
      } else {
        tmp = it.length
      }
      for (let i = 0; i < tmp; i++) {
        ctx.drawImage(
          this.img,
          it[i].detailtype * 50,
          type * 50,
          48,
          48,
          screenWidth * 0.15 + 48 * i + 100 - this.left - 30,
          screenHeight - 65,
          48,
          48
        )
      }
    } else if (type == 2) {
      let it = databus.line_red
      if (it.length > 5) {
        tmp = 5
      } else {
        tmp = it.length
      }
      for (let i = 0; i < tmp; i++) {
        ctx.drawImage(
          this.img,
          it[i].detailtype * 50,
          type * 50,
          48,
          48,
          screenWidth * 0.65 + 25,
          screenHeight * 0.65 - 48 * i - 40 + this.bottom,
          48,
          48
        )
      }
    } else if (type == 3) {
      let it = databus.line_blue
      if (it.length > 5) {
        tmp = 5
      } else {
        tmp = it.length
      }
      for (let i = 0; i < tmp; i++) {
        ctx.drawImage(
          this.img,
          it[i].detailtype * 50,
          type * 50,
          48,
          48,
          screenWidth * 0.65 - 48 * i - 100 + this.right,
          15,
          48,
          48
        )
      }

    }

  }

}