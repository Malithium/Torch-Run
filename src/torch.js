/**
 * Created by Kyle Tuckey on 21/11/2016.
 */
var Torch = function(player)
{
    this.torchPower = 100;
    this.circleRadius = game.add.sprite(player.sprite.x - player.sprite.width / 2, player.sprite.y, 'placeHolder_spr');
    game.physics.enable(this.circleRadius, Phaser.Physics.ARCADE);
    this.circleRadius.anchor.setTo(0.5, 0.5);
    this.circleRadius.body.setCircle(30);
    this.circleRadius.body.x = this.circleRadius.x - this.circleRadius.width / 2;
    this.circleRadius.body.y = this.circleRadius.y - this.circleRadius.height / 2;

    this.bitmap = game.add.bitmapData(game.world.width, game.world.height);
    this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
    this.bitmap.context.strokeStyle = 'rgb(255, 255, 255)';

    this.lightBitmap = game.add.image(0, 0, this.bitmap);
    this.lightBitmap.blendMode = Phaser.blendModes.MULTIPLY;
    this.torchText = game.add.text(game.world.centerX, 0, "Torch Power: " + Math.round(this.torchPower) + "%", {
        font: "11px Arial",
        fill: "#ff0044",
        align: "center"
    });

    this.update = function(player, walls)
    {
        this.torchPower -= (2.0/24.0);

        var decreaseTorch = Math.round(2.5 * this.torchPower);
        var outerShadow = Math.round(decreaseTorch/10);

        // Next, fill the entire light bitmap with a dark shadow color.
        this.bitmap.context.fillStyle = 'rgb('+outerShadow+','+outerShadow+','+outerShadow+')';
        //bitmap.context.fillStyle = 'rgb(255,255,255)';
        this.bitmap.context.fillRect(0, 0, game.world.width, game.world.height);
        this.torchText.setText("Torch Power : " + Math.round(this.torchPower) + "%");

        this.circleRadius.body.setCircle(decreaseTorch);

        this.circleRadius.body.x = player.sprite.x  - decreaseTorch;
        this.circleRadius.body.y = player.sprite.y  - decreaseTorch;

        var points = [];
        for(var a = 0; a < Math.PI * 2; a += Math.PI/360) {
            // Create a ray from the light to a point on the circle
            var ray = new Phaser.Line(player.sprite.x + (player.sprite.width/2 - 0.5), player.sprite.y + (player.sprite.height/2 - 0.5),
                player.sprite.x + Math.cos(a) * decreaseTorch, player.sprite.y + Math.sin(a) * decreaseTorch);

            // Check if the ray intersected any walls
            var intersect = this.getWallIntersection(ray, walls);

            // Save the intersection or the end of the ray
            if (intersect) {
                points.push(intersect);
            } else {
                points.push(ray.end);
            }
        }
        this.bitmap.context.beginPath();

        this.bitmap.context.fillStyle = 'rgb('+decreaseTorch+','+decreaseTorch+','+decreaseTorch+')';

        if(this.torchPower <= 0){
            game.state.start('dead');
        }
        this.bitmap.context.moveTo(points[0].x, points[0].y);
        for(var i = 0; i < points.length; i++) {
            this.bitmap.context.lineTo(points[i].x, points[i].y);
        }
        this.bitmap.context.closePath();
        this.bitmap.context.fill();

        // This just tells the engine it should update the texture cache
        this.bitmap.dirty = true;

    };

    this.getWallIntersection = function(ray, walls) {
        var distanceToWall = Number.POSITIVE_INFINITY;
        var closestIntersection = null;

        walls.forEach(function (wall) {
            // Create an array of lines that represent the four edges of each wall
            if (game.physics.arcade.overlap(this.circleRadius, wall, null, null, null)) {
                if (wall.wallState == 0) {
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
                                game.math.distance(ray.start.x, ray.start.y, intersect.x, intersect.y);
                            if (distance < distanceToWall) {
                                distanceToWall = distance;
                                closestIntersection = intersect;
                            }
                        }
                    }
                }

            }

        }, this);

        return closestIntersection;
    }
}