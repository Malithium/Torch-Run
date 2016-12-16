var endState = {
    create: function(){
        game.stage.backgroundColor = '#000000';
        dead_label = game.add.text(120, GAMEHEIGHT/3, 'You have escaped the dungeon!', { font: "bold 24px Arial", fill: "#0f0", boundsAlignH: "center", boundsAlignV: "middle" });

        var button = game.add.button(GAMEWIDTH/2, GAMEHEIGHT/2, 'continue_spr', this.actionOnClick, this, 1, 2);

    },

    actionOnClick: function(){
        game.state.start('menu');
    }
}