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
        game.load.spritesheet('player_spr', 'assets/playerSheet.png', 26, 32, 7);
        game.load.spritesheet('enemy_spr', 'assets/enemySheet.png', 32, 32, 5);
        game.load.image('fuel_spr', 'assets/fuel.png');
        game.load.spritesheet('continue_spr', 'assets/continue.png',128,64,2);
        game.load.image('play_spr', 'assets/play.png');
        game.load.image('placeHolder_spr', 'assets/placeHolder.png');
        game.load.text('level1', 'assets/levels/level1.json');
        game.load.text('level2', 'assets/levels/level2.json');
        game.load.spritesheet('torchBar','assets/torch_bar_sheet.png',113, 35, 11);
    },

    create: function() {
        game.state.start('menu');
    }
};