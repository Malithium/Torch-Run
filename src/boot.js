/**
 * Created by Kyle Tuckey on 20/11/2016.
 */
var bootState = {
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.state.start('load');
    }
}