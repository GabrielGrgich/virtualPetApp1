var dog,dogIMG
var happyDog
var database
var foodS
var foodStock

function preload()
{
	dogIMG = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database()

	createCanvas(500, 500);
  dog=createSprite(250,250,50,50);
  dog.addImage(dogIMG);
  dog.scale=.3;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  if(keyWentDown('SPACE')){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();
  //add styles here
  textSize(15);
  stroke(2);
  fill("black");
  text("food: "+foodS,20,50);
  stroke(5);
  text("Note: press space to feed dog",150,10);

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
if(x<=0){x=0}
else{x=x-1}

 database.ref('/').update({
  Food:x
 })
}



