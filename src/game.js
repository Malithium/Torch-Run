/**
 * Created by Kyle Tuckey on 02/11/2016.
 */
var GAMEWIDTH = 600;
var GAMEHEIGHT = 600;
var player;
var wall;
var enemy;
var fuel;
var playingBool = true;

var game = new Phaser.Game(GAMEWIDTH, GAMEHEIGHT, Phaser.AUTO, 'Torch Run',{
    preload: preload,
    create: create,
    update: update
});

function preload() {
    setPlayerSprite('../assets/player.png');
    setEnemySprite('../assets/enemy.png');
    setWallSprite('../assets/wall.png');
    setFuelSprite('../assets/fuel.png');
}

function create(){

    player = getPlayerSprite();
    wall = getWallSprite();
    enemy = getEnemySprite();
    fuel = getFuelSprite();
    game.physics.enable(player, Phaser.Physics.ARCADE);
    game.physics.enable(wall, Phaser.Physics.ARCADE);
    game.physics.enable(enemy, Phaser.Physics.ARCADE);
    game.physics.enable(fuel, Phaser.Physics.ARCADE);
    wall.body.immovable = true;
    initPlayerMovement();
}

function update(){
    playerUpdate(player);
    game.physics.arcade.collide(player, wall, null,null, this);
    game.physics.arcade.collide(player, enemy, enemyCollision, null, this);
    game.physics.arcade.collide(player, fuel, fuelCollision, null, null);
}