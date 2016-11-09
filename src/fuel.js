/**
 * Created by Kyle Tuckey on 05/11/2016.
 */
var sprite_fl = 'fuel_spr';

function getFuelSprite(f_x, f_y)
{
    var fuel = game.add.sprite(f_x, f_y, sprite_fl);

    fuel.anchor.setTo(0, 0);

    game.physics.enable(fuel, Phaser.Physics.ARCADE);

    return fuel;
}

function setFuelSprite(spritePath)
{
    return game.load.image(sprite_fl, spritePath);
}