let slideCount = 0;
let timeoutID;

slideShow();

function slideShow() {
  const slides = document.getElementsByClassName("slide");
  const buttons = document.getElementsByClassName("dots");

  slideCount++;
  if (slideCount > slides.length) {
    slideCount = 1
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.transform = `translateX(-${100* (slideCount - 1)}vw)`;
    buttons[i].classList.remove("current");
  }

  buttons[slideCount - 1].classList.add("current");

  // clear the timeout
  clearTimeout(timeoutID);

  // change the slide every 10 seconds
  timeoutID = setTimeout(slideShow, 10000); 
}


const slideChange = (count) => {
  const slides = document.getElementsByClassName("slide");
  const buttons = document.getElementsByClassName("dots");
  
  if (count > slides.length)
    slideCount = 1;

  if (count < 1)
    slideCount = slides.length

  for (let i = 0; i < slides.length; i++) 
    slides[i].style.transform = `translateX(-${100* (slideCount - 1)}vw)`;

  for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("current");
  }
  buttons[slideCount - 1].classList.add("current");

  clearTimeout(timeoutID);
  timeoutID = setTimeout(slideShow, 10000);
};

const currentSlide = (count) => {
  slideChange(slideCount = count);
}

const buttons = document.querySelectorAll(".dots");
buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    currentSlide(index + 1);
  });
});