let buttonMenu = document.querySelector('.button-menu');
if (buttonMenu) {
     buttonMenu.addEventListener('click', function (e) {
          if (bodyLockStatus) {
               bodyLockToggle();
               document.documentElement.classList.toggle('menu-open');
          }
     });
}

const buttonSubMenu = document.querySelectorAll('.button-sub-menu');
const buttonBackMenu = document.querySelectorAll('.submenu-header__back');

document.addEventListener('click', documentActions);
function documentActions(e) {
     const targetElement = e.target;
     if (
          targetElement.closest('[data-parent]') ||
          targetElement.querySelector('i')
     ) {
          const subMenuId =
               targetElement.dataset.parent ||
               targetElement.parentElement.dataset.parent;
          const subMenu = document.querySelector(
               `[data-submenu="${subMenuId}"]`
          );
          if (subMenu) {
               document.documentElement.classList.toggle('sub-menu-open');
               subMenu.classList.toggle('_sub-menu-open');
          }
          e.preventDefault();
     }
     if (
          targetElement.closest('.submenu-header__back') ||
          targetElement.closest('.button-menu') ||
          targetElement.closest('.header__overflow')
     ) {
          document.documentElement.classList.remove('sub-menu-open');
          document.querySelector('._sub-menu-active')
               ? document
                      .querySelector('._sub-menu-active')
                      .classList.remove('_sub-menu-active')
               : null;
          document.querySelector('._sub-menu-open')
               ? document
                      .querySelector('._sub-menu-open')
                      .classList.remove('_sub-menu-open')
               : null;
          e.preventDefault();
     }
     if (targetElement.closest('.header__overflow')) {
          if (bodyLockStatus) {
               bodyLockToggle();
               document.documentElement.classList.toggle('menu-open');
          }
     }
}

let bodyLockStatus = true;
let bodyLockToggle = (delay = 500) => {
     if (document.documentElement.classList.contains('lock')) {
          bodyUnlock(delay);
     } else {
          bodyLock(delay);
     }
};
let bodyUnlock = (delay = 500) => {
     let body = document.querySelector('body');
     if (bodyLockStatus) {
          setTimeout(() => {
               body.style.paddingRight = '0px';
               document.documentElement.classList.remove('lock');
          }, delay);
          bodyLockStatus = false;
          setTimeout(function () {
               bodyLockStatus = true;
          }, delay);
     }
};
let bodyLock = (delay = 500) => {
     let body = document.querySelector('body');
     if (bodyLockStatus) {
          body.style.paddingRight =
               window.innerWidth -
               document.querySelector('.wrapper').offsetWidth +
               'px';
          document.documentElement.classList.add('lock');

          bodyLockStatus = false;
          setTimeout(function () {
               bodyLockStatus = true;
          }, delay);
     }
};

const tabs = document.querySelectorAll('.tab');
// получаем массив всех блоков с содержимым вкладок

const contents = document.querySelectorAll('.content');
// запускаем цикл для каждой вкладки и добавляем на неё событие

for (let i = 0; i < tabs.length; i++) {
     tabs[i].addEventListener('click', (event) => {
          event.preventDefault();
          // сначала нам нужно удалить активный класс именно с вкладок
          let tabsChildren = event.target.parentElement.children;
          for (let t = 0; t < tabsChildren.length; t++) {
               tabsChildren[t].classList.remove('tab-active');
          }
          // добавляем активный класс
          tabs[i].classList.add('tab-active');
          // теперь нужно удалить активный класс с блоков содержимого вкладок
          let tabContentChildren =
               event.target.parentElement.nextElementSibling.children;
          for (let c = 0; c < tabContentChildren.length; c++) {
               tabContentChildren[c].classList.remove('content-active');
          }
          // добавляем активный класс
          contents[i].classList.add('content-active');
     });
}

const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

const textArray = [
     'Профессиональные консультации',
     'Ведение бухгалтерии',
     'Расчет заработной платы',
];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 1500; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

// function type() {
//   if (charIndex < textArray[textArrayIndex].length) {
//     if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
//     typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
//     charIndex++;
//     setTimeout(type, typingDelay);
//   }
//   else {
//     cursorSpan.classList.remove("typing");
//     setTimeout(erase, newTextDelay);
//   }
// }

// function erase() {
//   if (charIndex > 0) {
//     if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
//     typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
//     charIndex--;
//     setTimeout(erase, erasingDelay);
//   }
//   else {
//     cursorSpan.classList.remove("typing");
//     textArrayIndex++;
//     if(textArrayIndex>=textArray.length) textArrayIndex=0;
//     setTimeout(type, typingDelay + 1100);
//   }
// }

// document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
//   if(textArray.length) setTimeout(type, newTextDelay + 250);
// });

const accordionBtn = document.querySelectorAll('.item-accordion__button');

for (let i = 0; i < accordionBtn.length; i++) {
     accordionBtn[i].addEventListener('click', function () {
          let accordion = document.getElementsByClassName('accordion-collapse');
          for (let z = 0; z < accordion.length; z++) {
               if (accordion[i].classList.contains('show')) {
                    console.log(this.classList);
               } else {
               }
          }
     });
}

let swiper = new Swiper('.team-swiper', {
     slidesPerView: 3,
     spaceBetween: 10,
     loop: true,
     pagination: {
          el: '.swiper-pagination',
          clickable: true,
     },
     navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
     },
     breakpoints: {
          640: {
               slidesPerView: 3,
          },
          480: {
               slidesPerView: 2,
          },
          320: {
               slidesPerView: 1,
          },
     },
});

// accord.addEventListener('click', function (event) {
//     event.preventDefault();
//     console.log("res")
// }, false);

function setCookie(name, value, days) {
     var expires = '';
     if (days) {
          var date = new Date();
          date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
          expires = '; expires=' + date.toUTCString();
     }
     document.cookie = name + '=' + (value || '') + expires + '; path=/';
}
function getCookie(name) {
     var nameEQ = name + '=';
     var ca = document.cookie.split(';');
     for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0)
               return c.substring(nameEQ.length, c.length);
     }
     return null;
}

function uploadFile(target) {
     document.getElementById('file-name').innerHTML = target.files[0].name;
}

//  hide alert and modal by btn
document
     .querySelectorAll('#cookieModal .cookies-close .button')
     .forEach((el) => {
          el.addEventListener('click', () => {
               $('#cookieModal').modal('hide');
               $('#cookiesAlert').hide();
          });
     });
//  hide alert and modal by btn

let scrollup = document.getElementById('scrollup');
window.onscroll = function () {
     scrollFunction();
};
function scrollFunction() {
     try {
          if (
               document.body.scrollTop > 100 ||
               document.documentElement.scrollTop > 100
          ) {
               scrollup.style.display = 'flex';
               setTimeout(() => {
                    scrollup.style.opacity = 1;
                    scrollup.style.visibility = 'visible';
               }, 300);
          } else {
               scrollup.style.display = 'none';
               setTimeout(() => {
                    scrollup.style.opacity = 0;
                    scrollup.style.visibility = 'hidden';
               }, 300);
          }
     } catch (error) {
          console.log(error);
     }
}

scrollup.addEventListener('click', backToTop);

function backToTop() {
     document.body.scrollTop = 0;
     document.documentElement.scrollTop = 0;
}

let link = document.querySelectorAll('.submenu-header__link');

for (let i = link.length - 1; i >= 0; i--) {
     link[i].addEventListener(
          'click',
          () => {
               document
                    .querySelector('.menu-header__item')
                    .classList.remove('hover-menu');
               setTimeout(() => {
                    document
                         .querySelector('.menu-header__item')
                         .classList.add('hover-menu');
               }, 1000);
          },
          false
     );
}
