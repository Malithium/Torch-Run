/**
 * Created by Kyle Tuckey on 20/11/2016.
 */
var loadState = {
    preload: function() {
        game.load.image('wall_spr', 'assets/wall.png');
        game.load.image('gate_spr', 'assets/gate.png');
        game.load.image('door_spr', 'assets/door.png');
        game.load.image('lever_spr', 'assets/lever.png');
        game.load.image('lever_spr2', 'assets/lever2.png');
        game.load.image('player_spr', 'assets/player.png');
        game.load.image('enemy_spr', 'assets/enemy.png');
        game.load.image('fuel_spr', 'assets/fuel.png');
        game.load.image('placeHolder_spr', 'assets/placeHolder.png');
        game.load.text('level1', 'assets/levels/level1.json');
        game.load.text('level2', 'assets/levels/level2.json');
    },

    create: function() {
        game.state.start('menu');
    }
};