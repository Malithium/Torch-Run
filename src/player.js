/**
 * Created by Kyle Tuckey on 02/11/2016.
 */
var sprite_pl = 'player_spr';

var upKey;
var downKey;
var leftKey;
var rightKey;

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
        if(downKey.isDown && !enemyCollision())
            player.y += 2;
        else if(downKey.isDown && enemyCollision())
            player.y -= 3;

        if(upKey.isDown && !enemyCollision())
            player.y -= 2;
        else if(upKey.isDown && enemyCollision())
            player.y += 3;

        if(leftKey.isDown && !enemyCollision())
            player.x -= 2;
        else if(leftKey.isDown && enemyCollision())
            player.x += 3;

        if(rightKey.isDown && !enemyCollision())
            player.x += 2;
        else if(rightKey.isDown && enemyCollision())
            player.x -= 3;
    }
}

function enemyCollision()
{
    var PL_left_col = player.x;
    var PL_right_col = player.x + player.width;
    var PL_top_col = player.y
    var PL_bottom_col = player.y + player.height;


    var EN_left_col = enemy.x;
    var EN_right_col = enemy.x + enemy.width;
    var EN_top_col = enemy.y
    var EN_bottom_col = enemy.y + enemy.height;

    if(PL_bottom_col <= EN_top_col)
        return false;

    if(PL_top_col >= EN_bottom_col)
        return false;

    if(PL_right_col <= EN_left_col)
        return false;

    if(PL_left_col >= EN_right_col)
        return false;

    return true;
}


