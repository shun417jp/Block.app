'use strict';

export class Ball{
    context;
    /**x座標 */
    y;
    /**y座標 */
    x;
    /**半径 */
    radius;
    /**x軸の移動速度 */
    dx;
    /**y軸の移動速度 */
    dy;


constructor(context, x,y, radius, dx,dy){
    this.context = context;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
}
/**移動 */
move(){
    this.x += this.dx;
    this.y += this.dy;

}
/**描写 */
draw(){
    //ボールを描画
    this.context.beginPath();
    this.context.arc(this.x,this.y,this.radius, 0, Math.PI *2);
    this.context.fillStyle = "red";
    this.context.fill();
    this.context.closePath();

}
}