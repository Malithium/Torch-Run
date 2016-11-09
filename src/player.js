/**
 * Created by Kyle Tuckey on 02/11/2016.
 */
var sprite_pl = 'player_spr';
var player_x;
var player_y;


function getPlayerSprite(p_x, p_y)
{
    player = game.add.sprite(p_x, p_y, sprite_pl);
    player.anchor.setTo(0, 0);
    player_x = p_x;
    player_y = p_y;
    game.physics.enable(player, Phaser.Physics.ARCADE);
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
    player.x = player_x;
    player.y = player_y;
}

function fuelCollision(player, fuel){
    fuel.kill();
}

function doorCollision(player, door){
    nextLevel();
}
