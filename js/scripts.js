$(document).ready(function() {
  scroll();
  navScroll();
  hamburger();
  resizeFix();

  onResize();
});

function onResize() {
  $(window).resize(function(e) {
    resizeFix();
  });
}

function scroll() {
  $(".scroll").click(function (event) { // When a link with the .scroll class is clicked
    event.preventDefault(); // Prevent the default action from occurring
    $('html,body').animate({
      scrollTop: $(this.hash).offset().top
    }, 500); // Animate the scroll to this link's href value
  });
};

function hamburger() {
  $('.hamburger-menu').on('click', function() {
    $('.bar').toggleClass('animate');
    $('ul.navbar').toggleClass('open');
    $('nav .navbar').slideToggle('slow');
  });
};

function resizeFix() {
  if (window.matchMedia("(min-width: 1100px)").matches) {
    $('nav .navbar').css({'display': 'flex'});
  } else {
    $('nav .navbar').css({'display': 'none'});
  }
};

function navScroll() {
  $(window).on('scroll', function() {
    var vscroll = document.body.scrollTop;
    if (vscroll > 100) {
      $('nav').addClass('sticky-nav');
    } else {
      $('nav').removeClass('sticky-nav');
    }
  });
};
