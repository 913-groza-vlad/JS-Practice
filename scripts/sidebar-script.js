(() => {
  const displaySubmenu = (menuLabel, category) => {
    const categoryElements = document.querySelector(`.submenu.${menuLabel} .nav-item.${category}`);  
    const submenuElems = categoryElements.nextElementSibling;
      
    categoryElements.addEventListener("click", () => {
      categoryElements.classList.toggle("sub-active2");
      submenuElems.classList.toggle("sub-active2");
        
      const getAllSubActive2 = document.querySelectorAll(".sub-active2");
      getAllSubActive2.forEach((element) => {
        if (element.tagName !== 'LI' && element !== submenuElems) {
          element.classList.remove("sub-active2");
        }
      });
    });
  };

  const getSubmenuItem = (itemData) => {
    const listItem = document.createElement("li");
    listItem.classList.add("nav-item");

    const p = document.createElement("p");
    p.textContent = itemData.name;
    listItem.appendChild(p);

    return listItem;
  };
  
  
  const addSubmenusToMenu = (parrentEl) => {
    const accordion = document.createElement("div");
    accordion.classList.add("accordion");
    const submenu = document.createElement("ul");
    submenu.classList.add("submenu");
    submenu.classList.add(parrentEl.label.toLowerCase());
    accordion.appendChild(submenu);

    const menu = document.querySelector(".menu");
    menu.appendChild(accordion);

    parrentEl.submenuData.forEach((itemData, index) => {
      
      const listItem = getSubmenuItem(itemData);
      submenu.appendChild(listItem);

      if (itemData.submenuItems) {
        const arrowImg = document.createElement("img");
        arrowImg.classList.add("arrow-symbol");
        arrowImg.src = "assets/Icon ionic-ios-arrow-forward-3.svg";
        arrowImg.alt = "down-arrow";
        listItem.appendChild(arrowImg);

        const subMenuDiv = document.createElement("div");
        subMenuDiv.classList.add("submenu-category");
        listItem.classList.add(`category-${index + 1}`);
        itemData.submenuItems.forEach((submenuItem) => {
          const subMenuItem = document.createElement("p");
          subMenuItem.textContent = submenuItem;
          subMenuDiv.appendChild(subMenuItem);
        });
        submenu.appendChild(subMenuDiv);

        displaySubmenu(submenu.classList[1], listItem.classList[1]);
      }
    });
  };

  const usefulSubmenuData = [
    {name: "Category 1"},
    {name: "Category 2", submenuItems: ["Category 2.1", "Category 2.2"]},
    {name: "Category 3"},
    {name: "Category 4", submenuItems: ["Category 4.1", "Category 4.2"]},
    {name: "Category 5", submenuItems: ["Category 5.1", "Category 5.2", "Category 5.3"]},
  ];

  const locatonsSubmenuData = [
    {name: "Category 1"},
    {name: "Category 2", submenuItems: ["Category 2.1"]},
    {name: "Category 3", submenuItems: ["Category 3.1", "Category 3.2"]},
  ];

  const menuData = [
    {icon: "assets/medici icon.svg", label: "Doctors"},
    {icon: "assets/XMLID_2_.svg", label: "Locations", submenuData: locatonsSubmenuData},
    {icon: "assets/specializari.svg", label: "Specialisations"},
    {icon: "assets/XMLID_2192_.svg", label: "Prices"},
    {icon: "assets/help.svg", label: "Useful", submenuData: usefulSubmenuData},
  ];

  const arrowSrc = "assets/Icon ionic-ios-arrow-forward-1.svg";

  const menuList = document.querySelector(".menu");

  menuData.forEach((itemData) => {
    const listItem = document.createElement("li");
    listItem.classList.add("nav-item");

    const img = document.createElement("img");
    img.src = itemData.icon;
    img.alt = `${itemData.label} icon`;
    listItem.appendChild(img);

    const p = document.createElement("p");
    p.classList.add("nav-link");
    p.textContent = itemData.label;
    listItem.appendChild(p);

    if (itemData.submenuData) {
      const arrowImg = document.createElement("img");
      arrowImg.classList.add("arrow-symbol");
      arrowImg.src = arrowSrc;
      arrowImg.alt = "down-arrow";
      listItem.classList.add("useful");
      listItem.appendChild(arrowImg);
      menuList.appendChild(listItem);
      addSubmenusToMenu(itemData, listItem);
    }
    else
      menuList.appendChild(listItem);
  });

})();

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  menu.classList.toggle("active");
});

const usefuls = document.querySelectorAll(".nav-item.useful");

usefuls.forEach((useful) => {
  const accordion = useful.nextElementSibling;
  useful.addEventListener("click", () => {
    useful.classList.toggle("sub-active");
    accordion.classList.toggle("sub-active");
  
    const isAccordionActive = accordion.classList.contains("sub-active");
    if (!isAccordionActive) {
      const elementsWithClassSubActive = document.querySelectorAll(".sub-active2");
  
      elementsWithClassSubActive.forEach((element) => {
        element.classList.remove("sub-active2");
      });
    }
  });
});
