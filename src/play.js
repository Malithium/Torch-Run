/**
 * Created by Kyle Tuckey on 20/11/2016.
 */
    //set up Player sprite
var player;
var walls;
var enemy;
var fuel;
var waypoints;
var enemys;

var door;
var lever;
var level = 1;

var torch;
var count = 0;
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

        enemys.forEach(function(enemy){
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

        game.physics.arcade.collide(player.sprite, walls, null,null, this);
        game.physics.arcade.overlap(player.sprite, fuel, player.fuelCollision, null, null);
        game.physics.arcade.overlap(player.sprite, lever, player.leverCollision, null, null);
        game.physics.arcade.collide(player.sprite, door, player.doorCollision, null, null);
        game.physics.arcade.collide(player.sprite, enemys, player.enemyCollision, null, this);
        
    },

    render: function(){
        //game.debug.body(torch.circleRadius);
        //game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
    }
};

var WayPoint = function(w_x, w_y, file, id){
    this.sprite = game.add.sprite(w_x, w_y, file);
    this.sprite.id = id;
};

function levelLoader() {
    var text = JSON.parse(game.cache.getText('level' + level));
    var wallData = text.wallData;
    var fuelData = text.fuelData;
    var wayPointData = text.wayPointData;
    var enemyData = text.enemyData;
    
    //game groups
    walls = game.add.group();
    fuel = game.add.group();
    waypoints = game.add.group();
    enemys = game.add.group();
    
    player = new Player(text.playerStart.x, text.playerStart.y, 'player_spr');
    //enemy = new Enemy(text.enemyStart.x, text.enemyStart.y, 'enemy_spr', [1, 2, 3]);

    if (text.doorPos.x > 0 && text.doorPos.y > 0) {
        door = game.add.sprite(text.doorPos.x, text.doorPos.y, 'door_spr');
        game.physics.enable(door, Phaser.Physics.ARCADE);
    }
    else {
        door.kill();
    }

    for(var e in enemyData){
        enemys.add(new Enemy(enemyData[e].x, enemyData[e].y, 'enemy_spr', enemyData[e].path).sprite)
    }

    for(var w in wayPointData){
        waypoints.add(new WayPoint(wayPointData[w].x, wayPointData[w].y, 'placeHolder_spr', wayPointData[w].id).sprite);
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
        waypoints = [];
        game.world.removeAll();
        level++
        levelLoader();
    }
