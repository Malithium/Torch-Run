/**
 * Created by Kyle Tuckey on 16/12/2016.
 */
var Lever = function(l_x, l_y, file, state){
    this.sprite = game.add.sprite(l_x, l_y, file);
    this.sprite.state = state;
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.immovable = true;
}