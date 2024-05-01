'use strict';

import { MainView } from "./mainview";
import { GameVIew } from "./gameview";
import { ResultView } from "./resultview";

export class BlockGame{
    #canvas;
    #context;
    /**現在表示するビューの名前 */
    #viewname = "";
    /**メイン画面 */
    #mainview = null;
    /**ゲーム画面 */
    #gameview = null;
    /**結果画面 */
    #resultview = null;
    #intervalId = null;
    #INTERVAL_TIME_MS = 1000 / 60;

    constructor(canvasId){

    }
    #start(){
        this.#intervalId = setInterval(() => {
            this.#run();
        }, this.#INTERVAL_TIME_MS);

    }
    #stop(){
        clearInterval(this.#intervalId);
        this.#intervalId = null;

    }

    #run(){
        switch (this.#viewname){
            case "MainView":
                //ゲーム画面を描写する
                this.#gameview.draw();
                //メイン画面を描写する
                this.#mainview.draw();
                //ゲーム画面が非表示フラグになっている場合は次の画面に切り替える
                if(this.#mainview.isVisible === false){
                    this.#viewname = "GameView";
                }
                break;
                case "GameView":
                    //画面をクリアする
                    this.#context.clearRect(0,0 ,this.#canvas.width, this.#canvas.height );
                    this.#gameview.update();
                    this.#gameview.draw();
                    if(this.#gameview.isVisible === false){
                        this.#viewname = "ResultView";
                    }
                    break;
                    case "ResultView":
                        console.log("ResultView");
                        this.#resultview.draw(this.#gameview.resultMessage);
                        //ゲームを停止する
                        this.#stop();
                        break;
        }
    }

    constructor(canvasId){
        this.#canvas = document.getElementById(canvasId);
        if(this.#canvas === null){
            throw new Error("canvasが見つかりません");
        }
         this.#context = this.#canvas.getContext("2d");

        this.#mainview  = new MainView(this.#context);
        this.#gameview  = new GameVIew(this.#context);
        this.#resultview = new ResultView(this.#context);

        this.#viewname = "MainView";

        this.#start();

        // this.#mainview.draw();
        // this.#gameview.draw();
        // this.#resultview,draw();

    }

    setkeydownKey(key){
        switch (this.#viewname){
            case "MainView":
                this.#mainview.executePlayerAction({[key]: trye});
                break;
                case "GameView":
                    this.#gameview.executePlayerAction({ [key]: true});
                    break;
                    case "ResultView":
                        break;
        }
    }

    setkeyupKey(key){
        switch (this.#viewname){
            case "MainView":
                this.#mainview.executePlayerAction({[key]: false});
                break;
                case "GameView":
                    break;
                    case "ResultView":
                        break;
        }
    }
}