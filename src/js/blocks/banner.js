const banner = () => {

    const swiper = new Swiper('.swiper', {
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
        let swiperVideos = document.querySelectorAll('.swiper-slide .swiper__video');

        if(!swiperVideos){
            return;
        }

        swiperVideos.forEach(swiperVideo => {
            if(this === swiperVideo){
                this.pause();
            }
        });
    });
}

export {banner};
