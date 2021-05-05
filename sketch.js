var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var lastfeed;
var doglastfeed;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

lastfeed=database.ref('FeedTime');
lastfeed.on("value",readlastfeed);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  FeedFood=createButton("Feed the dog");
  FeedFood.position(600,95);
  FeedFood.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
 fill("white")
  //write code to display text lastFed time here
if(doglastfeed>=12){
  text("last feed:"+doglastfeed%12+"PM",300,30)
}

else if(doglastfeed===0){
  text("last feed"+12+"AM",300,30)
}

else{
  text("last feed:"+doglastfeed+"AM",300,30)
}
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  doglastfeed=hour();
  foodS--;
  database.ref('/').update({
    Food:foodS
  })

  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function readlastfeed(data){
  doglastfeed=data.val();
}



