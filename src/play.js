/**
 * Created by Kyle Tuckey on 20/11/2016.
 */
    //set up Player sprite
var player;
var walls;
var enemy;
var fuel;
var bitmap;

var door;
var lever;
var level = 1;
var playingBool = true;
var torchText;
var torchPower;

var playState = {
    create: function(){

        game.stage.backgroundColor = '#626A72';
        cursors = game.input.keyboard.createCursorKeys();
        levelLoader();
    },

    update: function() {
        playerUpdate(player);
        torchPower -= (2.0/24.0);
        var decreaseTorch = Math.round(2.5 * torchPower);
        // Next, fill the entire light bitmap with a dark shadow color.
        bitmap.context.fillStyle = 'rgb(30, 30, 30)';
        bitmap.context.fillRect(0, 0, game.world.width, game.world.height);
        torchText.setText("Torch Power : " + Math.round(torchPower) + "%");
        var points = [];
        for(var a = 0; a < Math.PI * 2; a += Math.PI/360) {
            // Create a ray from the light to a point on the circle
            var ray = new Phaser.Line(player.x + (player.width/2 - 0.5), player.y + (player.height/2 - 0.5),
                player.x + Math.cos(a) * decreaseTorch, player.y + Math.sin(a) * decreaseTorch);

            // Check if the ray intersected any walls
            var intersect = getWallIntersection(ray);

            // Save the intersection or the end of the ray
            if (intersect) {
                points.push(intersect);
            } else {
                points.push(ray.end);
            }
        }
        bitmap.context.beginPath();

        bitmap.context.fillStyle = 'rgb('+decreaseTorch+','+decreaseTorch+','+decreaseTorch+')';

        if(torchPower <= 0){
            bitmap.context.fillStyle = 'rgb(10, 10, 10)';
            game.world.removeAll();
            levelLoader();
        }
        bitmap.context.moveTo(points[0].x, points[0].y);
        for(var i = 0; i < points.length; i++) {
            bitmap.context.lineTo(points[i].x, points[i].y);
        }
        bitmap.context.closePath();
        bitmap.context.fill();

        // This just tells the engine it should update the texture cache
        bitmap.dirty = true;
        game.physics.arcade.collide(player, walls, null,null, this);
        game.physics.arcade.collide(player, enemy, enemyCollision, null, this);
        game.physics.arcade.overlap(player, fuel, fuelCollision, null, null);
        game.physics.arcade.collide(player, door, doorCollision, null, null);
        game.physics.arcade.collide(player, lever, leverCollision, null, null);
    }
};

function levelLoader(){
    var text = JSON.parse(game.cache.getText('level' + level));
    var wallData = text.wallData;
    var fuelData = text.fuelData;
    walls = game.add.group();
    fuel = game.add.group();
    getPlayerSprite(text.playerStart.x, text.playerStart.y);
    getEnemySprite(text.enemyStart.x, text.enemyStart.y);

    if(text.doorPos.x > 0 && text.doorPos.y > 0) {
        door = game.add.sprite(text.doorPos.x, text.doorPos.y, 'door_spr');
        game.physics.enable(door, Phaser.Physics.ARCADE);
    }
    else {
        door.kill();
    }

    lever = game.add.sprite(text.leverPos.x, text.leverPos.y, 'lever_spr');
    game.physics.enable(lever, Phaser.Physics.ARCADE);
    lever.body.immovable = true;

    for(var i in wallData){
        walls.add(getWallSprite(wallData[i].x, wallData[i].y, wallData[i].state));

    }
    for(var f in fuelData){
        fuel.add(getFuelSprite(fuelData[f].x, fuelData[f].y))
    }
    bitmap = game.add.bitmapData(game.world.width, game.world.height);
    bitmap.context.fillStyle = 'rgb(255, 255, 255)';
    bitmap.context.strokeStyle = 'rgb(255, 255, 255)';

    var lightBitmap = game.add.image(0, 0, bitmap);

    lightBitmap.blendMode = Phaser.blendModes.MULTIPLY;
    torchPower = 100;
    torchText = game.add.text(game.world.centerX, 0, "Torch Power: " + Math.round(torchPower) + "%", {
        font: "11px Arial",
        fill: "#ff0044",
        align: "center"
    });
}

function nextLevel(){
    walls = [];
    fuel = [];
    game.world.removeAll();
    level++
    levelLoader();
}

function getWallIntersection(ray){
    var distanceToWall = Number.POSITIVE_INFINITY;
    var closestIntersection = null;

    walls.forEach(function(wall) {
        // Create an array of lines that represent the four edges of each wall
        if(wall.wallState == 0) {
            var lines = [
                new Phaser.Line(wall.x, wall.y, wall.x + wall.width, wall.y),
                new Phaser.Line(wall.x, wall.y, wall.x, wall.y + wall.height),
                new Phaser.Line(wall.x + wall.width, wall.y,
                    wall.x + wall.width, wall.y + wall.height),
                new Phaser.Line(wall.x, wall.y + wall.height,
                    wall.x + wall.width, wall.y + wall.height)
            ];

            for (var i = 0; i < lines.length; i++) {
                var intersect = Phaser.Line.intersects(ray, lines[i]);
                if (intersect) {
                    // Find the closest intersection
                    distance =
                        this.game.math.distance(ray.start.x, ray.start.y, intersect.x, intersect.y);
                    if (distance < distanceToWall) {
                        distanceToWall = distance;
                        closestIntersection = intersect;
                    }
                }
            }
        }
    }, this);

    return closestIntersection;
}