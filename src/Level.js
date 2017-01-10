/**
 * Created by Kyle Tuckey on 16/12/2016.
 */
function levelLoader() {
//read in the level's JSON file and grab each elements data
    if(JSON.parse(game.cache.getText('level' + level))){
        var text = JSON.parse(game.cache.getText('level' + level));
        var wallData = text.wallData;
        var fuelData = text.fuelData;
        var wayPointData = text.wayPointData;
        var enemyData = text.enemyData;
        var leverData = text.leverData;

        currentPower = 100;
        sheetCount = 0;

        walls = game.add.group();
        fuel = game.add.group();
        waypoints = game.add.group();
        enemys = game.add.group();
        levers = game.add.group();
        //create a new instance of our Player class
        player = new Player(text.playerStart.x, text.playerStart.y, 'player_spr');
        //enemy = new Enemy(text.enemyStart.x, text.enemyStart.y, 'enemy_spr', [1, 2, 3]);

        door = game.add.sprite(text.doorPos.x, text.doorPos.y, 'door_spr');
        game.physics.enable(door, Phaser.Physics.ARCADE);

        //generate each enemy using the JSON data and add it to the enemys group
        if(typeof enemyData !== 'undefined' && enemyData.length > 0) {
            for (var e in enemyData) {
                enemys.add(new Enemy(enemyData[e].x, enemyData[e].y, 'enemy_spr', enemyData[e].path).sprite)
            }
        }

        //genereate waypoints using the JSON data and add it to the waypoints group
        if(typeof wayPointData !== 'undefined' && wayPointData.length > 0) {
            for (var w in wayPointData) {
                waypoints.add(new WayPoint(wayPointData[w].x, wayPointData[w].y, 'placeHolder_spr', wayPointData[w].id).sprite);
            }
        }


        if(typeof leverData !== 'undefined' && leverData.length > 0)
        {
            for(var l in leverData)
            {
                levers.add(new Lever(leverData[l].x, leverData[l].y, 'lever_spr', leverData[l].state).sprite)
            }
        }

        //generate walls using the JSON data and add it to the walls group
        if(typeof wallData !== 'undefined' && wallData.length > 0) {
            for (var i in wallData) {
                walls.add(new Wall(wallData[i].x, wallData[i].y, wallData[i].state).sprite);
            }
        }

        //generate fuel
        if(typeof fuelData !== 'undefined' && fuelData.length > 0) {
            for (var f in fuelData) {
                fuel.add(new Fuel(fuelData[f].x, fuelData[f].y, 'fuel_spr').sprite)
            }
        }

        //initialise the torch
        torch = new Torch(player);
    }
    else
    {
        level = 1;
        game.state.start('end');
    }
}

function nextLevel() {
    walls = [];
    fuel = [];
    waypoints = [];
    level++
    game.world.removeAll();
    levelLoader();
}