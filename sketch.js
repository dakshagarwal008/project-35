var balloon;
var bgImage;
var database;
var position;

function preload(){

  bgImage = loadImage("Hot Air Ballon-01.png");
  balloonImage = loadImage("Hot Air Ballon-02.png")

}


function setup() {
  database = firebase.database();
  createCanvas(500,500); 
  
  balloon = createSprite(200,110,20,20);
  balloon.addImage(balloonImage);
  balloon.scale=0.4;

  var balloonRef = database.ref("balloon/position");
  balloonRef.on("value", readPosition);


}

function draw() {
  background(bgImage);  

  if(position!==undefined){
  if(keyDown(LEFT_ARROW)){

   writePosition(-1,0);


  }
  if(keyDown(RIGHT_ARROW)){

    writePosition(1,0)


  }
  if(keyDown(UP_ARROW)){

    writePosition(0,-1)


  }
  if(keyDown(DOWN_ARROW)){

    writePosition(0,+1)


  }
}

  drawSprites();
}
function readPosition(data){
  //.val() -  recieve the value
  position = data.val();
  //234,456
  balloon.x = position.x;
  balloon.y = position.y;
}

function writePosition(x,y){
  //.set() - to write the values in the database
  database.ref('balloon/position').set({
      'x': position.x + x,
      'y': position.y + y
  })
}

function showError(){

  console.log("Error in writing to the database")
  
}