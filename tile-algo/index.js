var WIDTH = 5;
var GRID_SIZE = 100;
var INTERVAL = 10;
var NUM_GRIDS = 30;

var Grid = function(row, col) {
    this.row = row;
    this.col = col;
}

var Post = function(tiles) {
    this.tiles = tiles;
    for (index in tiles) {

    }
}

function randomColor() {
    var R = Math.floor(Math.random() * 255);
    var G = Math.floor(Math.random() * 255);
    var B = Math.floor(Math.random() * 255);
    return [ R, G, B, 0.3 ];
}

function sizeInvalid(h, w) {
    if (h + w > WIDTH + 2) { // too large
        return true;
    }

    if (h >= WIDTH - 1 || w >= WIDTH - 1) {
        return true;
    }

    if (h / w > 2 || w / h > 2) {
        return true;
    }

    if (h == 1 || w == 1) {
        if (Math.random() < 0.8) {
            return true;
        } else {
            return false;
        }
    }

    if (w == WIDTH) {
        return true;
    }
    return false;
}

function randomSize(maxWidth) {
    do {
        var w = Math.floor(Math.random() * maxWidth + 1);
        var h = Math.floor(Math.random() * 3 + 1);
    } while (sizeInvalid(h, w));
    return [ h, w ];
}

function getNextFreeGrid() {
    for (var i = 0; i < 50; i++) {
        for (var j = 0; j < WIDTH; j++) {
            if (grids[i][j] == false) {
                return [ i, j ]
            }
        }
    }
    return null;
}

function getMaxWidth(row, col) {
    var i;
    for (i = col; i < WIDTH; i++) {
        if (grids[row][i]) { // occupied
            return i - col;
        }
    }
    return WIDTH - col;
}

var grids = [ ];

for (var i = 0; i < 50; i++) {
    grids[i] = [ ];
    for (var j = 0; j < WIDTH; j++) {
        grids[i][j] = false;
    }
}

function generatePosts() {
    var g = getNextFreeGrid();
    var startRow = g[0];
    var startCol = g[1];

    var size = randomSize(getMaxWidth(startRow, startCol));
    var spanRow = size[0];
    var spanCol = size[1];

    var color = randomColor();

    for (var j = startRow; j < startRow + spanRow; j++) {
        for (var k = startCol; k < startCol + spanCol; k++) {
            grids[j][k] = true;
            /*
            var id = "" + k + j;

            $("#" + id).css('left', k * 100);
            $("#" + id).css('top', j * 100);

            $("#" + id).css('background', 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + 1 + ')');
            */
        }
    }

    var id = "" + startRow + startCol;
    $("#wrapper").append("<div id='" + id + "' class='grid'></div>");
    var left = startCol * (GRID_SIZE + INTERVAL);
    var top = startRow * (GRID_SIZE + INTERVAL);
    var width = spanCol * GRID_SIZE + (spanCol - 1) * INTERVAL;
    var height = spanRow * GRID_SIZE + (spanRow - 1) * INTERVAL;

    $("#" + id).css('left', left);
    $("#" + id).css('top', top);
    $("#" + id).css('width', width);
    $("#" + id).css('height', height);
    $("#" + id).css('background', 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + 1 + ')');
}

plans = [ ];

plans[1] = [
    [
        { row: 0, col: 0, width: 5, height: 3 },
    ],
    [
        { row: 0, col: 0, width: 5, height: 4 },
    ],
];

plans[2] = [
    [
        { row: 0, col: 0, width: 3, height: 3 },
        { row: 0, col: 3, width: 2, height: 3 },
    ],
    [
        { row: 0, col: 0, width: 2, height: 3 },
        { row: 0, col: 2, width: 3, height: 3 },
    ],
];

plans[3] = [
    [
        { row: 0, col: 0, width: 3, height: 4 },
        { row: 0, col: 3, width: 2, height: 2 },
        { row: 2, col: 3, width: 2, height: 2 },
    ],
    [
        { row: 0, col: 0, width: 2, height: 2 },
        { row: 2, col: 0, width: 2, height: 2 },
        { row: 0, col: 2, width: 3, height: 4 },
    ],
    [
        { row: 0, col: 0, width: 5, height: 3 },
        { row: 3, col: 0, width: 2, height: 2 },
        { row: 3, col: 2, width: 3, height: 2 },
    ],
];

plans[4] = [
    [
        { row: 0, col: 0, width: 3, height: 2 },
        { row: 0, col: 3, width: 2, height: 2 },
        { row: 2, col: 0, width: 2, height: 2 },
        { row: 2, col: 2, width: 3, height: 2 },
    ],
    [
        { row: 0, col: 0, width: 2, height: 4 },
        { row: 0, col: 2, width: 3, height: 2 },
        { row: 2, col: 2, width: 2, height: 2 },
        { row: 2, col: 4, width: 1, height: 2 },
    ],
    [
        { row: 0, col: 0, width: 3, height: 5 },
        { row: 0, col: 3, width: 2, height: 2 },
        { row: 2, col: 3, width: 2, height: 2 },
        { row: 4, col: 3, width: 2, height: 1 },
    ],
];

plans[5] = [
    [
        { row: 0, col: 0, width: 2, height: 4 },
        { row: 0, col: 2, width: 3, height: 2 },
        { row: 2, col: 2, width: 3, height: 3 },
        { row: 4, col: 0, width: 1, height: 1 },
        { row: 4, col: 1, width: 1, height: 1 },
    ],
    [
        { row: 0, col: 0, width: 4, height: 3 },
        { row: 0, col: 4, width: 1, height: 2 },
        { row: 2, col: 4, width: 1, height: 3 },
        { row: 3, col: 0, width: 2, height: 2 },
        { row: 3, col: 2, width: 2, height: 2 },
    ],
    [
        { row: 0, col: 0, width: 2, height: 2 },
        { row: 0, col: 2, width: 3, height: 4 },
        { row: 2, col: 0, width: 2, height: 3 },
        { row: 4, col: 2, width: 1, height: 1 },
        { row: 4, col: 3, width: 2, height: 1 },
    ],
    [
        { row: 0, col: 0, width: 1, height: 1 },
        { row: 0, col: 1, width: 1, height: 1 },
        { row: 0, col: 2, width: 3, height: 3 },
        { row: 1, col: 0, width: 2, height: 4 },
        { row: 3, col: 2, width: 3, height: 2 },
    ],
];


$(function() {
    var grid_id = 0;
    var last_grid_height = 0;
    var num_rest = NUM_GRIDS;
    var last_plan;

    while (num_rest > 0) {
        console.log(num_rest);
        var num_to_arrange;
        if (num_rest >= 5) {
            num_to_arrange = Math.ceil(Math.random() * 3) + 2;
            console.log("arrange: " + num_to_arrange);
        } else {
            num_to_arrange = num_rest;
            console.log("last arrange: " + num_to_arrange);
        }
        num_rest -= num_to_arrange;

        var plan_arr = plans[num_to_arrange];
        var plan = plan_arr[ Math.floor(Math.random() * plan_arr.length) ];

        var max_grid_height = 0;

        for (i in plan) {
            var grid = plan[i];
            $("#wrapper").append("<div id='" + grid_id + "' class='grid'></div>");

            var left = grid.col * (GRID_SIZE + INTERVAL);
            var top = grid.row * (GRID_SIZE + INTERVAL);
            var width = grid.width * (GRID_SIZE + INTERVAL) - INTERVAL;
            var height = grid.height * (GRID_SIZE + INTERVAL) - INTERVAL;
            var color = randomColor();

            $("#" + grid_id).css('left', left);
            $("#" + grid_id).css('top', top + last_grid_height);
            $("#" + grid_id).css('width', width);
            $("#" + grid_id).css('height', height);
            $("#" + grid_id).css('background', 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + 1 + ')');

            if (top + height > max_grid_height) {
                max_grid_height = top + height;
            }

            grid_id++;
        }
        last_grid_height += max_grid_height + INTERVAL;
    }
});
