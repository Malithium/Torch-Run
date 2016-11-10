/**
 * Created by Kyle Tuckey on 05/11/2016.
 */
function getWallSprite(w_x, w_y, state)
{
    if(state == 0)
        var wall = game.add.sprite(w_x, w_y, 'wall_spr');
    else
        var wall = game.add.sprite(w_x, w_y, 'gate_spr');

    wall.anchor.setTo(0, 0);
    game.physics.enable(wall, Phaser.Physics.ARCADE);
    wall.body.immovable = true;
    wall.wallState = state;

    return wall;
}