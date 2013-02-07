jQuery.fn.scroll = function() {
    var div = $(this);
    var scroll_id = 0;
    width = div.width();
    height = div.height();

    div.css('overflow-y', 'hidden');
    div.css('cursor', 'default');

    scroll_zone_height = height / 5;

    var moving = false;

    div.mousemove(function(e) {
        function up() {
            var curr_dis = div.scrollTop();
            div.scrollTop(curr_dis - 1);
        }

        function down() {
            var curr_dis = div.scrollTop();
            div.scrollTop(curr_dis + 1);
        }

        var top_offset = e.pageY - div.offset().top;

        if (top_offset < scroll_zone_height) {
            if (!moving) {
                scroll_id = setInterval(up, 20);
                moving = true;
            }
        } else if (top_offset > height - scroll_zone_height) {
            if (!moving) {
                scroll_id = setInterval(down, 20);
                moving = true;
            }
        } else {
            clearInterval(scroll_id);
            moving = false;
        }
    });

    div.mouseout(function() {
        clearInterval(scroll_id);
        moving = false;
    });
};
