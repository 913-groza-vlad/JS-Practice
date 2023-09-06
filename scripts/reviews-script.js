(() => {
  const reviews = [
    {image: "../assets/person-1.jpg", score: 100, date: "August, 31, 2023", text: '"Best clinic ever!"'},
    {image: "../assets/person-2.jpg", score: 20, date: "August, 27, 2020", text: '"Pretty bad clinic!"'},
    {image: "../assets/person-3.png", score: 45, date: "December, 6, 2018", text: '"Could be better!"'},
    {image: "../assets/person-4.jpg", score: 80, date: "September, 1, 2023", text: '"Almost the best clinic ever!"'},
    {image: "../assets/person-5.jpg", score: 100, date: "July, 14, 2022", text: '"Best clinic ever!"'},
    {image: "../assets/person-6.jpg", score: 0, date: "August, 27, 2021", text: '"Worst clinic ever!"'},
  ];

  const reviewsNumber = reviews.length;

  const setPersonImage = (review, reviewCard, index) => {
    const reviewImage = document.createElement("img");
    reviewImage.src = review.image;
    reviewImage.alt = `person-${index + 1}`;
    reviewCard.appendChild(reviewImage);
  };

  const setStar = (reviewScore, review) => {
    const star = document.createElement("i");
    star.classList.add("fa", "fa-star");
    star.style.background = `linear-gradient(360deg, yellow 0%, yellow ${review.score}%, grey ${review.score}%, grey 100%)`;
    star.style.fontSize = "25px";
    star.style.webkitBackgroundClip = "text";
    star.style.webkitTextFillColor = "transparent";
    reviewScore.appendChild(star);
  }

  const setReviewDate = (review, reviewCard) => {
    const reviewDate = document.createElement("p");
    reviewDate.classList.add("review-date");
    reviewDate.textContent = review.date;
    reviewCard.appendChild(reviewDate);
  };

  const setReviewText = (review, reviewCard) => {
    const reviewText = document.createElement("p");
    reviewText.classList.add("review-text");
    reviewText.textContent = review.text;
    reviewCard.appendChild(reviewText);
  };

  const createReviewsCards = () => {
    let index = 0;
    const reviewsContainer = document.querySelector(".reviews-container");

    while (index < reviewsNumber) {
      let review = reviews[index];

      const reviewCard = document.createElement("div");
      reviewCard.classList.add("review-card");

      setPersonImage(review, reviewCard, index);

      const reviewScore = document.createElement("div");
      reviewScore.classList.add("review-score");
      for (let i = 0; i < 5; i++) {
        setStar(reviewScore, review);
      }
      reviewCard.appendChild(reviewScore);

      setReviewDate(review, reviewCard);
      setReviewText(review, reviewCard);
    
      reviewsContainer.appendChild(reviewCard);
      index += 1;
    }
  };

  createReviewsCards();  
})();

const reviewsCarousel = document.querySelector(".reviews-container"),
  firstCard = reviewsCarousel.querySelectorAll(".review-card")[0],
  leftArrow = document.querySelector("#left-arrow"),
  rightArrow = document.querySelector("#right-arrow");

let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;


const cardMargin = 50;
const showHideIcons = () => {
  const showHideThreshold = cardMargin;

  // Calculate the maximum scrollable width.
  const scrollWidth = reviewsCarousel.scrollWidth - reviewsCarousel.clientWidth;

  // Check if we're close to the beginning or end of the carousel.
  const nearBeginning = reviewsCarousel.scrollLeft <= showHideThreshold;
  const nearEnd = Math.abs(reviewsCarousel.scrollLeft - scrollWidth) <= showHideThreshold;

  // Show or hide the left and right arrows based on the position.
  leftArrow.style.visibility = nearBeginning ? "hidden" : "visible";
  rightArrow.style.visibility = nearEnd ? "hidden" : "visible";
};

leftArrow.addEventListener("click", () => {
  let firstCardWidth = firstCard.clientWidth + cardMargin; // getting first review card width & adding margin value
  reviewsCarousel.scrollLeft -= firstCardWidth;
  setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
});

rightArrow.addEventListener("click", () => {
  let firstCardWidth = firstCard.clientWidth + cardMargin;
  reviewsCarousel.scrollLeft += firstCardWidth;
  setTimeout(() => showHideIcons(), 60);
});

const autoSlide = () => {
  // if there is no card left to scroll then return from here
  if (reviewsCarousel.scrollLeft - (reviewsCarousel.scrollWidth - reviewsCarousel.clientWidth) > -1 || reviewsCarousel.scrollLeft <= 0) return showHideIcons();

  positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
  let firstCardWidth = firstCard.clientWidth + cardMargin;
  let valDifference = firstCardWidth - positionDiff;

  if (reviewsCarousel.scrollLeft > prevScrollLeft) {
    // if user is scrolling to the right
    reviewsCarousel.scrollLeft += positionDiff > firstCardWidth / 3 ? valDifference : -positionDiff;
    showHideIcons();
  } else {
    // if user is scrolling to the left
    reviewsCarousel.scrollLeft -= positionDiff > firstCardWidth / 3 ? valDifference : -positionDiff;
    showHideIcons();
  }
};

const dragStart = (e) => {
  // updatating global variables value on mouse down event
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = reviewsCarousel.scrollLeft;
};

const dragging = (e) => {
  // scrolling images/carousel to left according to mouse pointer
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  reviewsCarousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  reviewsCarousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};

const dragStop = () => {
  isDragStart = false;
  reviewsCarousel.classList.remove("dragging");
  if (!isDragging) return;
  isDragging = false;
  autoSlide();
};

reviewsCarousel.addEventListener("mousedown", dragStart);
document.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
