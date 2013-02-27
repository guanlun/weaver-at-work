jQuery.fn.smart_tiles = function() {
    var args = arguments[0] || {}; // arguments from the caller

    var images = [ ];

    var container = $(this);
    container.find("img").each(function() {
        var image_data = {
            src: $(this).attr("src"),
            title: $(this).attr("data-title"),
            description: $(this).attr("data-description")
        };
        images.push(image_data);
    });

    container.find("img").each(function() {
        $(this).remove();
    });

    var WIDTH = 5;
    var INTERVAL = args.interval || 5;

    var CONTAINER_WIDTH = args.width || 520;

    var GRID_SIZE = (CONTAINER_WIDTH - 4 * INTERVAL) / 5;

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
      /*
        [
            { row: 0, col: 0, width: 2, height: 4 },
            { row: 0, col: 2, width: 3, height: 2 },
            { row: 2, col: 2, width: 3, height: 3 },
            { row: 4, col: 0, width: 1, height: 1 },
            { row: 4, col: 1, width: 1, height: 1 },
        ],
        */
        [
            { row: 0, col: 0, width: 4, height: 3 },
            { row: 0, col: 4, width: 1, height: 2 },
            { row: 2, col: 4, width: 1, height: 3 },
            { row: 3, col: 0, width: 2, height: 2 },
            { row: 3, col: 2, width: 2, height: 2 },
        ],
        /*
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
        */
    ];


    var grid_id = 0;
    var last_grid_height = 0;
    var num_rest = images.length;
    var last_plan;

    var image_index = 0;

    while (num_rest > 0) {
        var num_to_arrange;
        if (num_rest >= 5) {
            num_to_arrange = Math.ceil(Math.random() * 3) + 2;
        } else {
            num_to_arrange = num_rest;
        }
        num_rest -= num_to_arrange;

        var plan_arr = plans[num_to_arrange];
        var plan = plan_arr[ Math.floor(Math.random() * plan_arr.length) ];

        var max_grid_height = 0;

        for (i in plan) {
            var grid = plan[i];
            $(this).append("<div id='" + grid_id + "' class='grid'></div>");

            var left = grid.col * (GRID_SIZE + INTERVAL);
            var top = grid.row * (GRID_SIZE + INTERVAL);
            var width = grid.width * (GRID_SIZE + INTERVAL) - INTERVAL;
            var height = grid.height * (GRID_SIZE + INTERVAL) - INTERVAL;

            var grid_div = $("#" + grid_id);
            grid_div.css('left', left);
            grid_div.css('top', top + last_grid_height);
            grid_div.css('width', width);
            grid_div.css('height', height);

            var img = new Image();
            img.src = images[grid_id].src;

            var image_title = images[grid_id].title;
            var image_description = images[grid_id].description;

            grid_div.html(img);
            var text_container = $("<div class='image_text_containter'></div>");

            text_container.append("<div class='image_title'>" + image_title + "</div>");
            text_container.append("<div class='image_description'>" + image_description + "</div>");

            grid_div.append(text_container);

            var image_width_by_height = img.width / img.height;
            var container_width_by_height = width / height;

            if (container_width_by_height > image_width_by_height) { // container "fatter" than image
                var ratio = img.width / width;
                var new_width = width;
                var new_height = img.height * width / img.width;
                var margin_top = (height - new_height) / 2;
                $(img).css('width', new_width);
                $(img).css('height', new_height);
                $(img).css('margin-top', margin_top);
            } else { // container "thinner" than image
                var ratio = img.height / height;
                var new_height = height;
                var new_width = img.width * height / img.height;
                var margin_left = (width - new_width) / 2;
                $(img).css('width', new_width);
                $(img).css('height', new_height);
                $(img).css('margin-left', margin_left);
            }

            if (top + height > max_grid_height) {
                max_grid_height = top + height;
            }

            grid_id++;
        }
        last_grid_height += max_grid_height + INTERVAL;
    }
    container.css("visibility", "visible");
    $("#social_button_container").css("margin-top", last_grid_height + 50);
}

$(window).load(function() {
    $("#gallery_wrapper").smart_tiles({ width: 600, interval: 10 });
});
