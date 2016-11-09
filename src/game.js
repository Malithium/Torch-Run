/**
 * Created by Kyle Tuckey on 02/11/2016.
 */
var GAMEWIDTH = 176;
var GAMEHEIGHT = 176;
var player;
var walls;
var enemy;
var fuel;
var door;
var level = 1;
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
    game.load.image('door_spr', '../assets/door.png')
    game.load.text('level1', '../assets/levels/level1.json');
    game.load.text('level2', '../assets/levels/level2.json');
}

function create(){


    cursors = game.input.keyboard.createCursorKeys();
    levelLoader();
}

function update(){
    playerUpdate(player);
    game.physics.arcade.collide(player, walls, null,null, this);
    game.physics.arcade.collide(player, enemy, enemyCollision, null, this);
    game.physics.arcade.overlap(player, fuel, fuelCollision, null, null);
    game.physics.arcade.collide(player, door, doorCollision, null, null);
}

function levelLoader(){
    var text = JSON.parse(game.cache.getText('level' + level));
    var wallData = text.wallData;
    var fuelData = text.fuelData;
    walls = game.add.group();
    fuel = game.add.group()
    getPlayerSprite(text.playerStart.x, text.playerStart.y);
    getEnemySprite(text.enemyStart.x, text.enemyStart.y);

    if(text.doorPos.x > 0 && text.doorPos.y > 0) {
        door = game.add.sprite(text.doorPos.x, text.doorPos.y, 'door_spr');
        game.physics.enable(door, Phaser.Physics.ARCADE);
    }
    else {
        door.kill();
    }

    for(var i in wallData){
        walls.add(getWallSprite(wallData[i].x, wallData[i].y));
    }

    for(var f in fuelData){
        fuel.add(getFuelSprite(fuelData[f].x, fuelData[f].y))
    }
    console.log(wallData);
}

function nextLevel(){
    walls = [];
    fuel = [];
    game.world.removeAll();
    level++
    levelLoader();
}