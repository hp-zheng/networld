'use strict';

/**
 * 调试导航栏
 */
const header = document.querySelector("[data-header]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");

navToggleBtn.addEventListener("click", function () {
	header.classList.toggle("nav-active");
	this.classList.toggle("active");
});

/**
 * 点击导航栏链接时调试导航栏
 */
const navbarLinks = document.querySelectorAll("[data-nav-link]");

for (let i = 0; i < navbarLinks.length; i++) {
	navbarLinks[i].addEventListener("click", function () {
		header.classList.toggle("nav-active");
		navToggleBtn.classList.toggle("active");
	});
}

/**
 * Header 和返回顶部
 */
const backTopBtn = document.querySelector("[data-back-to-top]");

window.addEventListener("scroll", function () {
	if (window.scrollY >= 100) {
		header.classList.add("active");
		backTopBtn.classList.add("active");
	} else {
		header.classList.remove("active");
		backTopBtn.classList.remove("active");
	}
});






/**
* SLIDER
*/

const sliders = document.querySelectorAll("[data-slider]");

const initSlider = function (currentSlider) {
	
	const sliderContainer = currentSlider.querySelector("[data-slider-container]");
	const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
	const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");
	
	let totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items"));
	let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;
	
	let currentSlidePos = 0;
	
	const moveSliderItem = function () {
		sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
	}
	
	/**
	* NEXT SLIDE
	*/
	const slideNext = function () {
		const slideEnd = currentSlidePos >= totalSlidableItems;
		
		if (slideEnd) {
			currentSlidePos = 0;
		} else {
			currentSlidePos++;
		}
		
		moveSliderItem();
	}
	
	sliderNextBtn.addEventListener("click", slideNext);
	
	/**
	* PREVIOUS SLIDE
	*/
	const slidePrev = function () {
		if (currentSlidePos <= 0) {
			currentSlidePos = totalSlidableItems;
		} else {
			currentSlidePos--;
		}
		
		moveSliderItem();
	}
	
	sliderPrevBtn.addEventListener("click", slidePrev);
	
	const dontHaveExtraItem = totalSlidableItems <= 0;
	if (dontHaveExtraItem) {
		sliderNextBtn.style.display = 'none';
		sliderPrevBtn.style.display = 'none';
	}
	
	/**
	* slide with [shift + mouse wheel]
	*/
	
	currentSlider.addEventListener("wheel", function (event) {
		if (event.shiftKey && event.deltaY > 0) slideNext();
		if (event.shiftKey && event.deltaY < 0) slidePrev();
	});
	
	/**
	* RESPONSIVE
	*/
	
	window.addEventListener("resize", function () {
		totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items"));
		totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;
		
		moveSliderItem();
	});
	
}

for (let i = 0, len = sliders.length; i < len; i++) { initSlider(sliders[i]); }
