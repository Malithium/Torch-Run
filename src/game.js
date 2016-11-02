/**
 * Created by Kyle Tuckey on 02/11/2016.
 */
var GAMEWIDTH = 600;
var GAMEHEIGHT = 600;
var player;
var enemy;
var playingBool = true;

var game = new Phaser.Game(GAMEWIDTH, GAMEHEIGHT, Phaser.AUTO, 'Torch Run',{
    preload: preload,
    create: create,
    update: update
});

function preload() {
    setPlayerSprite('../assets/Torch_man.png');
    setEnemySprite('../assets/enemy.png');
}

function create(){
    player = getPlayerSprite();
    enemy = getEnemySprite();
    initPlayerMovement();
}

function update(){
    playerUpdate(player);
}