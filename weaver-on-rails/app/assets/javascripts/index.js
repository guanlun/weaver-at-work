$(function() {
    $('img').load(function() {
        $('#weaver_container').addClass('weaver_move_up');
        $('#banner_contact_part').click(function() {
          $('#talkbubble').css('display', 'block'); 
        });
    });
});
