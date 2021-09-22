const modal = () => {

    const openModal = () => {
        const modal = document.querySelector('.modal');
        const bodyLock = document.querySelector('.body');
        const interval = 1000;
        const lastTimeShow = localStorage.getItem('lastTimeDisplayModal');
        const threeHoursAgo = Number(lastTimeShow) + interval;
        const canShow = localStorage.getItem('canShow');

        if (!modal || !bodyLock) {
            return;
        }

        if (canShow !== 'false') {

            if (!lastTimeShow || threeHoursAgo < Date.now()){
                modal.classList.add('show');
                bodyScrollLock.enableBodyScroll(bodyLock);
                localStorage.setItem('lastTimeDisplayModal', Date.now().toString());
                localStorage.setItem('canShow', 'true');
            }
        }
    }

    const closeModal = () => {
        const closeButton = document.querySelector('.modal__close');
        const modal = document.querySelector('#modal');
        const submitButton = document.querySelector('.modal__submit-button');

        if (!closeButton || !modal || !submitButton) {
            return;
        }

        closeButton.addEventListener('click', () => {
            modal.classList.remove('show');
        });

        submitButton.addEventListener('click', () => {
            modal.classList.remove('show');
            localStorage.setItem('canShow', 'false');
        });

        window.addEventListener('click', event =>{
            let target = event.target;

            if(target === modal && !target.closest('.modal__wrapper')){
                modal.classList.remove('show');
            }
        });
    }

    openModal();
    setInterval(openModal, 5000);
    closeModal();
}

export {modal};
