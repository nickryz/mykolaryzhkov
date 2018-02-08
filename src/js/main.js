
// import "babel-polyfill";
window.addEventListener('DOMContentLoaded', init);

// import $ from 'jquery';
import mixitup from 'mixitup';

function init () {
    


    // PORTFOLIO

    (function () {
        "use strict"

        var mixer = mixitup(".portfolio__list", {
            selectors: {
                target: '.portfolio__item'
            },
            animation: {
                "duration": 700,
                "nudge": true,
                "effects": "fade translateY(-50%) translateX(50%)"
            }
        });
    }());

    
    // SCROLL

    (function () {
        "use strict"
        
        var linkNav = document.querySelector('.nav__list').querySelectorAll('[href^="#"]');
        var linkNavMobile = document.querySelector('.nav-mobile__list').querySelectorAll('[href^="#"]');
        var btn = document.querySelector('.button');

        btn.addEventListener('click', scrollToSection);
        
        linkNav.forEach(element => {
            element.addEventListener('click', scrollToSection);
        });

        linkNavMobile.forEach(element => {
            element.addEventListener('click', scrollToSection);
        });


        function scrollToSection(e) { //по клику на ссылку
            e.preventDefault(); //отменяем стандартное поведение
            var w = window.pageYOffset,  // производим прокрутка прокрутка
                hash = this.getAttribute('href'),  // к id элемента, к которому нужно перейти
                t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
                start = null,
                path = Math.abs(t / 1000);
            requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
            function step(time) {
                if (start === null) start = time;
                var progress = time - start,
                    r = (t < 0 ? Math.max(w - progress * path, w + t) : Math.min(w + progress * path, w + t));
                window.scrollTo(0, r);

                if (r != w + t) {
                    requestAnimationFrame(step)
                }
            }
        }

    }());




    // NAV HIDE

    (function () {
        "use strict"
        
        var nav = document.querySelector('.nav'),
            lazyClass = 'nav--lazy',
            hideClass = 'nav--hideTop',
            showClass = 'nav--showTop';

        
        window.addEventListener('scroll', function (e) {
          
            if(window.pageYOffset >= window.innerHeight && !nav.classList.contains(lazyClass)) {
                nav.classList.add(lazyClass);
                nav.style.top = -nav.offsetHeight + 'px';
                setTimeout(function () {
                    nav.classList.add(showClass);
                }, 20);
                
            } else if (window.pageYOffset < window.innerHeight && nav.classList.contains(lazyClass)) {
                nav.classList.remove(showClass);
                nav.classList.add(hideClass);
                
                function handler() {
                    nav.classList.remove(lazyClass);
                    nav.classList.remove(hideClass);
                    nav.style.top = '0px';
                    nav.removeEventListener('transitionend', handler);
                }

                nav.addEventListener('transitionend', handler); 
            }
        })
    }());


    // SHOW / HIDE MODAL

    (function () {
        "use strict"

        var contact = {
            btn: document.querySelector('[href="#contact-modal"]'),  
            modal: document.getElementById('contact-modal')
        }

        contact.btn.addEventListener('click', function (e) {
            e.preventDefault();
            showModal(contact);
        });  
        
        contact.modal.addEventListener('click', function (e) {
            e.preventDefault();
            var target = (e.target == e.currentTarget || e.target.classList.contains('cross')) ? e.target : false;
            if(target) {
                hideModal(contact, target);
            }
        });  

        function showModal(obj) {
        
            obj.modal.style.display = 'block';
            document.onmousewheel = document.onwheel = function () {
                return false;
            };
            
            raf(function () {
                obj.modal.classList.add('show');
                obj.modal.children[0].classList.add('contact-form__wrap--show');
            });


            function raf(fn) {
                requestAnimationFrame(function () {
                    requestAnimationFrame(function () {
                        fn();
                    })
                })
            }
        }
            
        function hideModal(obj, target) {
            obj.modal.classList.remove('show');
            obj.modal.children[0].classList.remove('contact-form__wrap--show')
            document.onmousewheel = document.onwheel = function () {
                return true;
            };

            function handler() {
                obj.modal.style.display = 'none';
                obj.modal.removeEventListener('transitionend', handler);
            }

            obj.modal.addEventListener('transitionend', handler);
        } 
    }());
    

// PARALLAX

    (function () {
        "use strict"
        
        var lay1 = document.querySelector('.lay__wrap--1'),
            lay2 = document.querySelector('.lay__wrap--2'),
            cxMoove = 0.05,
            currentX,
            currentY;
        
        
        var mouseHandler = window.addEventListener('mousemove', function (e) {
            if (e.pageY < window.innerHeight) {
                lay1.style.transform = 'translate(' + e.clientX * cxMoove + 'px' + ',' + e.clientY * cxMoove + 'px' + ')';
                lay2.style.transform = 'translate(' + -e.clientX * cxMoove + 'px' + ',' + -e.clientY * cxMoove + 'px' + ')';
            }



        })

    }());



    // BURGER

    (function () {
        "use strict"

        var burgerIco = document.querySelector('.burger__icon'),
            mobileMenu = document.querySelector('.nav-mobile'),
            overlay = document.querySelector('.nav-mobile__overlay');

        burgerIco.addEventListener('click', function () {
            
            if (!burgerIco.classList.contains('burger__icon--active') && !mobileMenu.classList.contains('nav-mobile--show')) {
                showMenu(); 
            } else {
                hideMenu();
            }
        });

        overlay.addEventListener('click', function () {

            if (burgerIco.classList.contains('burger__icon--active') && mobileMenu.classList.contains('nav-mobile--show')) {
                hideMenu();
            } 
        });

        mobileMenu.addEventListener('click', function (e) {
            console.log(e.target)
            if (burgerIco.classList.contains('burger__icon--active') && mobileMenu.classList.contains('nav-mobile--show') && e.target.nodeName === 'A' || e.target.closest('a')) {
                hideMenu();
            }
        });

        function showMenu() {
            burgerIco.classList.add('burger__icon--active');
            mobileMenu.classList.add('nav-mobile--show');
            overlay.style.display = 'block';

            raf(function () {
                overlay.classList.add('show');
            });


            function raf(fn) {
                requestAnimationFrame(function () {
                    requestAnimationFrame(function () {
                        fn();
                    })
                })
            }
        }

        function hideMenu() {
            burgerIco.classList.remove('burger__icon--active');
            mobileMenu.classList.remove('nav-mobile--show');
            overlay.classList.remove('show');

            function handler() {
                overlay.style.display = null;
                overlay.removeEventListener('transitionend', handler)
            }

            overlay.addEventListener('transitionend', handler)
        }
            
    }());


    

}








