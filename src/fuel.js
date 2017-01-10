/**
 * Created by Kyle Tuckey on 05/11/2016.
 */
var Fuel = function(f_x, f_y, file){
    this.sprite = game.add.sprite(f_x, f_y, file);
    this.sprite.anchor.setTo(0, 0);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
};