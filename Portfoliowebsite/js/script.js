$(".js-mob-open").on("click", function () {
	$(this).toggleClass("active");
	$(".js-mob-nav").stop().fadeToggle(300);
});
$(document).on("click touchstart", function (e) {
	if (
		$(e.target).closest(".js-mob-nav").length ||
		$(e.target).closest(".js-mob-open").length
	)
		return;
	$(".js-mob-open").removeClass("active");
	$(".js-mob-nav").stop().fadeOut(300);
});


(function() {
  
  document.addEventListener("mousemove", parallax);
  const elem = document.querySelector("#parallax");

  function parallax(e) {
      let _w = window.innerWidth/2;
      let _h = window.innerHeight/2;
      let _mouseX = e.clientX;
      let _mouseY = e.clientY;
      let _depth1 = `${50 - (_mouseX - _w) * 0.01}% ${50 - (_mouseY - _h) * 0.01}%`;
      let _depth2 = `${50 - (_mouseX - _w) * 0.02}% ${50 - (_mouseY - _h) * 0.02}%`;
      let _depth3 = `${50 - (_mouseX - _w) * 0.06}% ${50 - (_mouseY - _h) * 0.06}%`;
      let x = `${_depth3}, ${_depth2}, ${_depth1}`;
      console.log(x);
      elem.style.backgroundPosition = x;
  }

})();

function viewport() {
	var a = window,
		b = "inner";
	return (
		"innerWidth" in window ||
			((b = "client"), (a = document.documentElement || document.body)),
		{ width: a[b + "Width"], height: a[b + "Height"] }
	);
}
var itemsCount = 0,
itemsMax = $('.outer-catalog .child-catalog').length;
$('.outer-catalog .child-catalog').hide();

function showNextItems() {
	var pagination = 8;
	if (viewport().width <= 1250) {
		var pagination = 3;
	}
	if (viewport().width <= 991) {
		var pagination = 2;
	}
	if (viewport().width <= 700) {
		var pagination = 1;
	}
for (var i = itemsCount; i < (itemsCount + pagination); i++) {
	$('.outer-catalog .child-catalog:eq(' + i + ')').show();
}

itemsCount += pagination;

if (itemsCount > itemsMax) {
	$('#showMore').hide();
}
};

showNextItems();

$('#showMore').on('click', function (e) {
e.preventDefault();
showNextItems();
});



(function () {

  const animationItems = document.querySelectorAll('._animation-items');
  if (animationItems.length > 0) {
    let isSmoothScrollEnabled = true; 

    window.addEventListener('scroll', animationOnScroll);

    function animationOnScroll() {
      if (!isSmoothScrollEnabled) {
        return; 
      }

      const scrollY = window.scrollY;
      for (let index = 0; index < animationItems.length; index++) {
        const animationItem = animationItems[index];
        const animationItemHeight = animationItem.offsetHeight;
        const animationItemOffset = offset(animationItem).top;
        const animationStart = 4;

        let animationItemPoint = window.innerHeight - animationItemHeight / animationStart;

        if (animationItemHeight > window.innerHeight) {
          animationItemPoint = window.innerHeight - window.innerHeight / animationStart;
        }

        if (
          (scrollY > animationItemOffset - animationItemPoint) &&
          (scrollY < animationItemOffset + animationItemHeight)
        ) {
          animationItem.classList.add('_active');
        } else {
          animationItem.classList.remove('_active');
        }
      }

     
      const maxScroll = wrapper.clientHeight - window.innerHeight;
      if (scrollY === maxScroll) {
        isSmoothScrollEnabled = false;
      } else {
        isSmoothScrollEnabled = true;
      }
    }

    function offset(el) {
      const rect = el.getBoundingClientRect(),
        scrollLeft = window.scrollX || document.documentElement.scrollLeft,
        scrollTop = window.scrollY || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }

    setTimeout(() => {
      animationOnScroll();
    }, 300);
  }


  const link = document.querySelectorAll('.animation-cursor > .hover-this');
  const cursor = document.querySelector('.cursor');

  const animateit = function (e) {
    const span = this.querySelector('span');
    const { offsetX: x, offsetY: y } = e,
      { offsetWidth: width, offsetHeight: height } = this,

      move = 25,
      xMove = (x / width) * (move * 2) - move,
      yMove = (y / height) * (move * 2) - move;

    span.style.transform = `translate(${xMove}px, ${yMove}px)`;

    if (e.type === 'mouseleave') span.style.transform = '';
  };

  const editCursor = e => {
    const { clientX: x, clientY: y } = e;
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
  };

  link.forEach(b => b.addEventListener('mousemove', animateit));
  link.forEach(b => b.addEventListener('mouseleave', animateit));
  window.addEventListener('mousemove', editCursor);


  const page = document.querySelector('.wrapper ');
  const wrapper = document.querySelector('.js-scroll');

  const ease = 0.05;
  const scroll = {
    current: 0,
    target: 0,
    limit: 0
  };

  const updateTarget = e => {
    scroll.target += e.deltaY;
  };


document.addEventListener("mousewheel", updateTarget);


const lerp = (current, target) => {

  const distanceBetween = target - current;

  const distanceToTravel = distanceBetween * ease;

  
  return current + distanceToTravel;

};


const clamp = (min, max, value) => {
  const clamped = Math.min(Math.max(value, min), max);
  return clamped;
};


const smoothScroll = () => {
  const maxScroll = wrapper.clientHeight - window.innerHeight;

  scroll.target = clamp(0, maxScroll, scroll.target);

  const { current, target } = scroll;
 
 if (scroll.target <= 0 || scroll.target >= maxScroll) {
 
  wrapper.style.scrollBehavior = 'auto';
  document.documentElement.classList.add('is-scroll-behavior-none');
} else {
 
  wrapper.style.scrollBehavior = 'smooth';
  document.documentElement.classList.remove('is-scroll-behavior-none');
}
const transition = lerp(current, target);
scroll.current = transition;


wrapper.style.transform = `translateY(-${scroll.current}px)`;


window.requestAnimationFrame(smoothScroll);
};

  smoothScroll();
})();


var counterContainer = document.querySelector(".website-counter");
var resetButton = document.querySelector("#reset");
var visitCount = localStorage.getItem("page_view");

if (visitCount) {
  visitCount = Number(visitCount) + 1;
  localStorage.setItem("page_view", visitCount);
} else {
  visitCount = 1;
  localStorage.setItem("page_view", 1);
}
counterContainer.innerHTML = visitCount;

resetButton.addEventListener("click", () => {
	visitCount = 1;
	localStorage.setItem("page_view", 1);
	counterContainer.innerHTML = visitCount;
  });


  




















