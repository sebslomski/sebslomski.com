$(function () {
  var IS_MAC = true;
  jQuery.fn.reverse = function () {
    return this.pushStack(this.get().reverse(), arguments);
  };

  function elementInViewport(el) {
    var rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    );
  }

  document.addEventListener('scroll', function () {
    $('h1').reverse().each(function (elem) {
      if (elementInViewport(this)) {
        var id = $(this).parents('section').attr('id');
        if (id) {
          document.title = 'Sebastian Slomski > ' + $('#' + id + ' h1').html();
          $('.bar-menu a[href="#' + id + '"]')
            .trigger('click', true)
            .parents('li').siblings().find('a.s-active').removeClass('s-active');
          $('.bar-menu a[href="#' + id + '"]').addClass('s-active');
        }
      }
    });
  });

  $(document).trigger('scroll');

  if (!$('html.cssanimations.csstransitions').length && IS_MAC) {
    $('#browser-fail').show();
  }

  $('a.alert-close').click(function (e) {
    e.preventDefault();
    $(e.target).parents('.alert-box-wrapper').animate({height: 0}, 1000);
  });

  $('.bar-logo a').click(function (e) {
    e.preventDefault();
    $('.bar-menu li a.s-active').removeClass('s-active');
    $(window).scrollTo(0, 1000);
  });

  $('.bar-menu li a').click(function (e, noScrollTo) {
    e.preventDefault();
    if (!noScrollTo) {
      var $fixedBar = $('.bar-fixed');
      var $targetElem = $($(this).attr('href'));
      $(window).scrollTo($targetElem.position().top, 1000);
    }
  });


  $('.portfolio-detail-close').click(function (e) {
    e.preventDefault();
    if ($('html.cssanimations').length && IS_MAC) {
      $('.portfolio-detail-container')
        .removeClass('fadeInUp')
        .addClass('fadeOutUp');
    } else {
      $('.portfolio-detail-container').animate({height: 0}, 1000);
    }
  });


  var portfolioSliderInitialised = false;

  $('.portfolio-preview img').click(function (e) {
    if ($('.portfolio-detail-container'))
    if ($('html.cssanimations').length && IS_MAC) {
      $('.portfolio-detail-container')
        .removeClass('fadeOutUp')
        .addClass('fadeInUp');
    } else {
      $('.portfolio-detail-container').animate({height: 600}, 1000);
    }

    if (!portfolioSliderInitialised) {
      $('.portfolio-slides').cycle({
        fx: 'scrollHorz',
        prev: '.portfolio-control-left',
        next: '.portfolio-control-right',
        timeout: 0
      });
      portfolioSliderInitalised = true;
    }

    var targetId = $(e.target).parent().attr('id') + '-detail';
    var slidePos = $('.portfolio-slides article').index($('#' + targetId));
    $('.portfolio-slides').cycle(slidePos);

    $('.bar-menu li a[href="#portfolio"]').trigger('click');
  });

  $('img.lazy').lazyload({effect: 'fadeIn'});
});
