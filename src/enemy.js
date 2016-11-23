/**
 * Created by Kyle Tuckey on 02/11/2016.
 */
var Enemy = function(e_x, e_y, file, path) {
    this.sprite = game.add.sprite(e_x, e_y, file);
    this.sprite.anchor.setTo(0, 0);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.state = 0;
    this.sprite.path = path;
    this.sprite.nextPoint = this.sprite.path[0];
    this.sprite.pos = 1;
    
    this.sprite.enUpdate = function(waypoints, player, intercept)
    {
        if(this.state == 1) {
            waypoints.forEach(function (wayPoint) {

                var movementX = wayPoint.x - this.x;
                var movementY = wayPoint.y - this.y;

                //Normalise the movement

                var toWaypointLength = Math.sqrt(movementX * movementX + movementY * movementY);
                if(toWaypointLength > 0){
                    movementX = movementX / toWaypointLength;
                    movementY = movementY / toWaypointLength;
                }

                if (this.nextPoint > this.path[0]) {
                    if (wayPoint.id == this.nextPoint) {

                        this.body.x += movementX * 2;
                        this.body.y += movementY * 2;

                        if (wayPoint.x - this.x < 1 && wayPoint.y - this.y < 1 && wayPoint.x - this.x > -1 && wayPoint.y - this.y > -1) {
                            this.x = wayPoint.x;
                            this.y = wayPoint.y;
                        }
                    }
                    if (this.x == wayPoint.x && this.y == wayPoint.y) {

                        this.nextPoint++;
                        this.pos++;
                    }
                    if (this.pos > this.path.length){
                        this.pos = 1;
                        this.nextPoint = this.path[0];
                    }

                }
                else {
                    if (wayPoint.id == this.path[0]) {
                        this.body.x += movementX * 2;
                        this.body.y += movementY * 2;


                        if (this.x - wayPoint.x < 1 && this.y - wayPoint.y < 1) {
                            this.x = wayPoint.x;
                            this.y = wayPoint.y;
                        }

                         if (wayPoint.x - this.x < 1 && wayPoint.y - this.y < 1 && wayPoint.x - this.x > -1 && wayPoint.y - this.y > -1) {
                            this.x = wayPoint.x;
                            this.y = wayPoint.y;
                         }

                        if (this.x == wayPoint.x && this.y == wayPoint.y) {
                            this.nextPoint++;
                            this.pos++;
                        }
                    }
                }
            }, this);
        }
        else
        {
            if(!intercept) {
                var movementX = player.x - this.x;
                var movementY = player.y - this.y;

                var toWaypointLength = Math.sqrt(movementX * movementX + movementY * movementY);
                movementX = movementX / toWaypointLength;
                movementY = movementY / toWaypointLength;

                this.body.x += movementX * 2;
                this.body.y += movementY * 2;
            }
        }

    }



};