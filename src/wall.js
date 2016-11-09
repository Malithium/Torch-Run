/**
 * Created by Kyle Tuckey on 05/11/2016.
 */
var sprite_wl = 'wall_spr';

function getWallSprite(w_x, w_y)
{
    var wall = game.add.sprite(w_x, w_y, sprite_wl);
    wall.anchor.setTo(0, 0);
    game.physics.enable(wall, Phaser.Physics.ARCADE);
    wall.body.immovable = true;
    return wall;
}

function setWallSprite(spritePath)
{
    return game.load.image(sprite_wl, spritePath);
}