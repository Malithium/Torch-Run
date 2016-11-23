/**
 * Created by Kyle Tuckey on 02/11/2016.
 */
var Player = function(p_x, p_y, file){
    this.sprite = game.add.sprite(p_x, p_y, file);
    this.sprite.anchor.setTo(0.5, 0.5);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    
    this.update = function(cursors)
    {
        if(cursors.down.isDown)
            this.sprite.body.y += 3;
        if(cursors.up.isDown)
            this.sprite.body.y -= 3;
        if(cursors.left.isDown)
            this.sprite.body.x -= 3;
        if(cursors.right.isDown)
            this.sprite.body.x += 3;
    }  
    
    this.fuelCollision = function(player, fuel)
    {
        if(torch.torchPower + 30 > 100)
            torch.torchPower = 100;
        else
            torch.torchPower += 30;
        fuel.kill();
    }
    
    this.leverCollision = function(player, lever)
    {
        lever.loadTexture('lever_spr2');
        for(var set in walls.children){
            if(walls.children[set].wallState > 0)
            {
                walls.children[set].kill();
            }
        }
    }
    
    this.enemyCollision = function(){
        game.state.start('dead');
    }
    
    this.doorCollision = function(player, door)
    {
        nextLevel();
    }
}
