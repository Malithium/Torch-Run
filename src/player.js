/**
 * Created by Kyle Tuckey on 02/11/2016.
 */
var Player = function(p_x, p_y, file){
    this.sprite = game.add.sprite(p_x, p_y, file);
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.animations.add('idle');
    this.sprite.animations.play('idle', 10, true);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    
    this.update = function()
    {
        if(game.input.pointer1.isDown || game.input.mousePointer.isDown)
        {
            game.physics.arcade.moveToPointer(this.sprite, 200);

            if(Phaser.Rectangle.contains(this.sprite.body, game.input.x, game.input.y))
            {
                this.sprite.body.velocity.setTo(0,0);
            }
        }
        else
        {
            this.sprite.body.velocity.setTo(0, 0);
        }
    }  
    
    this.fuelCollision = function(player, fuel)
    {
        if(torch.torchPower + 30 > 100){
            torch.torchPower = 100;
            currentPower = 100;
            sheetCount = 0;
        }
        else {
            torch.torchPower += 30;
            currentPower += 30;
            sheetCount -=3;
        }


        fuel.kill();
    }
    
    this.leverCollision = function(player, lever)
    {
        lever.loadTexture('lever_spr2');
        for(var set in walls.children){
            if(walls.children[set].wallState > 0)
            {
                if(lever.state == walls.children[set].wallState)
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
