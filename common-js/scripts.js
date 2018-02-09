
(function ($) {

    "use strict";

	$(window).on('beforeunload', function(){
	  $("html,body").scrollTop(0);
	});
	
	
	loadPgeEffect();
	
	navMenuFn();
	
	dropdownFn();
	
	btnHoverEffect();
	
	buttonClickEffect();
	
	showProjectFunc();
	
	enableBSCarousel();
	
	BSCarouselIndicators();
	
	scrollWheelEvtForBS();	
	
	enableMasonary();

	enableSwiper();
	
	
	// MAKE MAIN MENU FIXED ON SCROLL
	
	var mainMenuId = isExists('#main-menu-bar') ? $('#main-menu-bar') : null;
	var mainMenuBottom = (mainMenuId == null) ? 0 : mainMenuId.height() + 200;
	
	menuFixedOnScroll( mainMenuId, mainMenuBottom );
	
	$(window).on('scroll', function(){
		
		// TRANSLATE PARALLAX ELEMENTS ON SCROLL
		
		debounceFuncForFixedMenu( mainMenuId, mainMenuBottom );
		
	});//EOF SCROLL
	

})(jQuery);

function showProjectFunc(){
	
	var closeHandle;
	
	var animEndEv = 'webkitAnimationEnd animationend';
	
	$('[data-project-target]').on('click', function(){ 
		
		clearInterval(closeHandle);
		
		var projectId = $(this).data('project-target');
		var $item = $(this).parents('.item');
		
			closeHandle = setInterval(function(){
			
			$(projectId).addClass('bg-color');
			
		}, 1000);
		
		$(projectId).addClass('visible');
		$item.removeClass('project-sm-trans-to-top').removeClass('project-sm-trans-to-bottom').addClass('project-sm-trans-to-top');

		
		$(projectId).find('.project-wrapper').addClass('project-to-bottom', 100).on(animEndEv, function(){
			$(this).removeClass('project-to-bottom');
		});
		
	});
	
	
	$('.close-project-btn').on('click', function(){ 
		
		var projectId = $(this).parents('.projects');
		var $item = $(projectId).prev('.item');
		
		$(projectId).removeClass('bg-color');
		
		clearInterval(closeHandle);
		closeHandle = setInterval(function(){
			
			$(projectId).removeClass('visible');
		
			$item.removeClass('project-sm-trans-to-top').removeClass('project-sm-trans-to-bottom').addClass('project-sm-trans-to-bottom');

			
			$(projectId).find('.project-wrapper').addClass('project-to-top', 100).on(animEndEv, function(){
				$(this).removeClass('project-to-top');
			});
			
		}, 1000);
		
	});
	
}
function buttonClickEffect(){
	
	$('a').not('[href^="#"]').on('click', function(e){
		
		e.preventDefault();
		var goTo = this.getAttribute("href");
		var currentFile = window.location.href;
		
		// CHECKING IF THE CLICKED LINK IS THE CURRENT PAGE
		if(currentFile.indexOf(goTo) > -1) { return false; }
		
		var top = e.pageY;
		var left = e.pageX;
		
		$('body').append('<div class="fixed-circle"></div>');
		
			$('.fixed-circle').css({
				'left' : left + 'px',
				'top' : top  + 'px'
			});	
		
		setTimeout(function(){
			window.location = goTo;
		},1000);
		
	});
}
function btnHoverEffect(){
	
	var animEndEv = 'webkitAnimationEnd animationend';
	var animationCompleted = false; 
	$('[data-hover-effect]').on('mouseenter', function(e){
		animationCompleted = false; 
		
		$('.btn-child').remove();
		
		var offset = $(this).offset();
		var top = (e.pageY - offset.top);
		var left = (e.pageX - offset.left);
			
		$(this).append('<div class="btn-child"></div>');
		$('.btn-child').css({
			'left' : left + 'px',
			'top' : top  + 'px'
		});
		
		
		$(this).find('.btn-child').addClass('in', 100).on(animEndEv, function(){
			animationCompleted = true;
		});
	}).on('mouseleave', function(e){
		if(animationCompleted){
			$(this).find('.btn-child').addClass('out', 100).on(animEndEv, function(){
				$(this).removeClass('in');
			});
			
		}else{
			$(this).find('.btn-child').addClass('in', 100).on(animEndEv, function(){
				$(this).addClass('out');
			});
		}
		
	});
	
}

function loadPgeEffect(){
	
	$(window).on('load', function() {
		var $cssLoader = $('.css-loader');
		var $loaderWritings = $('.loader-writings');
		setTimeout(function() {
			$cssLoader.addClass('after-load');
			$loaderWritings.addClass('inverse-after-load');
		}, 2000);
		
    });
	
}
function dropdownFn(){
	
	var $dropDown = $('.drop-down');
	var isTouchDevice = ('ontouchstart' in window || 'onmsgesturechange' in window);
	
	if(isTouchDevice){
		$dropDown.on('click', function(e){
			var $dropDownMenu = $(this).find('.drop-down-menu');
			if(!$dropDownMenu.hasClass('d-open')) {
				$dropDown.find('.nv-icn').removeClass('rotate');
				$dropDown.find('.drop-down-menu').removeClass('d-open');
				$dropDownMenu.addClass('d-open');
				$(this).find('.nv-icn').addClass('rotate');
			}else{
				$dropDownMenu.removeClass('d-open');
				$(this).find('.nv-icn').removeClass('rotate');
			}
		});
	}else{
		$dropDown.on('mouseenter mouseleave', function(e){
			var $dropDownMenu = $(this).find('.drop-down-menu');
			if(e.type === 'mouseenter') {
				$dropDownMenu.addClass('d-open');
				$(this).find('.nv-icn').addClass('rotate');
			}
			else if(e.type === 'mouseleave') {
				$dropDownMenu.removeClass('d-open');
				$(this).find('.nv-icn').removeClass('rotate');
			}
		});
	}
}
function navMenuFn(){
	
	$('[data-toggle=navigation]').on('click', function(){
		
		var mainMenu = $(this).data('target');
		
		var animationClass = $(mainMenu).data('menu-animation');
		var inverseAnimationClass = 'inverse-' + animationClass;
		
		$(mainMenu).removeClass(animationClass).removeClass(inverseAnimationClass);
		$(mainMenu).find('.menu-wrapper').removeClass(animationClass);
		
		var $navMenu = $(mainMenu).find('.nav-menu');
		var elemAnimation = $navMenu.data('elem-animation');
		var elemAnimationDuration = $navMenu.data('animation-duration');
		var elemAnimationDelay = 1;
			
		$navMenu.find('li').removeClass(elemAnimation);
		
		if(!$(this).hasClass('close-btn')){
			
			$(mainMenu).addClass(animationClass);
			$('[data-slide-page-for-menu]').toggleClass('page-slide-to-right');
			
			
			$($navMenu.children('li')).each(function(){
				
				$(this).addClass(elemAnimation);
				
				$(this).css('animation-delay', elemAnimationDelay + 's');
				$(this).css('animation-duration', elemAnimationDuration + 's');
				elemAnimationDelay += 0.15;
				
			});
			
		}else{
			
			$(mainMenu).addClass(inverseAnimationClass);
			$(mainMenu).find('.menu-wrapper').addClass(animationClass);
			$('[data-slide-page-for-menu]').toggleClass('page-slide-to-right');
			
		}
		
		$(this).toggleClass('close-btn');
		
		return false;
		
	});
	
}

var debounceFuncForFixedMenu = debounce(function(mainMenuId, mainMenuBottom) {
	menuFixedOnScroll(mainMenuId, mainMenuBottom);
},100);

function menuFixedOnScroll( mainMenuId, mainMenuBottom ){
	
	var top_of_window = $(window).scrollTop();
	
	if((top_of_window > mainMenuBottom)){ 
		$(mainMenuId).addClass('fixed-menu'); 
	}
	else{ 
		$(mainMenuId).removeClass('fixed-menu'); 
	}
	
}

function scrollWheelEvtForBS(){
	var isMoving = false;
	
	   $(document).on('swipeleft', function() {
			alert()
		});
	
	$('#main-carousel').unbind('mousewheel DOMMouseScroll').on('mousewheel DOMMouseScroll', function(e) {
		
		e.preventDefault();
		
		var mainCarousleId = $('#main-carousel');
		
		if (isMoving) return;
		isMoving = true;
		setTimeout(function() { isMoving = false; },2500);
		
		var delta = parseInt(e.originalEvent.wheelDelta || -e.originalEvent.detail);
		 
		if(delta/120 > 0) 	$(mainCarousleId).carousel('prev');
		else 	$(mainCarousleId).carousel('next'); 
		
	}); 
}



function BSCarouselIndicators(){
	
	var $carouselIndicators = $('.carousel-indicators');
	var carouselId = '#' + $carouselIndicators.parent('.carousel').attr('id');
	
	var $items = $('.carousel-inner .item');
	$($items).each(function(index){
		
		var activeted = "";
		if($(this).hasClass('active')){ activeted = 'active'; }
		$carouselIndicators.append('<li data-target="'+ carouselId + '" data-slide-to="' + index + 
			'" class="'+ activeted +'"></li>');
		
	});
	
}

function doAnimations( elems , direction ) {
	
    //Cache the animationend event in a variable
	
    var animEndEv = 'webkitAnimationEnd animationend';
    
	elems.each(function() {
	
		var $this = $(this),
			animationType = $this.data('slider-animation'),
			$innerAnimationElem = $this.find('.inner-animation');
			
		if(direction === 'right') {
			var reverseanimationType = animationType;
			animationType = 'in-direction-' + reverseanimationType;
		}
		
		var animationDelay = $this.data('animation-delay');
		var animationDuration = $this.data('animation-duration');
		var inverseAnimtion = 'inverse-'+ animationType;
		$innerAnimationElem.removeClass('scale-up');
			
			$this.addClass(animationType, 100).css({
				'animation-duration' : animationDuration,
				'animation-delay' : animationDelay
			}).on(animEndEv, function() {
				$this.removeClass(animationType);
			});
			
			$innerAnimationElem.css({
				'animation-duration' : animationDuration,
				'animation-delay' : animationDelay
				
			}).addClass(inverseAnimtion, 100).on(animEndEv, function() {
				if($innerAnimationElem.data('slider-scale-up')){
					$innerAnimationElem.addClass('scale-up');
				}
				$innerAnimationElem.removeClass(inverseAnimtion);
			});
		
	});
}

function enableBSCarousel(){
	
	$('#main-carousel').carousel({
        interval: false
    });
	
	var $myCarousel = $('.carousel'),
		$firstAnimatingElems = $myCarousel.find('.item:first').find("[data-slider-animation]");
		
	doAnimations($firstAnimatingElems);
	
	$myCarousel.on('slide.bs.carousel', function (e) {
		
		var $currentElem = $(e.relatedTarget);
		var direction = e.direction;
		$('.item').css({ transform : 'translate3d(0px, 0, 0)'});
			
		var itemAnimation = $currentElem.data('item-animation');
		
		var $prevItem = $('.item.active');
		var translateValue = 120;
		
		if(itemAnimation === 'to-left') {
			if(direction === 'left') 		$prevItem.css({ transform : 'translate3d(-' + translateValue + 'px, 0, 0)'});
			else if(direction === 'right')	$prevItem.css({ transform : 'translate3d('  + translateValue + 'px, 0, 0)'});
		}
		else if( itemAnimation === 'to-right' ){
			if(direction === 'left') 		$prevItem.css({ transform : 'translate3d('  + translateValue + 'px, 0, 0)'});
			else if(direction === 'right')	$prevItem.css({ transform : 'translate3d(-' + translateValue + 'px, 0, 0)'});
		}
		else if( itemAnimation === 'to-top' ){
			if(direction === 'left') 		$prevItem.css({ transform : 'translate3d(0, -' + translateValue + 'px, 0)'});
			else if(direction === 'right')	$prevItem.css({ transform : 'translate3d(0, '  + translateValue + 'px, 0)'});
		}
		else if( itemAnimation === 'to-bottom' ){
			if(direction === 'left') 		$prevItem.css({ transform : 'translate3d(0, '  + translateValue + 'px, 0)'});
			else if(direction === 'right')	$prevItem.css({ transform : 'translate3d(0, -' + translateValue + 'px, 0)'});
		}
		
		
		$('.item').each(function(index){
			$(this).css('zIndex', index + 1);
			if($(this).hasClass('active')) 	$(this).css('zIndex', 19);
		});
		
		$currentElem.css({ zIndex : 20 });
		
        var $animatingElems = $(e.relatedTarget).find("[data-slider-animation]");
		
        doAnimations($animatingElems, direction);
		
    });
	
	
}


function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

function enableMasonary(){
	
	if ( $.isFunction($.fn.masonry) && isExists('.masonry-container')) {
		$('.masonry-container').each(function(){
			$(this).masonry({ itemSelector: '.masonry-item',  columnWidth: '.masonry-item', percentPosition: true });
		});
	}
	
}

function enableSwiper(){
	
	if ( isExists('.swiper-container') ) {
		
		$('.swiper-container').each(function (index) {
			
			var swiperDirection 			= $(this).data('swiper-direction'),
				swiperSpeed					= $(this).data('swiper-speed'),
				swiperCrossFade				= $(this).data('swiper-crossfade'),
				swiperLoop					= $(this).data('swiper-loop'),
				swiperAutoplay 				= $(this).data('swiper-autoplay'),
				swiperMousewheelControl 	= $(this).data('swiper-wheel-control'),
				swipeSlidesPerview 			= $(this).data('slides-perview'),
				swiperMargin 				= parseInt($(this).data('swiper-margin')),
				swiperSlideEffect 			= $(this).data('slide-effect'),
				swiperAutoHeight 			= $(this).data('autoheight'),
				swiperScrollbar 			= ($(this).data('scrollbar') ? $(this).find('.swiper-scrollbar') : null);
				swiperScrollbar 			= (isExists(swiperScrollbar) ? swiperScrollbar : null);
				
			var animEndEv = 'webkitAnimationEnd animationend';
			
			var swiper = new Swiper($(this)[0], {
				pagination			: '.swiper-pagination',
				direction			: ( swiperDirection ? swiperDirection : 'horizontal'),
				slidesPerView		: ( swipeSlidesPerview ? swipeSlidesPerview : 'auto'),
				loop				: ( swiperLoop ? swiperLoop : false),
				nextButton			: '.swiper-button-next',
				prevButton			: '.swiper-button-prev',
				autoplay			: ( swiperAutoplay ? swiperAutoplay : false),
				paginationClickable	: true,
				spaceBetween		: ( swiperMargin ? swiperMargin : 0),
				mousewheelControl	: ( (swiperMousewheelControl) ? swiperMousewheelControl : false),
				scrollbar			: ( swiperScrollbar ? swiperScrollbar : null ),
				scrollbarHide		: false,
				speed				: ( swiperSpeed ? swiperSpeed : 1000 ),
				autoHeight			: ( (swiperAutoHeight == false) ? swiperAutoHeight : true ),
				effect				: ( swiperSlideEffect ? swiperSlideEffect : 'coverflow' ),
				fade				: { crossFade : swiperCrossFade },
				onSlideNextStart	: function(swiper){
										var currentSlide = $(swiper.slides[swiper.activeIndex]);
										var animatedElems = currentSlide.find('[data-swiper-animation]');
										
										$(animatedElems).each(function(){
											var $this = $(this),
												animClass = $this.data('swiper-animation');
											$this.addClass(animClass, 100).on(animEndEv, function(){
												$this.removeClass(animClass);
												
												});
											});
										},
				onSlidePrevStart	: function(swiper){
										var currentSlide = $(swiper.slides[swiper.activeIndex]);
										var animatedElems = currentSlide.find('[data-swiper-animation]');
										
										$(animatedElems).each(function(){
											var $this = $(this),
												animClass = $this.data('swiper-animation') + '-in';
											$this.addClass(animClass, 100).on(animEndEv, function(){
												$this.removeClass(animClass);
												
												});
											});
										},

										
				
			});
			
		});
		
	}
}

function isExists(elems){
	if ($(elems).length > 0) { 
		return true;
	}
	return false;
}





