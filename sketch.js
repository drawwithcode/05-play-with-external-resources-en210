var fft;
var newmsc;
var filter;
var fltrbss;
var img;
function preload(){
  newmsc=loadSound('./assets/BACH.mp3')
  img=loadImage('./assets/sfondo.jpg')
}

function setup() {
   createCanvas(windowWidth,windowHeight);
   noFill();


frameRate(10)

   fft = new p5.FFT(0,128);
   vl= new p5.Amplitude();
   newmsc.play()
   fft.setInput(newmsc);
}

function draw() {


  var filter = new p5.LowPass();


  if(mouseX<width/10){fltrbss=1}
  else if(mouseX<width/3){fltrbss=500}
  else{fltrbss=30000}

  filter.set(fltrbss);
  newmsc.disconnect();
  newmsc.connect(filter);




   var spectrum = fft.analyze();
   var vol= vl.getLevel()
   var volmap = map(vol,-1,1,0,255)


           image(img,0,0,width,height);
           tint(spectrum[16],spectrum[10],150)
var test=300


strokeWeight(0)


   for (h = 0; h<spectrum.length; h++) {
     for (i = 0; i<spectrum.length; i++) {
     if(spectrum[h]<10){stroke('red')}
     else if(spectrum[i]==0){stroke('yellow')}
     else{fill(spectrum[i],spectrum[h],150)

     if(fltrbss==1){ellipse((spectrum[i]/10)+spectrum[h],h*25,20)}
     if(fltrbss==500){ellipse(spectrum[i]+spectrum[h],h*25,20)}
     if(fltrbss==30000){ellipse((spectrum[i]*4)+spectrum[h],h*25,20)}
    }
       ;}}

//
//     console.log()
//
// text(mouseX*20,600,100)
// text(spectrum[test],600,120)
// text(volmap,600,140)
// text(map(mouseX,0,width,10,22050),600,160)
colorMode(RGB)
noFill()
}
