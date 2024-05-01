export class Block{
    context;
    x;
    y;
    width;
    height;
    status = true;
    etacc  


constructor(context,x,y,width,height){
    this.context = context;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

getPoint(){
    return Block.POINT;
}

draw(){
    if(this.status === true){
        this.context.fillStyle = "#a47f61";
        this.context.fillRect(this.x,this.y,this.width,this.height);
    }
}
}

export class HardBlock extends Block{
    //得点
    static POINT = 50;
    hp = 3;

    constructor(context,x,y,width,height){
        super(context,x,y,width,height);
    }

    getPoint(){
        return HardBlock.POINT;
    }
    draw(){
        if(this.status === true){
            this.context.fillStyle = "#D2691E";
            this.context.fillRect(this.x,this.y,this.width,this.height);
        }
    }
}