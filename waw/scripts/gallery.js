jQuery.fn.gallery = function() {
    var container = $(this);

    var args = arguments[0] || {}; // arguments from the caller

    var img_width = 100;
    var scroll_id = 0;

    var img_id = 0; // 'src' of the last image to be displayed
    
    var mouse_clicked_on_img = 0; // 'src' of the image that is displayed (clicked)

    var div_width = args.width || 400;
    var div_height = args.height || 300;

    var div_top = container.position().top;
    var div_left = container.position().left;

    var scroll = $('<div id=\'scroll\'></div>');
    scroll.css('width', div_width);
    scroll.css('overflow-x', 'hidden');
    scroll.css('margin-top', '5px');

    var inner_div = container.find('.gallery');
    var inner_width = inner_div.find('img').length * img_width;
    inner_div.css('width', inner_width);

    scroll.append(inner_div);

    var img_divs = inner_div.find('div');
    img_divs.css('width', '70px');
    img_divs.css('height', '60px');
    img_divs.css('float', 'left');
    img_divs.css('margin-left', '5px');
    img_divs.css('margin-right', '5px');
    img_divs.css('overflow', 'hidden');
    img_divs.css('border', '1px solid #AAA');

    var imgs = inner_div.find('img');
    imgs.css('opacity', '0.3');

    var img_title = $('<div id=\'img_title\'></div>');
    img_title.css('width', div_width);
    img_title.css('font-family', 'Arial');
    img_title.css('color', '#999');
    img_title.css('text-align', 'right');
    img_title.css('padding-top', '2px');
    img_title.css('font-size', '8pt');
    img_title.html(' ');

    container.append(img_title);
    container.append(scroll);

    imgs.load(function() {
        var img_width = $(this).width();
        var img_height = $(this).height();
        if (img_width > img_height) { // landscape
            $(this).css('height', '60px');
        } else { // portrait
            $(this).css('width', '80px');
        }
    });

    img_divs.mouseover(function() {
        $(this).find('img').stop();
        $(this).find('img').animate({
            opacity: 0.8,
        }, 200);
    });

    img_divs.mouseout(function() {
        $(this).find('img').stop();
        if (mouse_clicked_on_img != $(this).find('img').attr('src')) {
            $(this).find('img').animate({
                opacity: 0.3,
            }, 200);
        }
    });

    var moving = false;

    scroll.mousemove(function(e) {
        function left() {
            var curr_dis = scroll.scrollLeft();
            scroll.scrollLeft(curr_dis - 2);
        }

        function right() {
            var curr_dis = scroll.scrollLeft();
            scroll.scrollLeft(curr_dis + 2);
        }

        var left_offset = e.pageX - scroll.offset().left;
        var scroll_width = div_width / 5;

        if (left_offset < scroll_width) {
            if (!moving) {
                scroll_id = setInterval(left, 10);
                moving = true;
            }
        } else if (left_offset > div_width - scroll_width) {
            if (!moving) {
                scroll_id = setInterval(right, 10);
                moving = true;
            }
        } else {
            moving = false;
            clearInterval(scroll_id);
        }
    });

    scroll.mouseout(function() {
        moving = false;
        clearInterval(scroll_id);
    });

    // large image display
    container.prepend('<div id=\'' + container.attr('id') + '_large_display\'></div>');
    var display = $('#' + container.attr('id') + '_large_display');
    var display_width = div_width;
    var display_height = div_height - scroll.height();
    display.css('width', display_width);
    display.css('height', display_height);
    display.css('overflow', 'hidden');

    function set_img(src) {
        mouse_clicked_on_img = src;
        img_id = src; // set the last image to the current one
        var img = new Image();
        img.src = src;

        var width = img.width;
        var height = img.height;
        var width_ratio = width / display_width;
        var height_ratio = height / display_height;

        if (width_ratio < height_ratio) { // relatively portrait
            if (img.width < img.height) { // portrait
                width = width / height_ratio;
                height = height / height_ratio;
                display.css('text-align', 'right');
            } else {
                var margin_top = - (height - display_height) / 2;
                $(img).css('margin-top', margin_top);
            }
        } else { // relatively landscape
            width = width / width_ratio;
            height = height / width_ratio;
            var margin_top = (display_height - height) / 2;
            if (margin_top > 0) {
                $(img).css('margin-top', margin_top);
            }
        }

        img.width = width;
        img.height = height;
        display.html(img);
    }

    imgs.click(function() {
        imgs.animate({
            opacity: 0.3,
        }, 200);
        $(this).stop();
        $(this).css('opacity', '0.8');
        src = $(this).attr('src');
        if (img_id == src) {
            return;
        } else {
            var img = new Image();
            img.src = src;
            display.animate( {
                opacity: 0.0,
            }, 100, function() {
                set_img(src);
                display.animate( {
                    opacity: 1.0,
                }, 100);
            });
        }
        img_title.html($(this).attr('src'));
    });

    imgs.eq(0).load(function() { // when the first image is loaded, set it as the display image
        $(this).css('opacity', '0.8');
        set_img($(this).attr('src'));
        img_title.html($(this).attr('src'));
    });
};
