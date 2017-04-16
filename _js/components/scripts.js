import $ from 'jquery';

$(document).ready(function() {
    // Show/hide mobile menu
    $('.menu-toggle').click(function(e) {
        e.preventDefault();
        $('body').toggleClass('menu-open');
    });
    $(document).keyup(function(e) {
		if (e.keyCode === 27) {
            $('body').removeClass('menu-open');
		}
	});

	$(document).mouseup(function(e) {
		var container = $('.set-view-menu');
		if (!container.is(e.target) && container.has(e.target).length === 0)
		{
            //$('body').removeClass('menu-open');
		}
	});

    // Brawl week switching
    $('.week-control-last').click(function(e) {
        e.preventDefault();
        $('.brawl-feature').addClass('last-week-showing');
    });

    $('.week-control-this').click(function(e) {
        e.preventDefault();
        $('.brawl-feature').removeClass('last-week-showing');
    });

    // Modal
    $('.modal-trigger').click(function(e) {
        e.preventDefault();
        $('body').addClass('modal-showing');
    });
    $(document).keyup(function(e) {
		if (e.keyCode === 27) {
            $('body').removeClass('modal-showing');
						$('.login-modal').css({visibility: 'hidden', opacity: 0});
		}
	});

    // Modal password
    $('.modal-trigger-password').click(function(e) {
        e.preventDefault();
        $(this).closest('.overlay').addClass('is-hidden').next('.overlay').removeClass('is-hidden');
    });

    // Modal password
    $('.modal-trigger-create-brawl').click(function(e) {
        e.preventDefault();
        $('body').addClass('modal-showing');
        $('.overlay-create-brawl').removeClass('is-hidden').next('.overlay').addClass('is-hidden');
    });



    // Modal password
    $(document).on('click','.modal-trigger-report-issue',function(e) {
        e.preventDefault();
        $('body').addClass('modal-showing');
        $('.overlay-create-brawl').addClass('is-hidden').next('.overlay').removeClass('is-hidden');
        $('.login-modal ').hide();
    });

	$('#bookSubmit').click(function(e){
		e.preventDefault();
		$('#coverSubmit').click();
	})

	//login modal
	$('#loginButton').click(function(e){
		$('.login-modal').css({visibility: 'visible', opacity: 1});
        e.preventDefault();
	})
});
