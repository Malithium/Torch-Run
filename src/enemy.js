/**
 * Created by Kyle Tuckey on 02/11/2016.
 */
var sprite_en = 'enemy_spr';

function getEnemySprite()
{
    return game.add.sprite(GAMEWIDTH/2, GAMEHEIGHT - 50, sprite_en);
}

function setEnemySprite(spritePath)
{
    return game.load.image(sprite_en, spritePath);
}

function EnemyUpdate()
{

}