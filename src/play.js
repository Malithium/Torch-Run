/**
 * Created by Kyle Tuckey on 20/11/2016.
 */
    //set up Player sprite
var player;
var walls;
var enemy;
var fuel;
var waypoints = [];

var door;
var lever;
var level = 1;

var torch;

var playState = {
    create: function(){
        game.time.advancedTiming = true;
        game.stage.backgroundColor = '#626A72';
        cursors = game.input.keyboard.createCursorKeys();
        levelLoader();
    },

    update: function() {
        player.update(cursors);
        torch.update(player, walls);

        if(game.physics.arcade.overlap(torch.circleRadius, enemy.sprite, null, null)) {
            var ray = new Phaser.Line(enemy.sprite.x + enemy.sprite.width / 2, enemy.sprite.y + enemy.height / 2, player.x + (player.width / 2 - 0.5), player.y + (player.height / 2 - 0.5));
            var intercept = torch.getWallIntersection(ray, walls);
            if (!intercept)
                enemy.sprite.state = 2;
            else
               enemy.sprite.state = 1;
        }
        else
            enemy.sprite.state = 1;

        enemy.update(waypoints, player.sprite, false);

        game.physics.arcade.collide(player.sprite, walls, null,null, this);
        game.physics.arcade.overlap(player.sprite, fuel, player.fuelCollision, null, null);
        game.physics.arcade.overlap(player.sprite, lever, player.leverCollision, null, null);
        game.physics.arcade.collide(player.sprite, door, player.doorCollision, null, null);
        game.physics.arcade.collide(player.sprite, enemy.sprite, player.enemyCollision, null, this);
        
    },

    render: function(){
        //game.debug.body(torch.circleRadius);
        game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
    }
};



function levelLoader() {
    var text = JSON.parse(game.cache.getText('level' + level));
    var wallData = text.wallData;
    var fuelData = text.fuelData;
    var wayPointData = text.wayPointData;
    
    //game groups
    walls = game.add.group();
    fuel = game.add.group();
    
    player = new Player(text.playerStart.x, text.playerStart.y, 'player_spr');
    enemy = new Enemy(text.enemyStart.x, text.enemyStart.y, 'enemy_spr');

    if (text.doorPos.x > 0 && text.doorPos.y > 0) {
        door = game.add.sprite(text.doorPos.x, text.doorPos.y, 'door_spr');
        game.physics.enable(door, Phaser.Physics.ARCADE);
    }
    else {
        door.kill();
    }    
    
    for(var w in wayPointData){
        var wayPoint = game.add.sprite(wayPointData[w].x, wayPointData[w].y, 'placeHolder_spr');
        wayPoint.id = wayPointData[w].id;
        waypoints.push(wayPoint);
        console.log("boom");
    }    
    
    lever = game.add.sprite(text.leverPos.x, text.leverPos.y, 'lever_spr');
    game.physics.enable(lever, Phaser.Physics.ARCADE);
    lever.body.immovable = true;

    for (var i in wallData) {
        walls.add(new Wall(wallData[i].x, wallData[i].y, wallData[i].state).sprite);
    }
    
    
    for (var f in fuelData) {
        fuel.add(new Fuel(fuelData[f].x, fuelData[f].y, 'fuel_spr').sprite)
    }

    torch = new Torch(player);
}

    function nextLevel() {
        walls = [];
        fuel = [];
        game.world.removeAll();
        level++
        levelLoader();
    }
