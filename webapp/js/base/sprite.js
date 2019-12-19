/**
 * 游戏基础的精灵类
 */
export default class Sprite {
  constructor(imgSrc = '', width = 0, height = 0, x = 0, y = 0) {
    this.img = new Image()
    this.img.src = imgSrc

    this.width = width
    this.height = height

    this.x = x
    this.y = y

    this.visible = true
  }

  /**
   * 将精灵图绘制在canvas上
   */
  drawToCanvas(ctx) {
    if (!this.visible)
      return

    // console.log('draw to canvas')
    // console.log(this.visible+' '+this.x+' '+this.y+' '+this.width+' '+this.height)

    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    )

    // console.log('draw end')
  }

  /**
   * 简单的碰撞检测定义：
   * 另一个精灵的中心点处于本精灵所在的矩形内即可
   * @param{Sprite} sp: Sptite的实例
   * this垃圾桶 sp垃圾
   */
  isCollideWith(sp) {
    let spX = sp.x + sp.width / 2  
    let spY = sp.y + sp.height / 2

    if (!this.visible || !sp.visible)
      return false

    return !!(spX >= this.x
      && spX <= this.x + this.width
      && spY >= this.y
      && spY <= this.y + this.height)

    // this.x > sp.x && 
    // this.x+this.width 
    // this.y
    // this.y+this.height
  }

  /**
  * 严格边缘检测，会误判
  * {@param target 目标物体}
  */
  isCollideEdgeWith(target) {
    if (!this.visible || !target.visible) {
      return false
    }

    return ((target.x >= this.x &&
      target.x <= this.x + this.width &&
      target.y >= this.y &&
      target.y <= this.y + this.height) || // top left

      (target.x + target.width >= this.x &&
        target.x + target.width <= this.x + this.width &&
        target.y >= this.y &&
        target.y <= this.y + this.height) || // top right

      (target.x >= this.x &&
        target.x <= this.x + this.width &&
        target.y + target.height >= this.y &&
        target.y + target.height <= this.y + this.height) || // bottom left

      (target.x + target.width >= this.x &&
        target.x + target.width <= this.x + this.width &&
        target.y + target.height >= this.y &&
        target.y + target.height <= this.y + this.height)) // bottom right
  }
  
}
