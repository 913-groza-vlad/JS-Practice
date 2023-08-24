const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  menu.classList.toggle("active");
});

const useful = document.querySelector(".nav-item.useful");
const accordion = document.querySelector(".accordion");

useful.addEventListener("click", () => {
    useful.classList.toggle("sub-active");
    accordion.classList.toggle("sub-active");
  });

const displaySubmenu = (category, submenu) => {
  const categoryElements = document.getElementsByClassName(`nav-item ${category}`);
  const submenuElements = document.getElementsByClassName(submenu);

  categoryElements[0].addEventListener("click", () => {
      categoryElements[0].classList.toggle("sub-active2");
      submenuElements[0].classList.toggle("sub-active2");
    });
}

displaySubmenu('category2', 'submenu-cat2');
displaySubmenu('category4', 'submenu-cat4');