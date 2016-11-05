/**
 * Created by Kyle Tuckey on 02/11/2016.
 */
var sprite_pl = 'player_spr';

function getPlayerSprite()
{
    return game.add.sprite(GAMEWIDTH/2, GAMEHEIGHT/2, sprite_pl);
}

function setPlayerSprite(spritePath)
{
    return game.load.image(sprite_pl, spritePath);
}

function playerUpdate(player) {

    if(playingBool)
    {
        if(cursors.down.isDown)
            player.body.y += 3;
        if(cursors.up.isDown)
            player.body.y -= 3;
        if(cursors.left.isDown)
            player.body.x -= 3;
        if(cursors.right.isDown)
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

