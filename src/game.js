/**
 * Created by Kyle Tuckey on 02/11/2016.
 */
var GAMEWIDTH = 544;
var GAMEHEIGHT = 544;

var game = new Phaser.Game(GAMEWIDTH, GAMEHEIGHT, Phaser.AUTO, 'Torch Run');
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('dead', deadState);
game.state.add('end', endState);


game.state.start('boot');
