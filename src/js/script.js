"use strict";
//////////////////////////////////////////
/// SELECTORS

const navBox = document.querySelector(".header--nav--box");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const aboutUs = document.querySelector(".about");
const products = document.querySelector(".products");
const shop = document.querySelector(".shop");
const user = document.querySelector(".user");
const arrow = document.querySelector(".arrow");

//////////////////////////////////////////
/// STICKY NAV && ARROW BUTTON

const navHeight = nav.getBoundingClientRect().height - 30; // -30 for new smaller nav

const stickyNav = function (entries) {
  console.log(navHeight);
  const [entry] = entries;
  if (!entry.isIntersecting) {
    navBox.classList.add("sticky");
    arrow.classList.remove("hidden");
  } else {
    navBox.classList.remove("sticky");
    arrow.classList.add("hidden");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight + 1}px`, // 1px to add it 1px earlyer from about section when scrool to look nicer
});

headerObserver.observe(header);

//////////////////////////////////////////
/// PAGE NAVIGATION

// const navLinks = document.querySelector(".nav__list");
// navLinks.addEventListener("click", function (e) {
//   e.preventDefault();
//   console.log(e);
//   if (e.target.classList.contains("nav__link")) {
//     const id = e.target.getAttribute("href");
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   }
// });

const navLink = document.querySelectorAll(".nav__link");
navLink.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const id = e.target.getAttribute("href");
    const element = document.querySelector(id);
    const y =
      element.getBoundingClientRect().top + window.pageYOffset - navHeight;

    window.scrollTo({ top: y, behavior: "smooth" });
  });
});

//////////////////////////////////////////
/// BUTTON NAVIGATION

const headerButtons = document.querySelector(".header__buttons");
headerButtons.addEventListener("click", function (e) {
  e.preventDefault();
  const btn = e.target.closest(".btn");
  if (!btn) return;
  const id = btn.getAttribute("href");
  const element = document.querySelector(id);
  const y =
    element.getBoundingClientRect().top + window.pageYOffset - navHeight;

  window.scrollTo({ top: y, behavior: "smooth" });
});

//////////////////////////////////////////
/// ARROW NAVIGATION

arrow.addEventListener("click", function (e) {
  e.preventDefault();
  const btn = e.target.closest(".arrow");
  if (!btn) return;
  const id = btn.getAttribute("href");
  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
});

//////////////////////////////////////////
/// REVEAL BOXES
const animateSections = document.querySelectorAll(".animate");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("show-box");

  observer.unobserve(entry.target);
};

const revealObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

animateSections.forEach((section) => {
  revealObserver.observe(section);
  section.classList.add(".show-box");
});

///////////////////////////////////////
// SLIDER

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

////////////////////////////////////////////\
///////////////// SHOP NOW
const PopupSection = document.querySelector(".popup");
document.querySelectorAll(".card__button").forEach((btn) => {
  btn.addEventListener("click", function (b) {
    const btnTarget = b.target.closest(".card");

    const laptopImg = btnTarget.children[0].attributes[0].nodeValue;
    const laptopNameOne = btnTarget.children[1].childNodes[0].data;
    const laptopNameTwo = btnTarget.children[1].childNodes[2].data;
    const laptopPrice = btnTarget.children[2].childNodes[0].data;
    console.log(btnTarget);
    console.log(laptopImg);
    console.log(laptopNameOne);
    console.log(laptopNameTwo);
    console.log(laptopPrice);

    const markup = `
      <img src="${laptopImg}" alt="laptop-image" class="popup__laptop--img">
      <div class="popup__laptop--name">${laptopNameOne} ${laptopNameTwo}</div>   
      <div class="popup__laptop--price">${laptopPrice}</div>   
    `;
    PopupSection.insertAdjacentHTML("afterbegin", markup);
  });
});
