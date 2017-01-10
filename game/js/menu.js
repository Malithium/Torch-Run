/**
 * Created by Kyle Tuckey on 20/11/2016.
 */
var menuState = {
    create: function() {
        var nameLabel = game.add.text(80,80,'Torch Run', {font:'50px Arial', fill:'#ffffff'});
        var startLabel = game.add.text(80, game.world.height-80,'click the screen to move', {font: '25px Arial', fill: '#ffffff'});
        var button = game.add.button(game.world.width/2, game.world.height/1.5, 'play_spr', this.start)
        if(game.input.mousePointer.isDown)
            game.state.start('play');
    },

    start: function() {
        game.state.start('play');
    }
}