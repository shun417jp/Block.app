`use strict`;
import { View } from "./view";

export class MainView extends View{
    constructor(context){
        super(context);
    }

    /**プレイヤーのキーアクションを実行する */
    executePlayerACtion(key){
        
        //エンターキーが押されたら画面を非表示にする
        if(key["Enter"] === true){
            this.isVisible = false;
        }
    }
    /**描画する */
    draw() {
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.fillStyle = "while";
        this.context.font = "24px Arial";
        this.context.fillText("ブロック崩し",
    this.context.canvas.width / 2,
    this.context.canvas.height / 2
);

    this.context.font = "16px Arial";
    this.context.fillText("Press Enter",
this.context.canvas.width / 2,
this.context.canvas.height / 2 * 40
);
    };
    
    //タイトルを描画する
    
}