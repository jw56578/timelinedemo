

function main(){
  refreshCanvas({
    ctx : ctx,
    width:canvasWidth,
    height:canvasHeight,
    imageData: imageData,
    r:3,
    g:44,
    b:88,
    a:255
  });
  requestAnimationFrame(main); 
}

var refreshCanvas = function(settings){

    var buf;
    var buf8;
    var data;
    var cellWidth;

    buf = new ArrayBuffer(settings.imageData.data.length);
    buf8 = new Uint8ClampedArray(buf);
    data = new Uint32Array(buf);


    var screen = settings.screen;
    for (var y = 0; y < settings.height; ++y) {
      for (var x = 0; x < settings.width; ++x) {
          var index = y * settings.width + x;
          
          //value = value & 0xff;
          data[y * settings.width + x] =
              (settings.a   << 24) |    // alpha
              (settings.b << 16) |    // blue
              (settings.g <<  8) |    // green
              settings.r;            // red
      }
    }
    settings.imageData.data.set(buf8);
    settings.ctx.putImageData(settings.imageData, 0, 0);

    
}