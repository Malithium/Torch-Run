/**
 * Created by Kyle Tuckey on 02/11/2016.
 */
var sprite_en = 'enemy_spr';

function getEnemySprite(e_x, e_y)
{
    enemy = game.add.sprite(e_x, e_y, sprite_en);
    enemy.anchor.setTo(0, 0);

    game.physics.enable(enemy, Phaser.Physics.ARCADE);
}

function setEnemySprite(spritePath)
{
    return game.load.image(sprite_en, spritePath);
}

function EnemyUpdate()
{

}