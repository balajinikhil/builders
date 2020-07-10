var slides = document.querySelectorAll("#slides-i .slide-i");
var currentSlide = 0;
var slideInterval = setInterval(nextSlide, 2000);

function nextSlide() {
  slides[currentSlide].className = "slide-i";
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].className = "slide-i showing-i";
}
