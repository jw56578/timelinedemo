var player = {
    width:50,
    height:50,
    img:new Image(),
    x:50,
    y:50,
    moves:[],
    refresh:function(data){ // should this thing recieve the canvas?
        var ctx = data.ctx;
        var screenWidth = data.screenWidth;
        var screenHeight = data.screenHeight;

        //what logic is needed to make movement to another location smooth, not choppy
        //one press in any direction needs to move it a hard coded distance, but the thing must gradually move there
        //divide distance into 3 values and put in stack, pop off stack on each refresh

        if(!this.img.src){
            this.img.src = 'player.png';
            this.img.onload = function(){
                ctx.drawImage(this.img, this.x, this.y);
            }.bind(this)
        }

        var xToUse = this.x;
        var yToUse = this.y;
        var movesLength = this.moves.length;

        //need to keep track of last key pressed and if its different then empty moves
        var  moveTo = function(fnc){
            if(movesLength < 10){ //inertia
                if(movesLength >0){
                    //do stuff based on last value in moves, not current location
                    xToUse= this.moves[movesLength -1].x;
                    yToUse = this.moves[movesLength -1].y;
                }
                var pace = this.height / 5;
                for(var i = 0; i < pace; i ++){
                    this.moves.push(fnc(xToUse,yToUse,i));
                }
            }

        }.bind(this);

        if(currentKeypress ==='ArrowDown'){
            //x stays the same and y increase by the height
            //divide height by ?? some magic number 5
            moveTo(function (x,y,i){
                if((i * 5 + (y)) + this.height  < screenHeight)y = i * 5 + y;
                return {x:x,y:y};
            }.bind(this));

        }
        if(currentKeypress ==='ArrowUp'){
            moveTo(function (x,y,i){
                if(y-i * 5 > 0)y = y-i * 5;
                return {x:x,y:y};
            });
        }
        if(currentKeypress ==='ArrowLeft'){
            moveTo(function (x,y,i){
                if(x - i * 5 > 0 )x = x - i * 5 ;
                return {x:x,y:y};
            });

        }
        if(currentKeypress ==='ArrowRight'){
            moveTo(function (x,y,i){
                if(x + i * 5 + this.width < screenWidth)x =x + i * 5;
                return {x:x,y:y};
            }.bind(this));
        }
        if(this.moves.length > 0){
            ctx.clearRect(this.x,this.y, this.width, this.height);
            var move = this.moves.shift();
            this.x = move.x;
            this.y = move.y;
            ctx.drawImage(this.img, move.x,move.y);
        }

    }
};