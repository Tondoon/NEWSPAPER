//history slide
$(function() {
  $('.contents-box').mCustomScrollbar({
    scrollButtons: { enable: true, scrollType: 'stepped' },
    keyboard: { scrollType: 'stepped' },
    mouseWheel: { scrollAmount: 188 },
    theme: 'rounded-dark',
    autoExpandScrollbar: true,
    snapAmount: 188,
    snapOffset: 65,
  });

  var header = document.querySelector('.header');
  if (window.location.hash) {
    header.classList.add('headroom--unpinned');
  }
  var headroom = new Headroom(header, {
    tolerance: {
      down: 10,
      up: 10,
    },
    offset: 50,
  });
  headroom.init();

  $.fn.writeText = function(content) {
    var contentArray = content.split(''),
      current = 0,
      elem = this;
    setInterval(function() {
      if (current < contentArray.length) {
        elem.text(elem.text() + contentArray[current++]);
      }
    }, 80);
  };
  $('.main-top').addClass('loaded');
  $('#history-slider').owlCarousel({
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 2000,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      600: {
        items: 3,
        nav: true,
      },
      1000: {
        items: 3,
        nav: true,
        loop: false,
        rewind: true,
        margin: 20,
      },
    },
  });
  $('#anniversary-slider').owlCarousel({
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 3000,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      600: {
        items: 3,
        nav: true,
      },
      1000: {
        items: 3,
        nav: true,
        loop: false,
        rewind: true,
        margin: 20,
      },
    },
  });

  var doPath = function(path, amt) {
    var path, length;

    path = document.querySelector(path);
    length = path.getTotalLength();
    $(path).css({
      'stroke-dasharray': length + 'px',
      'stroke-dashoffset': length + 'px',
    });
    $(path).animate({ 'stroke-dashoffset': length * amt }, 1400);
  };

  function incrementCounter(el, pct, time) {
    var now = Date.now();
    var newTime = now + time;
    var increment = pct / Math.floor(time / 50);
    var int = window.setInterval(function() {
      var now = Date.now();
      if (now > newTime) {
        $(el).text(pct);
        window.clearInterval(int);
        return false;
      }
      return tick(el, pct, increment, newTime);
    }, 50);
  }

  function tick(el, pct, increment, time) {
    var now = Date.now();
    if (now > time) {
      $(el).text(pct);
      return false;
    }
    var count = parseFloat($(el).text());
    count += increment;
    $(el).text(Math.floor(count));

    //bullshit magic stuff
    if (count > 1) {
      $('.steps li:first-child').addClass('active');
    }
    if (count >= 20 - increment * 2) {
      $('.steps li:nth-child(1)')[0].className = 'complete';

      $('.steps li:nth-child(2)')[0].className = 'active';
    }
    if (count >= 40 - increment * 2) {
      $('.steps li:nth-child(2)')[0].className = 'complete';

      $('.steps li:nth-child(3)')[0].className = 'active';
    }
    if (count >= 60 - increment * 2) {
      $('.steps li:nth-child(3)')[0].className = 'complete';

      $('.steps li:nth-child(4)')[0].className = 'active';
    }
    if (count >= 80 - increment * 2) {
      $('.steps li:nth-child(4)')[0].className = 'complete';

      $('.steps li:nth-child(5)')[0].className = 'active';
    }
  }

  //doPath('#circlePath2', 0);

  //the start function
  function start() {
    doPath('#circlePath', 0.2);
    incrementCounter('.text span', 80, 2000);
  }

  //add event to replay button
  $('.repeat').click(function(e) {
    e.preventDefault();
    $('.text span').text('0');
    document.querySelectorAll('li').forEach(function(li) {
      li.className = '';
    });
    setTimeout(function() {
      start();
    }, 200);
  });

  //kick off on scroll
  var started = false;
  $(window).scroll(function() {
    if (started) return false;

    if ($('.banner').length > 0) {
      var bannerTop = $('.banner').offset().top - $('.percent').height();
      scrolled = $(this).scrollTop();
      if (scrolled > bannerTop) {
        started = true;
        start();
      }
    }
  });

  //nudge viewer
  var notified = false;
  setTimeout(function() {
    if (notified || $(window).scrollTop() > 250) {
      notified = true;
      return false;
    }
    $('.scroll-indicator').addClass('visible');
    notified = true;
  }, 1700);
  $(window).scroll(function() {
    if ($(this).scrollTop() > 250) {
      notified = true;
      $('.scroll-indicator').removeClass('visible');
    }
  });
});
//scroll effect
document.addEventListener('DOMContentLoaded', function() {
  var trigger = new ScrollTrigger({
    addHeight: true,
  });
});

//menu
$('.main-menu > li').mouseenter(function() {
  $(this)
    .find('.sub-menu')
    .slideDown('fast');
});
$('.main-menu > li').mouseleave(function() {
  $(this)
    .find('.sub-menu')
    .slideUp('fast');
});

// mobile menu
$('#toggle').click(function() {
  $(this).toggleClass('active');
  $('#overlay').toggleClass('open');
});
$('.msub-menu li a').click(function() {
  $('#overlay').toggleClass('open');
  $('#toggle').toggleClass('active');
});

//footer menu
$('.footer-menu-btn').click(function() {
  if ($('.footer-gnb-sub').css('display') == 'block') {
    $('.footer-gnb-sub:not(:animated)').slideUp(500);
  } else {
    $('.footer-gnb-sub:not(:animated)').slideDown(500);
  }
});

document.getElementById('fbtn').onclick = function() {
  var className = ' ' + fbtn.className + ' ';

  this.className = ~className.indexOf(' active ')
    ? className.replace(' active ', ' ')
    : this.className + ' active';
};

//4-2
var doc = document,
  win = window;

// Global Vars
var w = {
  width: win.innerWidth,
  height: win.innerHeight,
  scroll: win.pageYOffset,
};

// Update Global Vars
function updateGlobals() {
  w.width = win.innerWidth;
  w.height = win.innerHeight;
  w.scroll = win.pageYOffset;
}

win.addEventListener('resize', updateGlobals, true);
win.addEventListener('scroll', updateGlobals, true);
win.addEventListener('load', updateGlobals, true);

// Plugin

// Give any element a class of 'js-trigger' and a 'data-active' data attribute (usually 'off').
// Style the element based on data-active=on and data-active=off.

$(function scrollTrigger() {
  // Elements
  var triggers = doc.getElementsByClassName('js-trigger');

  // Settings
  var cushionTop = 300, // Distance from top to trigger
    cushionBottom = 300, // Distance from bottom to trigger
    showLines = false, // Toggle for lines
    triggerMode = 'toggle-in'; // 'switch', 'toggle-in' or 'toggle-in-out'

  // Empties
  var posY = [],
    state = [];

  function getStates() {
    for (x = 0; x < triggers.length; x++) {
      state.push(triggers[x].getAttribute('data-active') == 'on' ? 1 : 0);
    }
  }

  getStates();

  function getPositions() {
    posY = [];

    for (x = 0; x < triggers.length; x++) {
      posY.push(triggers[x].getBoundingClientRect().top);
    }
  }

  getPositions();
  win.addEventListener('resize', throttle(getPositions, 200)); // Throttle events for performance

  function trackScrollInOut() {
    for (x = 0; x < triggers.length; x++) {
      if (
        state[x] != 1 &&
        posY[x] > w.scroll + cushionTop &&
        posY[x] < w.scroll + w.height - cushionBottom
      ) {
        triggers[x].setAttribute('data-active', 'on');
        state[x] = 1;
      } else if (
        (state[x] != 0 && posY[x] < w.scroll + cushionTop) ||
        (state[x] != 0 && posY[x] > w.scroll + w.height - cushionBottom)
      ) {
        triggers[x].setAttribute('data-active', 'off');
        state[x] = 0;
      }
    }
  }

  function trackScrollIn() {
    for (x = 0; x < triggers.length; x++) {
      if (state[x] != 1 && posY[x] < w.scroll + w.height - cushionBottom) {
        triggers[x].setAttribute('data-active', 'on');
        state[x] = 1;
      } else if (state[x] != 0 && posY[x] > w.scroll + w.height - cushionBottom) {
        triggers[x].setAttribute('data-active', 'off');
        state[x] = 0;
      }
    }
  }

  function trackScrollSwitch() {
    for (x = 0; x < triggers.length; x++) {
      if (state[x] != 1 && posY[x] < w.scroll + w.height - cushionBottom) {
        triggers[x].setAttribute('data-active', 'on');
        state[x] = 1;
      }
    }
  }

  if (triggerMode == 'toggle-in-out') {
    win.addEventListener('scroll', throttle(trackScrollInOut, 50));
  } else if (triggerMode == 'toggle-in') {
    win.addEventListener('scroll', throttle(trackScrollIn, 50));
  } else if (triggerMode == 'switch') {
    win.addEventListener('scroll', throttle(trackScrollSwitch, 50));
  }

  if (showLines) {
    var body = doc.getElementsByTagName('body')[0],
      topLine = doc.createElement('span'),
      bottomLine = doc.createElement('span');

    if (triggerMode == 'toggle-in-out') {
      topLine.style.width = '100%';
      topLine.style.borderTop = '1px dashed rgba(255,255,255,.2)';
      topLine.style.position = 'fixed';
      topLine.style.left = '0px';
      topLine.style.top = cushionTop + 'px';

      body.appendChild(topLine);
    }

    bottomLine.style.width = '100%';
    bottomLine.style.borderTop = '1px dashed rgba(255,255,255,.2)';
    bottomLine.style.position = 'fixed';
    bottomLine.style.left = '0px';
    bottomLine.style.bottom = cushionBottom + 'px';

    body.appendChild(bottomLine);
  }
});

// Throttle Function
function throttle(func, wait) {
  var context,
    args,
    result,
    timeout = null,
    previous = 0,
    options = {};

  var later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);

    if (!timeout) {
      context = args = null;
    }
  };

  return function() {
    var now = Date.now();

    if (!previous && options.leading === false) {
      previous = now;
    }

    var remaining = wait - (now - previous);

    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      previous = now;
      result = func.apply(context, args);

      if (!timeout) {
        context = args = null;
      }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  };
}
