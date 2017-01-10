/**
 * Created by Kyle Tuckey on 23/11/2016.
 */
var WayPoint = function(w_x, w_y, file, id){
    this.sprite = game.add.sprite(w_x, w_y, file);
    this.sprite.id = id;
};
