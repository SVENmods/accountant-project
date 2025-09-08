if (document.querySelector('.slider')) {
	new Swiper('.slider-event__wrapper', {
		observer: true,
		watchOverflow: true,
		observeParents: true,
		slidesPerView: 1,
		parallax: true,
		spaceBetween: 24,
		speed: 800,
		mousewheel: {
			sensitive: 1
		},
		navigation: {
			nextEl: '.event-control-next',
			prevEl: '.event-control-prev',
		},
		breakpoints: {
			565: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 3,
			},
			1400: {
				slidesPerView: 4,
			},
		},
	});
}

// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";


function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();
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
