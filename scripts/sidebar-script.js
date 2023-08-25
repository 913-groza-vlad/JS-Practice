(() => {
  const menuData = [
    { icon: 'assets/medici icon.svg', label: 'Doctors' },
    { icon: 'assets/XMLID_2_.svg', label: 'Locations' },
    { icon: 'assets/specializari.svg', label: 'Specialisations' },
    { icon: 'assets/XMLID_2192_.svg', label: 'Prices' },
    { icon: 'assets/help.svg', label: 'Useful', arrowSrc: 'assets/Icon ionic-ios-arrow-forward-1.svg' },
  ];
  
  const menuList = document.querySelector('.menu');
  
  menuData.forEach(itemData => {
    const listItem = document.createElement('li');
    listItem.classList.add('nav-item');
  
    const img = document.createElement('img');
    img.src = itemData.icon;
    img.alt = `${itemData.label} icon`;
    listItem.appendChild(img);
  
    const p = document.createElement('p');
    p.classList.add('nav-link');
    p.textContent = itemData.label;
    listItem.appendChild(p);
  
    if (itemData.arrowSrc) {
      const arrowImg = document.createElement('img');
      arrowImg.src = itemData.arrowSrc;
      arrowImg.alt = 'down-arrow';
      arrowImg.style.marginLeft = '115px';
      listItem.classList.add('useful');
      listItem.appendChild(arrowImg);
    }
  
    menuList.appendChild(listItem);
  });
})();


const displaySubmenu = (category) => {
  const categoryElements = document.getElementsByClassName(`nav-item ${category}`);
  const submenuElems = categoryElements[0].nextElementSibling;

  categoryElements[0].addEventListener("click", () => {
      categoryElements[0].classList.toggle("sub-active2");
      submenuElems.classList.toggle("sub-active2");

      const getAllSubActive2 = document.querySelectorAll('.sub-active2');
      getAllSubActive2.forEach(element => {
        if (element.classList.contains('sub-active2') && element !== submenuElems) {
          element.classList.remove('sub-active2');
        }
      });
    });
}

(() => {
  const submenu = document.querySelector('.submenu');

  const submenuData = [
    { name: 'Category 1'},
    { name: 'Category 2', submenuItems: ['Category 2.1', 'Category 2.2'] },
    { name: 'Category 3'},
    { name: 'Category 4', submenuItems: ['Category 4.1', 'Category 4.2'] },
    { name: 'Category 5', submenuItems: ['Category 5.1', 'Category 5.2', 'Category 5.3'] },
  ];

  submenuData.forEach((itemData, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('nav-item');

    const p = document.createElement('p');
    p.textContent = itemData.name;
    listItem.appendChild(p);

    if (itemData.submenuItems) {
      const arrowImg = document.createElement('img');
      arrowImg.src = "assets/Icon ionic-ios-arrow-forward-3.svg"
      arrowImg.alt = 'down-arrow';
      listItem.appendChild(arrowImg);

      const subMenuDiv = document.createElement('div');
      subMenuDiv.classList.add('submenu-category');
      listItem.classList.add(`category-${index + 1}`);
      itemData.submenuItems.forEach(submenuItem => {
        const subMenuItem = document.createElement('p');
        subMenuItem.textContent = submenuItem;
        subMenuDiv.appendChild(subMenuItem);
      });
      submenu.appendChild(listItem);
      submenu.appendChild(subMenuDiv);

      displaySubmenu(listItem.classList[1]);
    }
    else
      submenu.appendChild(listItem);
  });

})();

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

    const isAccordionActive = accordion.classList.contains('sub-active');
    if (!isAccordionActive) {
      const elementsWithClassSubActive = document.querySelectorAll('.sub-active2');

      elementsWithClassSubActive.forEach(element => {
        element.classList.remove('sub-active2');
      });
    }
  });

