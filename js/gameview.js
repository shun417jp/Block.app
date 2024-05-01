'use strict';

import { View } from "./view.js";
import { Ball } from "./ball.js";
import { Paddle } from "./paddle.js";
import { Block, HardBlock } from "./block.js";
import {Bar} from "./bar.js"

export class GameVIew extends View{
#ball = null;
#paddle = null;
#blocks = [];
#bar = null;
//パドルとボールが衝突したときの効果音
#paddleBallSound;
//ブロックとボールが衝突したときの効果音
#blockBallSound;
//ゲーム結果
resultMessage = "";

    constructor(context){
        super(context);

        this.#ball = new Ball(context,20,440,5,2,2);
        this.#paddle = new Paddle(context,30,460,40,4,5);
        this.#blocks =[
            new Block(context,10,40,52,20),
            new Block(context,72,40,52,20),
            new HardBlock(context,196,130,52,20),
            new HardBlock(context,258,130,52,20),
        ];
        this.#bar = new Bar(context);

        this.#paddleBallSound = new Sound("./sounds/カーソル移動3.mp3");
        this.#blockBallSound = new Sound("./sounds/カーソル移動11.mp3");
    }

    executePlayerAction(key){
        if(key["ArrowLeft"] || key["Left"]){
            this.#paddle.dx = -this.#paddle.speed;
        }else if(key["ArrowRight"] || key["Right"]){
            this.#paddle.dx = this.#paddle.speed;
        }else{
            this.#paddle.dx = 0;
        }
    }
//ゲームクリアかどうか検証する
    #isGameClear(){
//ブロック全て非表示になっているか検証する
        const _isGameClear = this.#blocks.every((block)=> block.status === false);
        //ゲーム結果を設定する
        if(_isGameClear){
            resultMessage = "ゲームクリア";
        }
        return _isGameClear;
    }


    //ゲームオーバーかどうか検証する
#isGameOver(){
    const ballY = this.#ball.y;
    const ballRadius = this.#ball.radius;
    const ballDy = this.#ball.dy;

    //ボールが下の壁にh総突したか検証する
    const _isGameOver = 
    this.context.canvas.height - ballRadius < ballY + ballDy;
    //ゲーム結果を設定する
    if(_isGameOver){
        this.resultMessage = "ゲームオーバー";
    }
    return _isGameOver;
}

//ボールと壁の衝突を確認する
#checkCollisionBallAndWall(){
    const canvasWidth = this.context.canvas.width;
    const canvasHeight = this.context.canvas.height;
    const ballX = this.#ball.x;
    const ballY = this.#ball.y;
    const ballRadius = this.#ball.radius;
    const ballDx = this.#ball.dx;
    const ballDy = this.#ball.dy;

    if(ballX + ballDx < ballRadius || canvasWidth - ballRadius < ballX + ballDx){
        this.#ball.dx *= -1;
        return;
    }
    //壁に衝突したら反転
    if(ballY + ballDy < ballRadius + 20){
        this.#ball.dy *= -1;
        return;
    }
    //壁に衝突したら反転
    // if(canvasHeight - ballRadius < ballY + allDy){
    //     this.#ball.dy *= -1;
    //     return;

    // }
}

//ボールとパドルの間の衝突を確認する
#checkCollisionBallAndPaddle(){
    const ballX = this.#ball.x;
    const ballY = this.#ball.y;
    const ballRadius = this.#ball.radius;
    const ballDx = this.#ball.dx;
    const ballDy = this.#ball.by;
    const paddleX = this.#paddle.x;
    const paddleY = this.#paddle.y;
    const paddleWidth = this.#paddle.width;
    const paddleHeight = this.#paddle.height;

    //ボールとパドルが衝突したらボールが反射する
    if(paddleX - ballRadius < ballX + ballDx &&
    ballX + ballDx < paddleX + paddleWidth + ballRadius &&
paddleY - ballRadius < ballY + ballDy &&
ballY + ballDy < paddleY + paddleHeight + ballRadius){
    this.#ball.dy *= -1;
    //パドル
    this.#paddleBallSound.play();
}
}

/**更新する */
update(){
//ボールと壁の衝突を確認する
    this.#checkCollisionBallAndWall();

    this.#checkCollisionBallAndPaddle();
    this.#checkCollisionPaddleAndWall();
    this.#checkCollisionBallAndBlock();

    //ゲームオーバーかどうか検証する
    if(this.#isGameOver() || this.#isGameClear()){
        this.isVisible = false;
    }
    //ボールを移動する
    this.#ball.move();
    //パドルを移動する
    this.#paddle.move();

}
#checkCollisionPaddleAndWall(){
    //衝突したら停止する
    if(paddleX + paddleY < 0){
        this.#paddle.dx = 0;
        this.#paddle.x = 0;
        return;
    }
    //衝突したら停止する
    if(canvasWidth -paddleWidth < paddleX + paddleDx){
        this.#paddle.dx = 0;
        this.#paddle.x = canvasWidth - paddleWidth;
        return;
    }
}
#checkCollisionBallAndBlock(){
    const ballX = this.#ball.x;
    const ballY = this.#ball.y;
    const ballRadius = this.#ball.radius;
    const ballDx = this.#ball.dx;
    const ballDy = this.#ball.by;

    this.#blocks.forEach((block)=> {
        if(block.status === true){
            const ballX = this.#ball.x;
            const ballY = this.#ball.y;
            const blockWidth = this.#ball.width;
            const blockHeight = this.#ball.Right;

            if(paddleX - ballRadius < ballX + ballDx &&
                ballX + ballDx < paddleX + paddleWidth + ballRadius &&
            paddleY - ballRadius < ballY + ballDy &&
            ballY + ballDy < paddleY + 
            paddleHeight + ballRadius){
                this.#ball.dy *= -1;
                if(block instanceof HardBlock){
                    block.hp--;
                    if(block.hp === 0){
                        block.status = false;
                        this.#bar.addScore(block.getPoint());
                    }
                }else{
            block.status = false;
            this.#bar.addScore(block.getPoint());
            this.#blockBallSound.play();
            }
            }
        }
    })
}


    /**描画する */
    draw() {
        //ボールを描画する
        this.#ball.draw();
        //
        this.#paddle.draw();
        this.#blocks.forEach((Block) => block.draw());
        this.#bar.draw();
    }
}