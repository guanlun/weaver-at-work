$(function() {
    var body_width = $(window).width();
    var body_height = $(window).height();

    var ctn_width = $('#container').width();
    $('#container').css('margin-left', (body_width - ctn_width) / 2);
});
