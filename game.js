/**
 * the game approach doesn't need to maintain an array of objects which represent the location
 * there can just be an array of the objects on a layer which contain the information to handle things
 * 
 * the object should store the dimensions of the space it takes up
 * the object itself can handle what it does like drawing directly to canvas or just using existing image
 * that means the object would be specific to canvas 
 * 
 * if it was the base layer it would just be an image that takes up the entire space - maybe?
 * this allows
 * 
 * */

function Entity(width,height){
    this.width = 3;
    this.height = 3;
    this.img = '';


}

window.onload = function(){
    document.addEventListener('keydown',handleKeyPress);
    initializeGame();
    refresh();
}
var currentKeypress = null;
function handleKeyPress(e){
    currentKeypress = e.key;
console.log(e);

}
var layers = [
    []
];



function initializeGame(){
    //put random thing on canvas
    
    layers[0].push(player);
    layers[0].push(enemy);


}

//what happens on animation frame
function refresh(){

    //cycle through the things and give the canvas to it
    var l = layers[0].length;
    while(l--){
        layers[0][l].refresh({ctx:ctx,screenWidth:canvasWidth,screenHeight:canvasHeight});  
    }
    requestAnimationFrame(refresh); 
    currentKeypress = null;
}
 