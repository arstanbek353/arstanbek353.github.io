document.addEventListener("DOMContentLoaded", function () {
    // mediaQuery
    const mediaQuery = window.matchMedia("(max-width: 48em)").matches;

    // main-slider
    var mainSlider = new Swiper('.main-slider__container', {
        init: false,
        slidesPerView: 1,
        loop: true,
        effect: 'fade',
        freeMode: true,
        loopedSlides: 4,
        // autoplay: {
        //   delay: 5000,
        // },
        pagination: {
            el: '.main-slider__container .slider-frac__current',
            type: 'bullets',
            bulletClass: 'slider-frac__item',
            bulletActiveClass: 'active',
            clickable: true,
            renderBullet: function (index, className) {
                index = index + 1;
                if (index < 10) {
                    return '<span class="' + className + '">0' + (index) + '</span>';
                }
                return '<span class="' + className + '">' + (index) + '</span>';
            },
        },
        navigation: {
            nextEl: '.main-slider__btn--next',
            prevEl: '.main-slider__btn--prev',
            disabledClass: 'disabled',
        },
    });

    let previewSlideImg;
    function changePreviewSlide() {
        let prev = document.querySelector('.main-slider__container .swiper-slide-next');
        let prevImgPath = prev.querySelector('.main-slider__img img').getAttribute("src");

        previewSlideImg.classList.add('fadeOut')

        function previewfadeOut() {
            previewSlideImg.setAttribute("src", prevImgPath);
            previewSlideImg.classList.remove('fadeOut')
        }

        setTimeout(previewfadeOut, 400);

    }

    mainSlider.on('init', function () {
        changePreviewSlide()

        let totalPag = document.querySelector('.main-slider__container .slider-frac__total')
        if (totalPag && mainSlider.slides.length - 6 < 10) {
            totalPag.textContent = '0' + (mainSlider.slides.length - 6)
        } else if (totalPag) {
            totalPag.textContent = mainSlider.slides.length - 6
        }
    });
    mainSlider.on('slideChangeTransitionStart', function () {
        changePreviewSlide()
    });
    if (document.querySelector('.main-slider__container')) {
        previewSlideImg = document.querySelector('.preview-slide__img img');
        mainSlider.init();
    }

    // deck-mob
    var slidesPerViewSliderAuto = 'auto';
    var directionSliderVer = 'vertical';
    if (mediaQuery) {
        slidesPerViewSliderAuto = 1
        directionSliderVer = 'horizontal'
    }
    // faq-slider
    var sliderFaq = new Swiper('.faq-slider__container', {
        slidesPerView: slidesPerViewSliderAuto,
        direction: directionSliderVer,
        loop: true,
        pagination: {
            el: '.faq-slider .sl-pag__bullets, .faq-slider .sl-pag__progressbar',
            bulletClass: 'bullet',
            bulletActiveClass: 'active',
            renderBullet: function (index, className) {
                index = index + 1;
                if (index < 10) {
                    return '<span class="' + className + '">0' + (index) + '</span>';
                }
                return '<span class="' + className + '">' + (index) + '</span>';
            },
        },
        navigation: {
            nextEl: '.faq-slider .sl-nav__next',
            prevEl: '.faq-slider .sl-nav__prev',
            disabledClass: 'disabled',
        },
    });

    totalSlides('.faq-slider__container .sl-pag__total', sliderFaq, 0)

    // card-slider
    var cardSlider = new Swiper('.card-banner__container', {
        init: false,
        loop: true,
        slidesPerView: slidesPerViewSliderAuto,
        direction: directionSliderVer,
        watchSlidesVisibility: true,
        pagination: {
            el: '.card-banner .card-pag',
            bulletClass: 'card-pag__bullet',
            bulletActiveClass: 'active',
        },
        navigation: {
            nextEl: '.card-banner__btn--next',
            prevEl: '.card-banner__btn--prev',
            disabledClass: 'disabled',
        },
    });

    function setImgPath(path) {
        let currentImgPath;
        if (path) {
            currentImgPath = path;
        } else {
            currentImgPath = document.querySelector('.card-banner__container .swiper-slide-active img').getAttribute("src");
        }
        let cardLg = document.querySelector('.card-banner__img-lg');
        let cardLgImg = document.querySelector('.card-banner__img-lg img');

        cardLg.setAttribute("href", currentImgPath);

        cardLg.classList.add('fadeOut')

        function previewfadeOut() {
            cardLgImg.setAttribute("src", currentImgPath);
            cardLg.classList.remove('fadeOut')
        }

        setTimeout(previewfadeOut, 400);

    }

    cardSlider.on('init', function () {
        setImgPath()
    });
    cardSlider.on('slideChangeTransitionStart', function () {
        setImgPath()
    });
    cardSlider.on('click', function (e) {
        setImgPath(e.path[0].attributes.src.nodeValue)
    });
    if (document.querySelector('.card-banner__container')) {
        cardSlider.init();
    }

    // partner-slider
    var sliderPartner = new Swiper('.partners__container', {
        slidesPerView: 'auto',
        loop: true,
        loopedSlides: 4,
        pagination: {
            el: '.partners .sl-pag__bullets, .partners .sl-pag__progressbar',
            bulletClass: 'bullet',
            bulletActiveClass: 'active',
            renderBullet: function (index, className) {
                index = index + 1;
                if (index < 10) {
                    return '<span class="' + className + '">0' + (index) + '</span>';
                }
                return '<span class="' + className + '">' + (index) + '</span>';
            },
        },
        navigation: {
            nextEl: '.partners .sl-nav__next',
            prevEl: '.partners .sl-nav__prev',
            disabledClass: 'disabled',
        },
    });

    totalSlides('.partners__container .sl-pag__total', sliderPartner, 8)
    // totalSlides

    function totalSlides(el, slide, loopedSlides) {
        let totalPag = document.querySelector(el)
        if (totalPag && slide.slides.length - loopedSlides < 10) {
            console.log(slide.slides.length)
            totalPag.textContent = ' / 0' + (slide.slides.length - loopedSlides)
        } else if (totalPag) {
            console.log(slide.slides.length)
            totalPag.textContent = ' / ' + (slide.slides.length - loopedSlides)
        }
    }

    // filter
    function filter() {
        let filter = document.querySelector('.filter')
        let filterTitle = document.querySelectorAll('.filter__title')
        let filterList = document.querySelector('.filter__list')
        let filterResetBtn = document.querySelectorAll('.filter__reset')
        let filterShowBtn = document.querySelector('.filter__show')
        let filterOpen = document.querySelector('.catalog__open-filter')
        let filterClose = document.querySelector('.filter__x')
        filterOpen.addEventListener('click', function () {
            filter.classList.add('active')
            toggleScroll('body', false)
        })
        filterClose.addEventListener('click', function (e) {
            e.preventDefault()
            filter.classList.remove('active')
            toggleScroll('body', false)
        })
        filterTitle.forEach(element => {
            element.addEventListener('click', function () {
                this.classList.toggle('active')
                $(this.nextElementSibling).slideToggle();
            })
        });
        filterShowBtn.addEventListener('click', function (e) {
            e.preventDefault()
            filter.classList.remove('active')
            toggleScroll('body', false)
        })
        filterResetBtn.forEach(element => {
            element.addEventListener('click', function (e) {
                e.preventDefault()
                resetForm(filter)
            })
        });
    }
    // nav
    let header = document.querySelector('.header')
    let nav = document.querySelector('.nav')
    let navInner = document.querySelector('.nav__inner')
    let burger = document.querySelector('.burger')
    burger.addEventListener('click', function () {
        nav.classList.toggle('active')
        header.classList.toggle('active')

        searchHeader.classList.remove('open')
        searchIcon.classList.remove('open')
        searchIcon.classList.remove('close')
        searchIcon.classList.remove('x')
        toggleScroll('body', false)
    })

    if (document.querySelector('.filter')) {
        filter()
    }

    // выпадающий список в меню
    let htmlDoc = document.querySelector('html');
    let navLi = document.querySelectorAll('.nav__item');
    let drops = document.querySelectorAll('.nav-drop');
    let contentDrops = document.querySelectorAll('.nav-drop__content');
    let navProHeadTitle = document.querySelectorAll('.nav-pro__head .nav-pro__title');
    let navProTitle = document.querySelectorAll('.nav-pro__inner .nav-pro__title');
    let navProItem = document.querySelectorAll('.nav-pro__item');
    if (window.matchMedia("(max-width: 48em)").matches) {
        navLi.forEach(element => {
            let drop = element.querySelector('.nav-drop');
            let prev = element.querySelector('.nav__prev');
            let next = element.querySelector('.nav__next');
            if (drop && next && prev) {
                next.addEventListener('click', function () {
                    //drop.classList.add('active')
                    next.classList.add('remove')
                    prev.classList.add('active')
                    $(drop).slideDown();
                    navLi.forEach(item => {
                        if (this.closest('.nav__item') === item) {
                            $(element).slideDown();
                        } else {
                            $(item).slideUp();
                        }
                    })
                });
                prev.addEventListener('click', function () {
                    //drop.classList.add('active')
                    next.classList.remove('remove')
                    prev.classList.remove('active')
                    $(drop).slideUp();
                    navLi.forEach(item => {
                        $(item).slideDown();
                    })
                });
            }
        });

        // navProItem.forEach(element => {
        //     let drop = element.querySelector('.nav-pro__drop');
        //     let dropOpen = element.querySelector('.nav__next');
        //     dropOpen.addEventListener('click', function () {
        //         $(drop).slideToggle();
        //     });
        // });

        let lastScrollTop = 0;
        window.addEventListener('scroll', function () {
            let currentScrollTop = htmlDoc.scrollTop
            if (currentScrollTop == 0) {
                header.classList.remove('fixed')
                header.classList.remove('animate')
            } else if (currentScrollTop < lastScrollTop) {
                header.classList.add('fixed')
                header.classList.remove('animate')
            } else {
                header.classList.add('animate')
                header.classList.remove('fixed')
            }
            lastScrollTop = htmlDoc.scrollTop
        })
    } else {
        navLi.forEach(element => {
            if (element.querySelector('.nav-drop')) {
                let drop = element.querySelector('.nav-drop');
                let navLink = element.querySelector('.nav__title');
                navLink.addEventListener('mouseenter', function () {
                    $(drop).slideDown();
                });
                element.addEventListener('mouseleave', function () {
                    $(drop).slideUp();
                });
            }
        });

        navProHeadTitle.forEach((element, index) => {
            let drop = element.querySelector('.nav-drop');
            element.addEventListener('mouseenter', function () {
                navProHeadTitle.forEach(item => {
                    item.classList.remove('active')
                })
                element.classList.add('active')
                navProItem.forEach(item => {
                    $(item).slideUp();
                })
                $(navProItem[index]).slideDown();
            });
            // element.addEventListener('mouseleave', function () {
            //     element.classList.remove('active')
            // });
        });
    }
    // header-search
    let searchIcon = document.querySelector('.search-icon');
    let searchHeader = document.querySelector('.header-search');
    let searchClose = document.querySelector('.header-search__x');

    searchIcon.addEventListener('click', function (e) {
        e.preventDefault()
        searchHeader.classList.toggle('open')
        nav.classList.add('opacity')
        searchIcon.classList.remove('open')
        searchIcon.classList.add('close')
        searchIcon.classList.toggle('x')
        nav.classList.remove('active')
        header.classList.remove('active')
    })
    searchClose.addEventListener('click', function (e) {
        e.preventDefault()
        searchHeader.classList.remove('open')
        nav.classList.remove('opacity')
        searchIcon.classList.add('open')
        searchIcon.classList.remove('close')
    })
    if (mediaQuery) {
        searchIcon.addEventListener('click', function (e) {
            e.preventDefault()
            toggleScroll('body', false)
        })
    }

    // no scroll body
    function toggleScroll(el, bullet) {
        let element = document.querySelector(el)
        if (bullet) {
            element.style.overflow = 'hidden'
            return;
        }
        if (element.style.overflow == 'hidden') {
            element.style.overflow = 'visible'
        } else {
            element.style.overflow = 'hidden'
        }
    }

    // навигация на странице региональных департаментов
    function navScroll(sect, nav, blocks, heights = '.header') {
        let section = document.querySelector(sect);
        let anchorNav = document.querySelector(nav);
        let anchorLinks = anchorNav.querySelectorAll('a');
        let anchorBlocks = document.querySelectorAll(blocks);

        let heightSum = 0;

        // document.querySelectorAll(heights).forEach(element => {
        //     heightSum += element.offsetHeight;
        // });

        anchorLinks.forEach(element => {
            element.addEventListener('click', function (e) {
                e.preventDefault()
                let href = this.getAttribute('href')
                let block = document.getElementById(href)
                let sizeScroll = block.getBoundingClientRect().top + pageYOffset - heightSum - anchorNav.offsetHeight - 50
                window.scrollTo({
                    top: sizeScroll,
                    behavior: "smooth",
                })
            })
        });

        window.addEventListener('scroll', function () {

            function getCoords(elem) {
                let box = elem.getBoundingClientRect();

                return {
                    top: box.top + pageYOffset,
                    left: box.left + pageXOffset,
                    y: box.y,
                    x: box.x,
                    height: box.height,
                    width: box.width,
                };
            }
            anchorBlocks.forEach(element => {
                let coord = getCoords(element);
                if (-coord.height < coord.y && coord.y < heightSum + 300) {
                    let hrefAnchor = document.querySelector(`[href="${element.getAttribute('id')}"]`)
                    element.classList.add('onView');
                    anchorLinks.forEach(element => {
                        element.classList.remove('active');
                    })
                    hrefAnchor.classList.add('active')
                } else {
                    element.classList.remove('onView')
                }
            })
            let anchorNavCoord = getCoords(anchorNav);
            if (anchorNavCoord.y < heightSum && -anchorNavCoord.y < section.offsetHeight - heightSum) {
                anchorNav.classList.add('active')
                console.log(anchorNavCoord.y)
                anchorNav.querySelector('.card-content__nav').style.top = heightSum + 'px'
            } else {
                anchorNav.classList.remove('active')
            }
        })
    }

    if (document.querySelector('.card-content')) {
        navScroll('.card-content', '.card-content__nav-wrapper', '.card-content__block', '.header')
    }
    // прокрутка до элемента
    function toScroll(link) {
        let links = document.querySelectorAll(link)

        links.forEach(element => {
            element.addEventListener('click', function (e) {
                e.preventDefault()
                let href = this.getAttribute('href')
                let block = document.getElementById(href)
                let sizeScroll = block.getBoundingClientRect().top + pageYOffset - 50
                window.scrollTo({
                    top: sizeScroll,
                    behavior: "smooth",
                })
            })
        });
    }

    // скрыть/показать список
    function toggleList(items, button, numArr) {
        let num;
        let childs = document.querySelectorAll(items)
        let btn = document.querySelector(button)
        if (mediaQuery) { num = numArr[1] } else { num = numArr[0] }

        if (childs.length > num) {
            loopItems(childs, num)

            btn.addEventListener('click', function (e) {
                e.preventDefault()
                this.style.display = 'none'
                loopItems(childs, num)
            })
        } else {
            btn.style.display = 'none'
        }
        function loopItems(elements, num) {
            for (let i = num; i < elements.length; i++) {
                elements[i].classList.toggle('hide')
            }
        }
    }

    if (document.querySelector('.card-characteristic__item')) {
        toggleList(
            '.card-content .card-characteristic__item',
            '.card-content .card-characteristic__bottom .show-all',
            [20, 2]
        )
    }
    console.log(document.querySelector('.faq-slider__text').textContent.length)
    // обрезать текст по длине
    let catalogTexts = document.querySelectorAll('.catalog__text')

    catalogTexts.forEach(element => {
        element.textContent = kitcut(element.textContent, 105)
    })
    let newsTexts = document.querySelectorAll('.news__text')

    newsTexts.forEach(element => {
        element.textContent = kitcut(element.textContent, 169)
    })

    let solutionsTexts = document.querySelectorAll('.solutions__text')

    solutionsTexts.forEach(element => {
        element.textContent = kitcut(element.textContent, 210)
    })

    let faqSliderTexts = document.querySelectorAll('.faq-slider__text')

    faqSliderTexts.forEach(element => {
        element.textContent = kitcut(element.textContent, 242)
    })
    function kitcut(text, limit) {
        text = text.trim();
        if (text.length <= limit) return text;

        text = text.slice(0, limit);

        return text.trim() + "...";
    }
})

function resetForm(form) {
    let input = form.querySelectorAll('input[type="text"], textarea');
    let checkbox = form.querySelectorAll('input[type="checkbox"]');
    let radio = form.querySelectorAll('input[type="radio"]');
    let select = form.querySelectorAll('select');

    input.forEach(element => {
        element.classList.remove('hide')
        element.value = ''
        element.removeAttribute('value')
    })
    checkbox.forEach(element => {
        if (element.hasAttribute('checked')) {
            element.checked = true;
        } else {
            element.checked = false;
        }
    })
    radio.forEach(element => {
        if (element.hasAttribute('checked')) {
            element.checked = true;
        } else {
            element.checked = false;
        }
    })

    select.forEach(element => {
        element.selectedIndex = 0
    })
}