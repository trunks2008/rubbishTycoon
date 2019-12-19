const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let homeimg = new Image()
homeimg.src = 'img/home.png'

let popularimg = new Image()
popularimg.src = 'img/popular.png'

let popular2img = new Image()
popular2img.src = 'img/popular2.png'

let introimg = new Image()
introimg.src = 'img/intro.png'

let ruler1img = new Image()
ruler1img.src = 'img/ruler1.png'

let ruler2img = new Image()
ruler2img.src = 'img/ruler2.png'

let nextimg = new Image()
nextimg.src = 'img/next.png'

let okimg = new Image()
okimg.src = 'img/ok.png'

export default class Home {

  renderHome(ctx) {
    ctx.drawImage(homeimg, 0, 0, 1024, 768, 0, 0, screenWidth, screenHeight)

    this.startAreaReset = {
      startX: screenWidth * 0.4,
      startY: screenHeight * 0.6,
      endX: screenWidth * 0.6,
      endY: screenHeight * 0.75
    }

    this.popularArea = {
      startX: screenWidth * 0.87,
      startY: screenHeight * 0.5,
      endX: screenWidth * 0.98,
      endY: screenHeight * 0.6
    }

    this.introductArea = {
      startX: screenWidth * 0.87,
      startY: screenHeight * 0.61,
      endX: screenWidth * 0.98,
      endY: screenHeight * 0.7
    }

    this.shareArea = {
      startX: screenWidth * 0.87,
      startY: screenHeight * 0.71,
      endX: screenWidth * 0.98,
      endY: screenHeight * 0.8
    }

    this.rulerArea = {
      startX: screenWidth * 0.87,
      startY: screenHeight * 0.81,
      endX: screenWidth * 0.98,
      endY: screenHeight * 0.9
    }
  }

  renderIntro(ctx) {
    ctx.drawImage(introimg, 0, 0, 566, 312, screenWidth * 0.2, screenHeight * 0.2, screenWidth * 0.6, screenHeight * 0.6)
    ctx.drawImage(okimg, 0, 0, 86, 37, screenWidth / 2 - 43, screenHeight * 0.8 - 50, 86, 37)

    this.okArea = {
      startX: screenWidth / 2 - 43,
      startY: screenHeight * 0.8 - 50,
      endX: screenWidth / 2 - 43 + 86,
      endY: screenHeight * 0.8 - 50 + 37
    }
  }

  renderRuler1(ctx) {
    ctx.drawImage(ruler1img, 0, 0, 566, 312, screenWidth * 0.2, screenHeight * 0.2, screenWidth * 0.6, screenHeight * 0.6)
    ctx.drawImage(nextimg, 0, 0, 86, 37, screenWidth / 2 - 43, screenHeight * 0.8 - 50, 86, 37)

    this.nextArea = {
      startX: screenWidth / 2 - 43,
      startY: screenHeight * 0.8 - 50,
      endX: screenWidth / 2 - 43 + 86,
      endY: screenHeight * 0.8 - 50 + 37
    }
  }

  renderRuler2(ctx) {
    ctx.drawImage(ruler2img, 0, 0, 566, 312, screenWidth * 0.2, screenHeight * 0.2, screenWidth * 0.6, screenHeight * 0.6)
    ctx.drawImage(okimg, 0, 0, 86, 37, screenWidth / 2 - 43, screenHeight * 0.8 - 50, 86, 37)

    this.ok2Area = {
      startX: screenWidth / 2 - 43,
      startY: screenHeight * 0.8 - 50,
      endX: screenWidth / 2 - 43 + 86,
      endY: screenHeight * 0.8 - 50 + 37
    }
  }

  renderPopular(ctx) {
    ctx.drawImage(popularimg, 0, 0, 566, 312, screenWidth * 0.2, screenHeight * 0.2, screenWidth * 0.6, screenHeight * 0.6)
    ctx.drawImage(nextimg, 0, 0, 86, 37, screenWidth / 2 - 43, screenHeight * 0.8 - 50, 86, 37)

    this.popunextArea = {
      startX: screenWidth / 2 - 43,
      startY: screenHeight * 0.8 - 50,
      endX: screenWidth / 2 - 43 + 86,
      endY: screenHeight * 0.8 - 50 + 37
    }
  }

  renderPopular2(ctx) {
    ctx.drawImage(popular2img, 0, 0, 566, 312, screenWidth * 0.2, screenHeight * 0.2, screenWidth * 0.6, screenHeight * 0.6)
    ctx.drawImage(okimg, 0, 0, 86, 37, screenWidth / 2 - 43, screenHeight * 0.8 - 50, 86, 37)

    this.popuokArea = {
      startX: screenWidth / 2 - 43,
      startY: screenHeight * 0.8 - 50,
      endX: screenWidth / 2 - 43 + 86,
      endY: screenHeight * 0.8 - 50 + 37
    }
  }
}