(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.banner = void 0;

var banner = function banner() {
  var swiper = new Swiper('.swiper', {
    allowTouchMove: true,
    breakpoints: {
      480: {
        allowTouchMove: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  });
  swiper.on('slideChange', function () {
    var _this = this;

    var swiperVideos = document.querySelectorAll('.swiper-slide .swiper__video');

    if (!swiperVideos) {
      return;
    }

    swiperVideos.forEach(function (swiperVideo) {
      if (_this === swiperVideo) {
        _this.pause();
      }
    });
  });
};

exports.banner = banner;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modal = void 0;

var modal = function modal() {
  var openModal = function openModal() {
    var modal = document.querySelector('.modal');
    var bodyLock = document.querySelector('.body');
    var interval = 1000;
    var lastTimeShow = localStorage.getItem('lastTimeDisplayModal');
    var threeHoursAgo = Number(lastTimeShow) + interval;
    var canShow = localStorage.getItem('canShow');

    if (!modal || !bodyLock) {
      return;
    }

    if (canShow !== 'false') {
      if (!lastTimeShow || threeHoursAgo < Date.now()) {
        modal.classList.add('show');
        bodyScrollLock.enableBodyScroll(bodyLock);
        localStorage.setItem('lastTimeDisplayModal', Date.now().toString());
        localStorage.setItem('canShow', 'true');
      }
    }
  };

  var closeModal = function closeModal() {
    var closeButton = document.querySelector('.modal__close');
    var modal = document.querySelector('#modal');
    var submitButton = document.querySelector('.modal__submit-button');

    if (!closeButton || !modal || !submitButton) {
      return;
    }

    closeButton.addEventListener('click', function () {
      modal.classList.remove('show');
    });
    submitButton.addEventListener('click', function () {
      modal.classList.remove('show');
      localStorage.setItem('canShow', 'false');
    });
    window.addEventListener('click', function (event) {
      var target = event.target;

      if (target === modal && !target.closest('.modal__wrapper')) {
        modal.classList.remove('show');
      }
    });
  };

  openModal();
  setInterval(openModal, 5000);
  closeModal();
};

exports.modal = modal;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.header = void 0;

var header = function header() {
  var bodyLock = document.querySelector('.body');
  var mainBarItems = document.querySelectorAll('.header__main-bar-item');
  var mainBarDropdownsItems = document.querySelectorAll('.header__main-bar-dropdown-item');
  var mainBarBurgerMenu = document.querySelector('.header__main-bar-burger-menu');
  var mainBarNav = document.querySelector('.header__main-bar-nav');
  var header = document.querySelector('.header');
  var mainBarItemsDropdowns = document.querySelectorAll('.header__main-bar-item-dropdown');
  var mainBarItemsButtons = document.querySelectorAll('.header__main-bar-item-button');

  var adjacentElements = function adjacentElements(element) {
    return [].slice.call(element.parentNode.children).filter(function (child) {
      return child !== element;
    });
  };

  var hoverOutsideTheElement = function hoverOutsideTheElement(element) {
    element.forEach(function (item) {
      item.addEventListener('mouseenter', function () {
        adjacentElements(item).forEach(function (el) {
          el.classList.add('unhovered');
        });
      });
      item.addEventListener('mouseleave', function () {
        adjacentElements(item).forEach(function (el) {
          el.classList.remove('unhovered');
        });
      });
    });
  };

  var openHeaderBurgerMenu = function openHeaderBurgerMenu() {
    mainBarBurgerMenu.addEventListener('click', function () {
      mainBarBurgerMenu.classList.toggle('open');
      mainBarNav.classList.toggle('open');
      header.classList.toggle('header--overlay');

      if (mainBarBurgerMenu.classList.contains('open')) {
        bodyScrollLock.disableBodyScroll(bodyLock);
      } else {
        bodyScrollLock.enableBodyScroll(bodyLock);
      }
    });
  };

  var closeHeaderBurgerMenu = function closeHeaderBurgerMenu() {
    window.addEventListener('click', function (event) {
      var target = event.target;
      mainBarItemsDropdowns.forEach(function (item) {
        if (!target.closest('.header__main-bar-item-button') && !target.closest('.header__main-bar-item-dropdown')) {
          item.classList.remove('open');
        }

        if (!target.closest('.header__main-bar-burger-menu') && !target.closest('.header__main-bar-nav')) {
          mainBarBurgerMenu.classList.remove('open');
          mainBarNav.classList.remove('open');
          header.classList.remove('header--overlay');
          bodyScrollLock.enableBodyScroll(bodyLock);
        }
      });
    });
  };

  var openDropdowns = function openDropdowns() {
    mainBarItemsDropdowns.forEach(function (item) {
      item.addEventListener('click', function () {
        item.classList.toggle('open');
      });
    });
  };

  var closeDropdowns = function closeDropdowns() {
    var _loop = function _loop(i) {
      if (mainBarItemsDropdowns[i].classList.contains('open')) {
        mainBarItemsButtons[i].addEventListener('click', function () {
          mainBarItemsButtons[i].classList.remove('open');
        });
      }
    };

    for (var i = 0; i < mainBarItemsDropdowns.length; i++) {
      _loop(i);
    }
  };

  hoverOutsideTheElement(mainBarItems);
  hoverOutsideTheElement(mainBarDropdownsItems);
  openHeaderBurgerMenu();
  closeHeaderBurgerMenu();
  openDropdowns();
  closeDropdowns();
};

exports.header = header;

},{}],4:[function(require,module,exports){
"use strict";

var _modal = require("./general/modal.js");

var _header = require("./header/header.js");

var _banner = require("./blocks/banner.js");

(0, _modal.modal)();
(0, _header.header)();
(0, _banner.banner)();

},{"./blocks/banner.js":1,"./general/modal.js":2,"./header/header.js":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYmxvY2tzL2Jhbm5lci5qcyIsInNyYy9qcy9nZW5lcmFsL21vZGFsLmpzIiwic3JjL2pzL2hlYWRlci9oZWFkZXIuanMiLCJzcmMvanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNBQSxJQUFNLE1BQU0sR0FBRyxTQUFULE1BQVMsR0FBTTtBQUVqQixNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQUosQ0FBVyxTQUFYLEVBQXNCO0FBQ2pDLElBQUEsY0FBYyxFQUFFLElBRGlCO0FBRWpDLElBQUEsV0FBVyxFQUFFO0FBQ1QsV0FBSztBQUNELFFBQUEsY0FBYyxFQUFFLEtBRGY7QUFHRCxRQUFBLFVBQVUsRUFBRTtBQUNSLFVBQUEsTUFBTSxFQUFFLHFCQURBO0FBRVIsVUFBQSxNQUFNLEVBQUU7QUFGQTtBQUhYO0FBREk7QUFGb0IsR0FBdEIsQ0FBZjtBQWNBLEVBQUEsTUFBTSxDQUFDLEVBQVAsQ0FBVSxhQUFWLEVBQXlCLFlBQVk7QUFBQTs7QUFDakMsUUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLGdCQUFULENBQTBCLDhCQUExQixDQUFuQjs7QUFFQSxRQUFHLENBQUMsWUFBSixFQUFpQjtBQUNiO0FBQ0g7O0FBRUQsSUFBQSxZQUFZLENBQUMsT0FBYixDQUFxQixVQUFBLFdBQVcsRUFBSTtBQUNoQyxVQUFHLEtBQUksS0FBSyxXQUFaLEVBQXdCO0FBQ3BCLFFBQUEsS0FBSSxDQUFDLEtBQUw7QUFDSDtBQUNKLEtBSkQ7QUFLSCxHQVpEO0FBYUgsQ0E3QkQ7Ozs7Ozs7Ozs7OztBQ0FBLElBQU0sS0FBSyxHQUFHLFNBQVIsS0FBUSxHQUFNO0FBRWhCLE1BQU0sU0FBUyxHQUFHLFNBQVosU0FBWSxHQUFNO0FBQ3BCLFFBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCLENBQWQ7QUFDQSxRQUFNLFFBQVEsR0FBRyxR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Q0FBOztBQUNBOztBQUNBOztBQUVBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGJhbm5lciA9ICgpID0+IHtcclxuXHJcbiAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKCcuc3dpcGVyJywge1xyXG4gICAgICAgIGFsbG93VG91Y2hNb3ZlOiB0cnVlLFxyXG4gICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgIDQ4MDoge1xyXG4gICAgICAgICAgICAgICAgYWxsb3dUb3VjaE1vdmU6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0RWw6ICcuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcclxuICAgICAgICAgICAgICAgICAgICBwcmV2RWw6ICcuc3dpcGVyLWJ1dHRvbi1wcmV2J1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgc3dpcGVyLm9uKCdzbGlkZUNoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgc3dpcGVyVmlkZW9zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN3aXBlci1zbGlkZSAuc3dpcGVyX192aWRlbycpO1xyXG5cclxuICAgICAgICBpZighc3dpcGVyVmlkZW9zKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3dpcGVyVmlkZW9zLmZvckVhY2goc3dpcGVyVmlkZW8gPT4ge1xyXG4gICAgICAgICAgICBpZih0aGlzID09PSBzd2lwZXJWaWRlbyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQge2Jhbm5lcn07XHJcbiIsImNvbnN0IG1vZGFsID0gKCkgPT4ge1xyXG5cclxuICAgIGNvbnN0IG9wZW5Nb2RhbCA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCcpO1xyXG4gICAgICAgIGNvbnN0IGJvZHlMb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvZHknKTtcclxuICAgICAgICBjb25zdCBpbnRlcnZhbCA9IDEwMDA7XHJcbiAgICAgICAgY29uc3QgbGFzdFRpbWVTaG93ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xhc3RUaW1lRGlzcGxheU1vZGFsJyk7XHJcbiAgICAgICAgY29uc3QgdGhyZWVIb3Vyc0FnbyA9IE51bWJlcihsYXN0VGltZVNob3cpICsgaW50ZXJ2YWw7XHJcbiAgICAgICAgY29uc3QgY2FuU2hvdyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjYW5TaG93Jyk7XHJcblxyXG4gICAgICAgIGlmICghbW9kYWwgfHwgIWJvZHlMb2NrKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjYW5TaG93ICE9PSAnZmFsc2UnKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWxhc3RUaW1lU2hvdyB8fCB0aHJlZUhvdXJzQWdvIDwgRGF0ZS5ub3coKSl7XHJcbiAgICAgICAgICAgICAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XHJcbiAgICAgICAgICAgICAgICBib2R5U2Nyb2xsTG9jay5lbmFibGVCb2R5U2Nyb2xsKGJvZHlMb2NrKTtcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsYXN0VGltZURpc3BsYXlNb2RhbCcsIERhdGUubm93KCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2FuU2hvdycsICd0cnVlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2xvc2VNb2RhbCA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9fY2xvc2UnKTtcclxuICAgICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2RhbCcpO1xyXG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9fc3VibWl0LWJ1dHRvbicpO1xyXG5cclxuICAgICAgICBpZiAoIWNsb3NlQnV0dG9uIHx8ICFtb2RhbCB8fCAhc3VibWl0QnV0dG9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2FuU2hvdycsICdmYWxzZScpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PntcclxuICAgICAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuXHJcbiAgICAgICAgICAgIGlmKHRhcmdldCA9PT0gbW9kYWwgJiYgIXRhcmdldC5jbG9zZXN0KCcubW9kYWxfX3dyYXBwZXInKSl7XHJcbiAgICAgICAgICAgICAgICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvcGVuTW9kYWwoKTtcclxuICAgIHNldEludGVydmFsKG9wZW5Nb2RhbCwgNTAwMCk7XHJcbiAgICBjbG9zZU1vZGFsKCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7bW9kYWx9O1xyXG4iLCJjb25zdCBoZWFkZXIgPSAoKSA9PiB7XHJcblxyXG4gICAgY29uc3QgYm9keUxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9keScpO1xyXG4gICAgY29uc3QgbWFpbkJhckl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhlYWRlcl9fbWFpbi1iYXItaXRlbScpO1xyXG4gICAgY29uc3QgbWFpbkJhckRyb3Bkb3duc0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhlYWRlcl9fbWFpbi1iYXItZHJvcGRvd24taXRlbScpO1xyXG4gICAgY29uc3QgbWFpbkJhckJ1cmdlck1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19tYWluLWJhci1idXJnZXItbWVudScpO1xyXG4gICAgY29uc3QgbWFpbkJhck5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX21haW4tYmFyLW5hdicpO1xyXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG4gICAgY29uc3QgbWFpbkJhckl0ZW1zRHJvcGRvd25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhlYWRlcl9fbWFpbi1iYXItaXRlbS1kcm9wZG93bicpO1xyXG4gICAgY29uc3QgbWFpbkJhckl0ZW1zQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5oZWFkZXJfX21haW4tYmFyLWl0ZW0tYnV0dG9uJyk7XHJcbiAgICBjb25zdCBhZGphY2VudEVsZW1lbnRzID0gZWxlbWVudCA9PiBbXS5zbGljZVxyXG4gICAgICAgIC5jYWxsKGVsZW1lbnQucGFyZW50Tm9kZS5jaGlsZHJlbilcclxuICAgICAgICAuZmlsdGVyKGNoaWxkID0+IChjaGlsZCAhPT0gZWxlbWVudCkpO1xyXG5cclxuICAgIGNvbnN0IGhvdmVyT3V0c2lkZVRoZUVsZW1lbnQgPSBlbGVtZW50ID0+IHtcclxuXHJcbiAgICAgICAgZWxlbWVudC5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhZGphY2VudEVsZW1lbnRzKGl0ZW0pLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3VuaG92ZXJlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWRqYWNlbnRFbGVtZW50cyhpdGVtKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCd1bmhvdmVyZWQnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb3BlbkhlYWRlckJ1cmdlck1lbnUgPSAoKSA9PiB7XHJcbiAgICAgICAgbWFpbkJhckJ1cmdlck1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIG1haW5CYXJCdXJnZXJNZW51LmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nKTtcclxuICAgICAgICAgICAgbWFpbkJhck5hdi5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJyk7XHJcbiAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdoZWFkZXItLW92ZXJsYXknKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYWluQmFyQnVyZ2VyTWVudS5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgYm9keVNjcm9sbExvY2suZGlzYWJsZUJvZHlTY3JvbGwoYm9keUxvY2spO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYm9keVNjcm9sbExvY2suZW5hYmxlQm9keVNjcm9sbChib2R5TG9jayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgY2xvc2VIZWFkZXJCdXJnZXJNZW51ID0gKCkgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG5cclxuICAgICAgICAgICAgbWFpbkJhckl0ZW1zRHJvcGRvd25zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRhcmdldC5jbG9zZXN0KCcuaGVhZGVyX19tYWluLWJhci1pdGVtLWJ1dHRvbicpICYmICF0YXJnZXQuY2xvc2VzdCgnLmhlYWRlcl9fbWFpbi1iYXItaXRlbS1kcm9wZG93bicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0YXJnZXQuY2xvc2VzdCgnLmhlYWRlcl9fbWFpbi1iYXItYnVyZ2VyLW1lbnUnKSAmJiAhdGFyZ2V0LmNsb3Nlc3QoJy5oZWFkZXJfX21haW4tYmFyLW5hdicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbkJhckJ1cmdlck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1haW5CYXJOYXYuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdoZWFkZXItLW92ZXJsYXknKTtcclxuICAgICAgICAgICAgICAgICAgICBib2R5U2Nyb2xsTG9jay5lbmFibGVCb2R5U2Nyb2xsKGJvZHlMb2NrKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG9wZW5Ecm9wZG93bnMgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIG1haW5CYXJJdGVtc0Ryb3Bkb3ducy5mb3JFYWNoKCBpdGVtID0+IHtcclxuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgY2xvc2VEcm9wZG93bnMgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFpbkJhckl0ZW1zRHJvcGRvd25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChtYWluQmFySXRlbXNEcm9wZG93bnNbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuJykpIHtcclxuICAgICAgICAgICAgICAgIG1haW5CYXJJdGVtc0J1dHRvbnNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbkJhckl0ZW1zQnV0dG9uc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaG92ZXJPdXRzaWRlVGhlRWxlbWVudChtYWluQmFySXRlbXMpO1xyXG4gICAgaG92ZXJPdXRzaWRlVGhlRWxlbWVudChtYWluQmFyRHJvcGRvd25zSXRlbXMpO1xyXG4gICAgb3BlbkhlYWRlckJ1cmdlck1lbnUoKTtcclxuICAgIGNsb3NlSGVhZGVyQnVyZ2VyTWVudSgpO1xyXG4gICAgb3BlbkRyb3Bkb3ducygpO1xyXG4gICAgY2xvc2VEcm9wZG93bnMoKTtcclxufVxyXG5cclxuZXhwb3J0IHtoZWFkZXJ9O1xyXG4iLCJpbXBvcnR7bW9kYWx9IGZyb20gXCIuL2dlbmVyYWwvbW9kYWwuanNcIjtcclxuaW1wb3J0e2hlYWRlcn0gZnJvbSBcIi4vaGVhZGVyL2hlYWRlci5qc1wiO1xyXG5pbXBvcnR7YmFubmVyfSBmcm9tIFwiLi9ibG9ja3MvYmFubmVyLmpzXCI7XHJcblxyXG5tb2RhbCgpO1xyXG5oZWFkZXIoKTtcclxuYmFubmVyKCk7XHJcbiJdfQ==
