/**
 * Created by Kyle Tuckey on 05/11/2016.
 */
var sprite_wl = 'wall_spr';

function getWallSprite()
{
    return game.add.sprite(GAMEWIDTH/2, GAMEHEIGHT - 50, sprite_wl);
}

function setWallSprite(spritePath)
{
    return game.load.image(sprite_wl, spritePath);
}