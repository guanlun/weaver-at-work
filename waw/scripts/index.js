$(function() {
    $('img').load(function() {
        var body_width = $(window).width();
        var body_height = $(window).height();

        var ctn_width = $('#container').width();
        var margin_left = (body_width - ctn_width) / 2;
        $('#container').css('left', margin_left);

        var contact_width = $('#contact_view').width();
        var contact_height = $('#contact_view').height();

        $('#contact_view').css('left', body_width - contact_width - 10);
        $('#contact_view').css('top', body_height - contact_height - 10);

        var margin = 0;
        var increasing = false;

        $('#weaver_container').addClass('weaver_move_up');
        
        $('#banner_contact_part').click(function() {
	    	$('#talkbubble').css('display', 'block'); 
        });
    });
});
