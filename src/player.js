/**
 * Created by Kyle Tuckey on 02/11/2016.
 */


var sprite_pl = 'player_spr';

var upKey;
var downKey;
var leftKey;
var rightKey;

var side_col = {
    TOP : 1,
    BOTTOM : 2,
    LEFT : 3,
    RIGHT : 4,
    NONE : 0
}

function getPlayerSprite()
{

    return game.add.sprite(GAMEWIDTH/2, GAMEHEIGHT/2, sprite_pl);
}

function setPlayerSprite(spritePath)
{
    return game.load.image(sprite_pl, spritePath);
}

function initPlayerMovement()
{
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
}

function playerUpdate(player) {

    if(playingBool)
    {
        if(downKey.isDown)
            player.body.y += 3;
        if(upKey.isDown)
            player.body.y -= 3;
        if(leftKey.isDown)
            player.body.x -= 3;
        if(rightKey.isDown)
            player.body.x += 3;
    }
}

function enemyCollision(){
    player.x = GAMEWIDTH/2;
    player.y = GAMEHEIGHT/2;
}

function fuelCollision(){
    fuel.kill();
}

