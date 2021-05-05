var dogImg, happyDogImg, dog, database, foodS, foodStock;
var titleImg, playImg, tutorialImg;
var title, play, tutorial;
var gameState = "menu";

function preload() {
  dogImg = loadImage("Images/Dog.png");
  happyDogImg = loadImage("Images/HappyDog.png");
  titleImg = loadImage("Images/Title.jpg");
  playImg = loadImage("Images/Play.jpg");
  tutorialImg = loadImage("Images/Tutorial.jpg");
}

function setup() {
  createCanvas(500, 500);
  //Creating all the Sprites
  dog = createSprite(250, 200, 20, 20);
  dog.addImage(dogImg);
  dog.scale = 0.25;

  title = createSprite(245, 100, 250, 50);
  title.addImage(titleImg);
  title.scale = 0.5;

  play = createSprite(244, 350, 20, 20);
  play.addImage(playImg);
  play.scale = 0.5;


  tutorial = createSprite(250, 400, 20, 20);
  tutorial.addImage(tutorialImg);
  tutorial.scale = 0.2;



  //Database related
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {
  background(46, 139, 87);

  //Menu gameState
  if (gameState == "menu") {
    title.display();
    play.display();
    if (mousePressedOver(play)) {
      gameState = "game";
    }
    if (mouseIsOver(play)) {
      cursor(HAND);
      play.scale = 0.6;
    } else {
      cursor(ARROW);
      play.scale = 0.5;
    }
  }

  //Game gameState
  if (gameState == "game") {
    dog.display();
    tutorial.display();
    cursor(ARROW);

    if (keyWentDown(UP_ARROW)) {
      writeStock(foodS);
      dog.addImage(happyDogImg);
    }

    textStyle(BOLD);
    fill("white");

    if (foodS != 0) {
      textSize(30);
      fill("yellow");
      stroke(0);
      strokeWeight(6);
      textFont("Georgia");
      textStyle(BOLD);
      text("Food Packages Left :  " + foodS, 75, 50);
    } else {
      textSize(25);
      fill("yellow");
      stroke(0);
      strokeWeight(6);
      textFont("Georgia");
      textStyle(BOLD);
      text("No Food Left - Your pet may die", 50, 50)
    }
    if (foodS == 0) {
      dog.rotation = 90;
      dog.addImage(happyDogImg);
    }

  }
}


function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {

  if (x <= 0) {
    x = 0
  } else {
    x = x - 1;
  }

  database.ref('/').update({
    Food: x
  });
}
