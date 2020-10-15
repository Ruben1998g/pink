var mainNav = document.querySelector(".header-page__main-ul");

var headerpage = document.querySelector(".header-page__first");

var open = document.querySelector(".header-page__open");
var close = document.querySelector(".header-page__close");


open.addEventListener("click", function(evt){
	evt.preventDefault();
	mainNav.classList.add("main-nav--open");
	headerpage.classList.remove("header-page__first--mod");

	open.classList.add("hidden");
	close.classList.remove("hidden");
});


close.addEventListener("click", function(evt){
	evt.preventDefault();
	mainNav.classList.remove("main-nav--open");
	headerpage.classList.add("header-page__first--mod");


	open.classList.remove("hidden");
	close.classList.add("hidden");
});