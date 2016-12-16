/**
 * Created by Kyle Tuckey on 20/11/2016.
 */

var player;
var walls;
var levers;
var fuel;
var waypoints;
var enemys;
var torch;
var barSprite;
var door;
var level = 1;
var sheetCount = 0;
var currentPower = 100;
var count = 0;

var playState = {
    create: function () {
        game.time.advancedTiming = true;
        game.stage.backgroundColor = '#626A72';
        levelLoader();
    },

    update: function () {
        player.update();
        torch.update(player, walls);

        if(Math.trunc(torch.torchPower) === currentPower-10)
        {
            currentPower = Math.trunc(torch.torchPower);
            sheetCount++
        }

        enemys.forEach(function (enemy) {
            if (game.physics.arcade.overlap(torch.circleRadius, enemy, null, null)) {
                var ray = new Phaser.Line(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, player.sprite.x, player.sprite.y);
                var intercept = torch.getWallIntersection(ray, walls);
                if (!intercept)
                    enemy.state = 2;
                else
                    enemy.state = 1;
            }
            else {
                enemy.state = 1;

            }
            enemy.enUpdate(waypoints, player.sprite, false);
        });

        game.physics.arcade.collide(player.sprite, walls, null, null, this);
        game.physics.arcade.overlap(player.sprite, fuel, player.fuelCollision, null, null);
        game.physics.arcade.overlap(player.sprite, levers, player.leverCollision, null, null);
        game.physics.arcade.collide(player.sprite, door, player.doorCollision, null, null);
        game.physics.arcade.collide(player.sprite, enemys, player.enemyCollision, null, this);
    },

    render: function () {
        //game.debug.body(torch.circleRadius);
        //game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");    }
        barSprite = game.add.sprite(game.world.width / 14, 5, 'torchBar');
        barSprite.frame = sheetCount;
    }
}
