// JavaScript Document

  $('#gotopImg').click(function(){
    $('html,body').animate({scrollTop:$('#gotop').offset().top},800);
  });
  
const swiper = new Swiper('.swiper2', {
  freeMode: true,
  loop: true,
  // Optional parameters
  
  slidesPerView: 2,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
	
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});	  


$(function(){
	var $BuyButton2 = $('#BuyButton2');
	var $menu = $('.menu');

	//點擊切換
	$BuyButton2.click(function(){
	$menu.toggleClass('open');
	})
	
		//點擊切換
	$menu.click(function(){
	$menu.toggleClass('open');
	})
	
});

const swiper3 = new Swiper('.swiper3', {
  freeMode: true,
  loop: true,
  // Optional parameters
  
  slidesPerView: 2,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
	
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});	  