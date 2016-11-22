/**
 * Created by Kyle Tuckey on 02/11/2016.
 */
var Enemy = function(e_x, e_y, file) {
    this.sprite = game.add.sprite(e_x, e_y, file);
    this.sprite.anchor.setTo(0, 0);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.nextPoint = 1;
    this.sprite.state;
    
    this.update = function(waypoints, player, intercept)
    {
        if(this.sprite.state === 1) {
            waypoints.forEach(function (wayPoint) {
                var movementX = wayPoint.x - this.sprite.x;
                var movementY = wayPoint.y - this.sprite.y;

                //Normalise the movement
                var toWaypointLength = Math.sqrt(movementX * movementX + movementY * movementY);
                movementX = movementX / toWaypointLength;
                movementY = movementY / toWaypointLength;
                if (this.sprite.nextPoint > 1) {
                    if (wayPoint.id == this.sprite.nextPoint) {
                        this.sprite.body.x += movementX * 2;
                        this.sprite.body.y += movementY * 2;


                        if (wayPoint.x - this.sprite.x < 1 && wayPoint.y - this.sprite.y < 1) {
                            this.sprite.x = wayPoint.x;
                            this.sprite.y = wayPoint.y;
                        }
                    }
                    if (this.sprite.x == wayPoint.x && this.sprite.y == wayPoint.y) {
                        this.sprite.nextPoint++;
                    }
                    if (this.sprite.nextPoint > waypoints.length)
                        this.sprite.nextPoint = 1;
                }
                else {
                    if (wayPoint.id == 1) {
                        this.sprite.body.x += movementX * 2;
                        this.sprite.body.y += movementY * 2;

                        if (this.sprite.x - wayPoint.x < 1 && this.sprite.y - wayPoint.y < 1) {
                            this.sprite.x = wayPoint.x;
                            this.sprite.y = wayPoint.y;
                        }

                        if (this.sprite.x == wayPoint.x && this.sprite.y == wayPoint.y) {
                            this.sprite.nextPoint++;
                        }
                    }
                }
            }, this);
        }
        else
        {
            if(!intercept) {
                var movementX = player.x - this.sprite.x;
                var movementY = player.y - this.sprite.y;

                var toWaypointLength = Math.sqrt(movementX * movementX + movementY * movementY);
                movementX = movementX / toWaypointLength;
                movementY = movementY / toWaypointLength;

                this.sprite.body.x += movementX * 2;
                this.sprite.body.y += movementY * 2;
            }
        }

    }


    
};