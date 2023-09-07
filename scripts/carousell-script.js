let slideCount = 0;
let timeoutID;
let startX, moveX, isDragging = false;

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
    buttons[i].classList.remove("active");
  }

  buttons[slideCount - 1].classList.add("active");

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
      buttons[i].classList.remove("active");
  }
  buttons[slideCount - 1].classList.add("active");

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


const startDragging = (slideshowWrapper) => {
  slideshowWrapper.addEventListener("mousedown", (event) => {
    isDragging = true;
    startX = event.clientX;
    moveX = startX;
  });
};

const dragging = (slideshowWrapper, slides) => {
  slideshowWrapper.addEventListener("mousemove", (event) => {
    if (!isDragging) return;

    const mouseX = event.clientX;
    const deltaX = mouseX - moveX;

    slides.forEach((slide) => {
      slide.style.transition = "none";
      slide.style.transform = `translateX(calc(-${100 * (slideCount - 1)}vw + ${deltaX}px))`;
    });

    moveX = mouseX;
  });
};

const stopDragging = (slideshowWrapper, slides) => {
  slideshowWrapper.addEventListener("mouseup", () => {
    if (!isDragging) return;

    isDragging = false;
    const deltaX = moveX - startX;

    if (deltaX > 100) {
      currentSlide(slideCount - 1);
    } else if (deltaX < -100) {
      currentSlide(slideCount + 1);
    } else {
      currentSlide(slideCount);
    }

    slides.forEach((slide) => {
      slide.style.transition = "transform 0.8s ease-in-out";
      slide.style.transform = `translateX(-${100 * (slideCount - 1)}vw)`;
    });
  });
};


function slideDragging() {
  const slideshowWrapper = document.querySelector(".slides-wrapper");
  const slides = document.querySelectorAll(".slide");

  startDragging(slideshowWrapper);
  dragging(slideshowWrapper, slides);
  stopDragging(slideshowWrapper, slides);
}

slideDragging();