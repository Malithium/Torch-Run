/**
 * Created by Kyle Tuckey on 02/11/2016.
 */
var sprite_en = 'enemy_spr';

function getEnemySprite()
{
    return game.add.sprite(GAMEWIDTH - 50, GAMEHEIGHT/2, sprite_en);
}

function setEnemySprite(spritePath)
{
    return game.load.image(sprite_en, spritePath);
}

function EnemyUpdate()
{

}