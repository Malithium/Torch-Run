/**
 * Created by Kyle Tuckey on 05/11/2016.
 */
var Wall = function(w_x, w_y, state){
    this.state = state;   
    
    if(this.state == 0)
        this.sprite = game.add.sprite(w_x, w_y, 'wall_spr');
    else
        this.sprite = game.add.sprite(w_x, w_y, 'gate_spr');

    this.sprite.anchor.setTo(0, 0);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.immovable = true;
    this.sprite.wallState = state;
}