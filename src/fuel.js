/**
 * Created by Kyle Tuckey on 05/11/2016.
 */
var sprite_fl = 'fuel_spr';

function getFuelSprite()
{
    return game.add.sprite(GAMEWIDTH - 80, GAMEHEIGHT - 60, sprite_fl);
}

function setFuelSprite(spritePath)
{
    return game.load.image(sprite_fl, spritePath);
}