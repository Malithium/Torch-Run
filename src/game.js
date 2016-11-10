/**
 * Created by Kyle Tuckey on 02/11/2016.
 */
var GAMEWIDTH = 544;
var GAMEHEIGHT = 544;
var player;
var walls;
var enemy;
var fuel;
var bitmap;
var door;
var level = 1;
var playingBool = true;

var game = new Phaser.Game(GAMEWIDTH, GAMEHEIGHT, Phaser.AUTO, 'Torch Run',{
    preload: preload,
    create: create,
    update: update
});

function preload() {
    setPlayerSprite('assets/player.png');
    setEnemySprite('assets/enemy.png');
    setWallSprite('assets/wall.png');
    setFuelSprite('assets/fuel.png');
    game.load.image('door_spr', 'assets/door.png')
    game.load.text('level1', 'assets/levels/level1.json');
    game.load.text('level2', 'assets/levels/level2.json');
}

function create(){
    game.stage.backgroundColor = 0x4488cc;
    cursors = game.input.keyboard.createCursorKeys();
    levelLoader();
    bitmap = game.add.bitmapData(GAMEWIDTH, GAMEHEIGHT)
    bitmap.context.fillStyle = 'rgb(255, 255, 255)';
    bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
    var lightBitmap = game.add.image(0, 0, bitmap);
    lightBitmap.blendMode = Phaser.blendModes.MULTIPLY;

}

function update(){
    playerUpdate(player);

    // Next, fill the entire light bitmap with a dark shadow color.
    bitmap.context.fillStyle = 'rgb(50, 50, 50)';
    bitmap.context.fillRect(0, 0, GAMEWIDTH, GAMEHEIGHT);

    // Ray casting!
    // Cast rays at intervals in a large circle around the light.
    // Save all of the intersection points or ray end points if there was no intersection.
    var points = [];
    for(var a = 0; a < Math.PI * 2; a += Math.PI/360) {
        // Create a ray from the light to a point on the circle
        var ray = new Phaser.Line(player.x, player.y,
            player.x + Math.cos(a) * 1000, player.y + Math.sin(a) * 1000);

        // Check if the ray intersected any walls
        var intersect = getWallIntersection(ray);

        // Save the intersection or the end of the ray
        if (intersect) {
            points.push(intersect);
        } else {
            points.push(ray.end);
        }
    }

    // Connect the dots and fill in the shape, which are cones of light,
    // with a bright white color. When multiplied with the background,
    // the white color will allow the full color of the background to
    // shine through.
    bitmap.context.beginPath();
    bitmap.context.fillStyle = 'rgb(255, 255, 255)';
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

}

function levelLoader(){
    var text = JSON.parse(game.cache.getText('level' + level));
    var wallData = text.wallData;
    var fuelData = text.fuelData;
    walls = game.add.group();
    fuel = game.add.group()
    getPlayerSprite(text.playerStart.x, text.playerStart.y);
    getEnemySprite(text.enemyStart.x, text.enemyStart.y);

    if(text.doorPos.x > 0 && text.doorPos.y > 0) {
        door = game.add.sprite(text.doorPos.x, text.doorPos.y, 'door_spr');
        game.physics.enable(door, Phaser.Physics.ARCADE);
    }
    else {
        door.kill();
    }

    for(var i in wallData){
        walls.add(getWallSprite(wallData[i].x, wallData[i].y));
    }

    for(var f in fuelData){
        fuel.add(getFuelSprite(fuelData[f].x, fuelData[f].y))
    }
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

    // For each of the walls...
    walls.forEach(function(wall) {
        // Create an array of lines that represent the four edges of each wall
        var lines = [
            new Phaser.Line(wall.x, wall.y, wall.x + wall.width, wall.y),
            new Phaser.Line(wall.x, wall.y, wall.x, wall.y + wall.height),
            new Phaser.Line(wall.x + wall.width, wall.y,
                wall.x + wall.width, wall.y + wall.height),
            new Phaser.Line(wall.x, wall.y + wall.height,
                wall.x + wall.width, wall.y + wall.height)
        ];

        // Test each of the edges in this wall against the ray.
        // If the ray intersects any of the edges then the wall must be in the way.
        for(var i = 0; i < lines.length; i++) {
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
    }, this);

    return closestIntersection;
}

