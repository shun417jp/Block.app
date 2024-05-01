'use strict';

import { View } from "./view";

export class ResultView extends View{
    constructor(context){
        super(context);
    }

    /**描画する */
    draw(resultMessage) {
        //結果を描写する
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.font = "24px Arial";
        this.context.fillStyle = "while";
        this.context.fillText(
            resultMessage,
            this.context.canvas.width / 2,
            this.context.canvas.height / 2
        );
    }
}