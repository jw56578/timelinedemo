var enemy = {
    width:50,
    height:50,
    img:new Image(),
    x:150,
    y:150,
    moves:[],
    directions:['ArrowDown','ArrowLeft','ArrowRight','ArrowUp'],
    steps:0,
    direction:'',
    refresh:function(data){ 
        var ctx = data.ctx;
        var screenWidth = data.screenWidth;
        var screenHeight = data.screenHeight;

        
        if(!this.img.src){
            this.img.src = 'enemy.png';
            this.img.onload = function(){
                ctx.drawImage(this.img, this.x, this.y);
            }.bind(this)
        }

        var xToUse = this.x;
        var yToUse = this.y;
        var movesLength = this.moves.length;

        //need to keep track of last key pressed and if its different then empty moves
        var  moveTo = function(fnc){
            if(movesLength < 100){ //inertia
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

        //generate a random direction word
        //make sure it goes that way for at least 5 steps
        //slow down the animation
        
        if(this.steps === 0){
            this.steps = 30;
            var randomIndex = Math.floor(Math.random() * (4));
            this.direction = this.directions[randomIndex];
        }
        
        
        if(this.direction ==='ArrowDown'){
            moveTo(function (x,y,i){
                if((i * 5 + (y)) + this.height  < screenHeight)y = i * 5 + y;
                return {x:x,y:y};
            }.bind(this));

        }
        if(this.direction ==='ArrowUp'){
            moveTo(function (x,y,i){
                if(y-i * 5 > 0)y = y-i * 5;
                return {x:x,y:y};
            });
        }
        if(this.direction ==='ArrowLeft'){
            moveTo(function (x,y,i){
                if(x - i * 5 > 0 )x = x - i * 5 ;
                return {x:x,y:y};
            });

        }
        if(this.direction ==='ArrowRight'){
           moveTo(function (x,y,i){
                if(x + i * 5 + this.width < screenWidth)x =x + i * 5;
                return {x:x,y:y};
            }.bind(this));
        }
            
        
        this.steps --;
        if(this.moves.length > 0){
            //swith the image to another for walking
            ctx.clearRect(this.x,this.y, this.width, this.height);
            var move = this.moves.shift();
            this.x = move.x;
            this.y = move.y;
            ctx.drawImage(this.img, move.x,move.y);
        }else{
            //switch to image of not walking
        }

    }
};