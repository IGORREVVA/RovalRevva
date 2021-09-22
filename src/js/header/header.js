const header = () => {

    const bodyLock = document.querySelector('.body');
    const mainBarItems = document.querySelectorAll('.header__main-bar-item');
    const mainBarDropdownsItems = document.querySelectorAll('.header__main-bar-dropdown-item');
    const mainBarBurgerMenu = document.querySelector('.header__main-bar-burger-menu');
    const mainBarNav = document.querySelector('.header__main-bar-nav');
    const header = document.querySelector('.header');
    const mainBarItemsDropdowns = document.querySelectorAll('.header__main-bar-item-dropdown');
    const mainBarItemsButtons = document.querySelectorAll('.header__main-bar-item-button');
    const adjacentElements = element => [].slice
        .call(element.parentNode.children)
        .filter(child => (child !== element));

    const hoverOutsideTheElement = element => {

        element.forEach(item => {
            item.addEventListener('mouseenter', () => {
                adjacentElements(item).forEach(el => {
                    el.classList.add('unhovered');
                });
            });

            item.addEventListener('mouseleave', () => {
                adjacentElements(item).forEach(el => {
                    el.classList.remove('unhovered');
                });
            });
        });
    };

    const openHeaderBurgerMenu = () => {
        mainBarBurgerMenu.addEventListener('click', () => {
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

    const closeHeaderBurgerMenu = () => {
        window.addEventListener('click', event => {
            const target = event.target;

            mainBarItemsDropdowns.forEach(item => {
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

    const openDropdowns = () => {

        mainBarItemsDropdowns.forEach( item => {
            item.addEventListener('click', () => {
                item.classList.toggle('open');
            });
        });
    };

    const closeDropdowns = () => {

        for (let i = 0; i < mainBarItemsDropdowns.length; i++) {
            if (mainBarItemsDropdowns[i].classList.contains('open')) {
                mainBarItemsButtons[i].addEventListener('click', () => {
                    mainBarItemsButtons[i].classList.remove('open');
                });
            }
        }
    };

    hoverOutsideTheElement(mainBarItems);
    hoverOutsideTheElement(mainBarDropdownsItems);
    openHeaderBurgerMenu();
    closeHeaderBurgerMenu();
    openDropdowns();
    closeDropdowns();
}

export {header};
