var bg, bgImg;
var balloon, balloonImg;
var jumpSound, dieSound;
var obsBottom1, obsBottom2, obsBottom3;
var obsTop1, obsTop2;
var bottomGround, topGround;
var obsTopGroup, obsBottomGroup, barGroup;
var gameState = "play";
var gameOver, gameOverImg;
var restart, restartImg;
var score = 0;
var bar;


function preload(){
    bgImg = loadImage("assets/bg.png");
    balloonImg = loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png");
    obsBottom1 = loadImage("assets/obsBottom1.png");
    obsBottom2 = loadImage("assets/obsBottom2.png");
    obsBottom3 = loadImage("assets/obsBottom3.png");
    obsTop1 = loadImage("assets/obsTop1.png");
    obsTop2 = loadImage("assets/obsTop2.png");
    gameOverImg = loadImage("assets/gameOver.png");
    restartImg = loadImage("assets/restart.png");

    jumpSound = loadSound("assets/jump.mp3");
    dieSound = loadSound("assets/die.mp3");
}

function setup(){
    createCanvas(600, 400);
    bg = createSprite(265, 375);
    bg.addImage(bgImg);
    
    balloon = createSprite(100, 200);
    balloon.addAnimation("balloon",balloonImg);
    balloon.scale = 0.2;

    topGround = createSprite(200,10,800,20);
    topGround.visible = false;

    bottomGround = createSprite(200,590,800,20);
    bottomGround.visible = false;

    gameOver = createSprite(320, 200);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.5;
    gameOver.visible = false;

    restart = createSprite(350, 240);
    restart.addImage(restartImg);
    restart.scale = 0.5;
    restart.visible = false;
    
    obsTopGroup = new Group();
    obsBottomGroup = new Group();
    barGroup = new Group();
}

function draw(){
    background(0);
    if(gameState === "play"){
        if(keyDown("SPACE")){
            balloon.velocityY = -6;
            jumpSound.play();
        }
            balloon.velocityY = balloon.velocityY + 0.5;
    
        Bar();
        spawnObsTop();
        spawnObsBottom();
    
        if(obsTopGroup.isTouching(balloon) ||
         obsBottomGroup.isTouching(balloon) ||
         topGround.isTouching(balloon) ||
         bottomGround.isTouching(balloon)){
             gameState = "end";
             dieSound.play();
         }
    }

    if(gameState ==="end"){
       gameOver.visible = true;
       restart.visible = true;
       balloon.setVelocity(0,0);
       obsTopGroup.setVelocityXEach(0);
       obsBottomGroup.setVelocityXEach(0);
       balloon.y = 200;

       obsTopGroup.setLifetimeEach(-1);
       obsBottomGroup.setLifetimeEach(-1);

       if(mousePressedOver(restart)){
           reset();
       }
    }
    drawSprites();
    Score();
}

function reset(){
    gameState = "play";
    gameOver.visible = false;
    restart.visible = false;
    obsTopGroup.destroyEach();
    obsBottomGroup.destroyEach();
    score = 0;
}
function spawnObsTop(){
    if(frameCount%80===0){
        obsTop = createSprite(600,50,40,50);
        obsTop.velocityX = -3;
        obsTop.scale = 0.1;

        obsTop.y = random(10,100);
        var rand = Math.round(random(1,2));
        switch(rand){
            case 1: obsTop.addImage(obsTop1);
                    break;
            case 2: obsTop.addImage(obsTop2);
                    break;
            default: break;
        }
        obsTop.lifetime = 300;
        obsTopGroup.add(obsTop);
    }
}

function spawnObsBottom(){
    if(frameCount%70===0){
        obsBottom = createSprite(600,350,40,50);
        obsBottom.velocityX = -3;
        obsBottom.scale = 0.07;

        var rand = Math.round(random(1,3));
        switch(rand){
            case 1: obsBottom.addImage(obsBottom1);
                    break;
            case 2: obsBottom.addImage(obsBottom2);
                    break;
            default: break;
        }
        obsBottom.lifetime = 300;
        obsBottomGroup.add(obsBottom);
    }
}

function Bar(){
    if(frameCount% 60===0){
        bar = createSprite(600,200,10,800);
        bar.velocityX = -3;
        bar.lifetime = 200;
        barGroup.add(bar);
        bar.visible = false;
    }
}

function Score(){
    if(balloon.isTouching(barGroup)){
        score = score +1;
    }
    textSize(30);
    fill("yellow");
    text("Score: "+ score, 250, 50);
}