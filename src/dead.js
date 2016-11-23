/**
 * Created by Kyle Tuckey on 23/11/2016.
 */
var deadState = {
    create: function(){
        game.stage.backgroundColor = '#000000';
        dead_label = game.add.text(120, GAMEHEIGHT/3, 'The dungeon has claimed you!', { font: "bold 24px Arial", fill: "#f00", boundsAlignH: "center", boundsAlignV: "middle" });

        var button = game.add.button(GAMEWIDTH/2, GAMEHEIGHT/2, 'continue_spr', this.actionOnClick, this, 1, 2);

    },

    actionOnClick: function(){
        game.state.start('play');
    }
}