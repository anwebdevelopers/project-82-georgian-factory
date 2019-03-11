'use strict';

document.querySelector( 'html' ).classList.remove( 'no-js');

document.addEventListener( 'DOMContentLoaded', function( event ) {

    //*********************************************************//
    //MENU
    //*********************************************************//
    // ( function() {
    //
    //     let windowWidth = window.innerWidth;
    //
    //     const elemNav = document.querySelector('.nav'),
    //         buttonNav = document.querySelector('.header__nav-button');
    //
    //     buttonNav.addEventListener( 'click', function( e ) {
    //         e.stopPropagation();
    //         if ( buttonNav.classList.contains( 'active' ) ) {
    //             buttonNav.classList.remove('active');
    //             elemNav.classList.remove('active');
    //         } else {
    //             buttonNav.classList.add( 'active' );
    //             elemNav.classList.add('active');
    //         }
    //     } );
    //
    //     window.addEventListener( 'resize', function() {
    //
    //         const newWindowWidth = window.innerWidth;
    //
    //         if ( windowWidth !== newWindowWidth ) {
    //
    //             windowWidth = newWindowWidth;
    //
    //             buttonNav.classList.remove('active');
    //             // elemNav.style.display = '';
    //             elemNav.classList.remove('active');
    //         }
    //     } );
    //
    //     const navMenuElems = document.querySelectorAll( '.nav__menu a' );
    //
    //     for ( let i = 0; i < navMenuElems.length; i++ ) {
    //         navMenuElems[ i ].addEventListener( 'click', function( event ) {
    //             buttonNav.classList.remove('active');
    //             elemNav.classList.remove('active');
    //         } );
    //     }
    //
    // } ( jQuery ) );


    ( function( $ ) {

        $( '[ data-tabs-buttons ]' ).each( function() {

            const buttonsChildren = $( this ).children( '[ data-tabs-button ]' );
            const activeButton = $.grep( buttonsChildren, function( item ) { return item.hasAttribute( 'active' ) } );

            if ( activeButton.length ) {
                buttonsChildren.first().attr( 'active', '' );
            }

            $( '[ data-tabs-section="' + $( activeButton[ 0 ] ).attr( 'data-tabs-button' ) + '" ]' ).attr( 'active', '' ).siblings().removeAttr( 'active' );

            $( this ).on( 'click', '[ data-tabs-button ]', function() {

                $( this ).attr( 'active', '' ).siblings().removeAttr( 'active' );

                const tabsSection = $( '[ data-tabs-section="' + $( this ).attr( 'data-tabs-button' ) + '" ]' );

                if ( tabsSection ) {
                    tabsSection.attr( 'active', '' ).siblings().removeAttr( 'active' );
                }

            } );
        } );

    } ( jQuery ) );

    ( function( $ ) {

        $( '.header__menu-category-item' ).on( 'click', '[ data-tabs-button ]', function() {
            $( '.header__category, .header__button-menu' ).attr( 'active', '' );


            if ( window.innerWidth <= 640 ) {
                $( '.header__nav' ).removeAttr( 'active' );
            }
        } );

    } ( jQuery ) );

    ( function( $ ) {

        $( '.header__button-menu' ).on( 'click', function() {

            if ( this.hasAttribute( 'active' ) ) {

                $( this ).removeAttr( 'active' );

                $( '.header__category, .header__menu-category-item [ data-tabs-button ], .header__category-item, .header__menu' ).removeAttr( 'active' );

                if ( window.innerWidth <= 640 ) {
                    $( '.header__nav, .header__button-menu-category' ).removeAttr( 'active' );
                }
            } else {

                $( this ).attr( 'active', '' );
                $( '.header__menu' ).attr( 'active', '' );
            }

        } );

    } ( jQuery ) );

    ( function( $ ) {

        $( '.header__switch-menu-category' ).on( 'click', '[ data-tabs-button ]', function() {

            const buttonsChildren = $( '[ data-tabs-section="' + $( this ).attr( 'data-tabs-button' ) + '" ]' ).children( '[ data-tabs-button ]' );

            const activeButton = $.grep( buttonsChildren, function( item ) { return item.hasAttribute( 'active' ) } );

            if ( activeButton.length ) {

                $( '[ data-tabs-section="' + $( activeButton[ 0 ] ).attr( 'data-tabs-button' ) + '" ]' ).attr( 'active', '' ).siblings().removeAttr( 'active' );
            }
            // else {
            //     $( '.header__category' ).removeAttr( 'active' );
            // }
        } );

    } ( jQuery ) );

    //*********************************************************//
    //DROPDOWN
    //*********************************************************//
    ( function( $ ) {

        $( '.dropdown' ).on( 'mouseenter', function(e) {
            if ( $( window ).width() > 992 ) {
                $( this ).closest( '.dropdown' ).attr( 'active', '' ).siblings().removeAttr( 'active' );
            }

        } ).on( 'mouseleave', function() {
            $( this ).closest( '.dropdown' ).removeAttr( 'active' );
        } ).on( 'click', '.dropdown__title', function() {
            if ( $( window ).width() <= 992 && $( this ).closest( '.dropdown' )[0].hasAttribute( 'active' ) ) {
                $( this ).closest( '.dropdown' ).removeAttr( 'active' );
            } else {
                $( this ).closest( '.dropdown' ).attr( 'active', '' );
            }
        } );

    } ( jQuery ) );


    //*********************************************************//
    //SWIPE MOBILE CATEGORIES MENU
    //*********************************************************//
    ( function() {
        if ( document.querySelector( '.header__nav' ).querySelector( '.header__button-menu-category') ) {
            const headerNav = document.querySelector( '.header__nav' ),
                headerButtonMenuCategory = document.querySelector( '.header__button-menu-category' );

            let xDown = null;
            let yDown = null;

            function handleTouchStart( event ) {
                if ( window.innerWidth > 640 ) { return; }
                xDown = event.touches[ 0 ].clientX;
                yDown = event.touches[ 0 ].clientY;
            };

            function handleTouchMove( event ) {
                if ( ! xDown || ! yDown ) {
                    return;
                }

                const xUp = event.touches[ 0 ].clientX;
                const yUp = event.touches[ 0 ].clientY;

                const xDiff = xDown - xUp;
                const yDiff = yDown - yUp;

                if ( Math.abs( xDiff ) + Math.abs( yDiff ) > 30 ) { //to deal with to short swipes

                    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                        if ( xDiff > 0 ) {/* left swipe */
                             headerNav.removeAttribute( 'active' );
                             headerButtonMenuCategory.removeAttribute( 'active' );
                        } else {/* right swipe */
                            // alert( 'right!' );
                             headerNav.setAttribute( 'active', '' );
                             headerButtonMenuCategory.setAttribute( 'active', '' );
                        }
                    } else {
                        if ( yDiff > 0 ) {/* up swipe */
                            // alert( 'Up!' );
                        } else { /* down swipe */
                            // alert( 'Down!' );
                        }
                    }
                    /* reset values */
                    xDown = null;
                    yDown = null;
                }
            };

            headerNav.addEventListener( 'touchstart' , handleTouchStart, false );
            headerNav.addEventListener( 'touchmove' , handleTouchMove, false );
        }

    } () );

    //*********************************************************//
    //CLICK MOBILE CATEGORIES MENU
    //*********************************************************//
    ( function( $ ) {
        if ( document.querySelector( '.header__button-menu-category') ) {
             document.querySelector( '.header__button-menu-category' ).addEventListener( 'click', function( event ) {

                 const headerNav = document.querySelector( '.header__nav' );

                 if (  event.target.hasAttribute( 'active' ) ) {

                     event.target.removeAttribute( 'active' );
                     headerNav.removeAttribute( 'active' );
                 } else {

                     event.target.setAttribute( 'active', '' );
                     headerNav.setAttribute( 'active', '' );
                 }
             } );
         }

    } ( jQuery ) );

    //*********************************************************//
    //HEADER SLIDER
    //*********************************************************//
    ( function( $ ) {

        if ( $( '.header__text-item' ).length > 1 ) {
            $( '.header__text' ).wrapInner( '<div class="header__slider"></div>' ).find( '.header__slider' ).addClass( 'owl-carousel' ).owlCarousel( {
                loop: true,
                items: 1,
                nav: true,
                navText: '',
                autoplayTimeout: 10000,
                autoplay: true,
                smartSpeed: 1000,
                // autoHeight: true,
                navContainer: '.header__slider-nav',
                dotsContainer: '.header__slider-dots',
                onInitialize: function( event ) {
                    $( event.target ).find( '.header__text-item' ).each( function() {
                        $( this ).attr( 'data-item-counter', $( this ).index() )
                    } );

                    $( '.header__background' ).attr( 'active', '' );

                    $( '.header__bottom' ).append( '<div class="header__slider-nav"></div><div class="header__slider-dots"></div>' );
                },
                onInitialized: function( event ) {
                    const itemIndex = + $( event.target ).find( '.owl-item.active [ data-item-counter ]' ).attr( 'data-item-counter' );

                    $( '.header__bottom' ).append( '<div class="header__slider-counter"><div class="header__slider-counter-current">' + ( itemIndex + 1 ) + '</div><div class="header__slider-counter-amount"> / ' + ( $( event.target ).find( '.owl-item:not( .cloned )' ).length ) + '</div></div>' );

                    $( '.header__background' ).find( '.header__background-item' ).eq( itemIndex ).attr( 'active', '' ).siblings().removeAttr( 'active' );
                },
                onTranslate: function( event ) {
                    const itemIndex = + $( event.target ).find( '.owl-item.active [ data-item-counter ]' ).attr( 'data-item-counter' );

                    $( '.header__slider-counter' ).find( '.header__slider-counter-current' ).text( itemIndex + 1 );

                    $( '.header__background' ).find( '.header__background-item' ).eq( itemIndex ).attr( 'active', '' ).siblings().removeAttr( 'active' );
                }
            } );
        }

    } ( jQuery ) );

    //*********************************************************//
    //NOVELTY SLIDER
    //*********************************************************//
    ( function( $ ) {
        $( '.novelty__slider' ).addClass( 'owl-carousel' ).owlCarousel( {
            loop: true,
            items: 3,
            nav: true,
            navText: '',
            autoplayTimeout: 5000,
            autoplay: true,
            smartSpeed: 1000,
            // autoHeight: true,
            navContainer: '.novelty__nav',
            dotsContainer: '.novelty__dots',
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                },
                361: {
                    items: 2
                },
                769: {
                    items: 3
                },
                993: {
                    items: 4
                }
            },
            onInitialize: function( event ) {
                $( '.novelty__title' ).wrap('<div class="novelty__head"></div>');
                $('.novelty__head').append( '<div class="novelty__dots"></div><div class="novelty__nav"></div>' );
            },
        } );

    } ( jQuery ) );

    //*********************************************************//
    //PRODUCT SLIDER
    //*********************************************************//
    ( function( $ ) {

        $( '.product__picture' ).wrapInner( '<div class="product__slider"></div>' ).find( '.product__slider' ).addClass( 'owl-carousel' ).owlCarousel( {
            loop: true,
            items: 1,
            nav: true,
            navText: '',
            autoplayTimeout: 10000,
            autoplay: true,
            smartSpeed: 1000,
            dotsContainer: '.product__thumbs',
            onInitialize: function( event ) {
                $( event.target ).after('<div class="product__thumbs"></div>');
            },
            onInitialized: function( event ) {
                $( event.target ).find( '.owl-item:not(.cloned) .product__img img' ).each( function() {
                    $( this ).closest( '.product__slider' ).next( '.product__thumbs' ).find( '.owl-dot' ).eq( $( this ).index( '.owl-item:not( .cloned ) .product__img img' )).html( '<img src="' + $( this ).attr( 'src' ) + '">' );
                });
            }
        } );

    } ( jQuery ) );

    //*********************************************************//
    //MLTIPLE RANGE SLIDER
    //*********************************************************//
    ( function() {

        const sliders = document.querySelectorAll( '.input-range-multiple' );

        for ( let i = 0, slider; slider = sliders[ i ]; i++ ) {

            const sliderInput = slider.querySelectorAll( 'input' );

            const sliderElem = document.createElement( 'div' );
            sliderElem.className = 'noUi';

            slider.appendChild( sliderElem );

            noUiSlider.create( sliderElem, {
                start: [ sliderInput[ 0 ].value, sliderInput[ 1 ].value ],
                connect: true,
                range: {
                    'min': + sliderInput[ 0 ].getAttribute( 'min' ),
                    'max': + sliderInput[ 0 ].getAttribute( 'max' )
                },
                step:  + sliderInput[ 0 ].getAttribute( 'step' ),
            } );

            sliderElem.noUiSlider.on( 'update', function ( values, handle ) {
                sliderInput[ handle ].value = parseInt( values[ handle ] );
            } );

            for ( let i = 0; i < sliderInput.length ; i++ ) {
                sliderInput[ i ].addEventListener( 'change', function () {
                    sliderElem.noUiSlider.set( [ sliderInput[ 0 ].value, sliderInput[ 1 ].value ] );
                } );
            }
        }

    } () );

    //*********************************************************//
    //FILTER ITEM CLEAR
    //*********************************************************//
    ( function( $ ) {

        $( '.filter__item' ).each( function() {
            const $filterItem =  $( this );
            $filterItem.find( '.filter__item-head-clear-button' ).on( 'click', function( event ) {
                event.stopPropagation();

                const $filterInput = $filterItem.find( 'input' );

                if ( $filterInput.attr( 'type' ) === 'checkbox' || $filterInput.attr( 'type' ) === 'radio' ) {

                    $filterInput.attr( 'checked', false );
                } else {

                    $filterInput.val( '0' );

                    if ( $filterItem.find( '.noUi') ) {
                        $filterItem.find( '.noUi').get( 0 ).noUiSlider.set( [ 0, 0 ] );
                    }
                }

            } );
        } );

    } ( jQuery ) );

    //*********************************************************//
    //LAZY LOAD IMAGES
    //*********************************************************//
    ( function( $ ) {

        const lazyLoadImg = new IntersectionObserver(

            function( entries ) {

                for ( let i = 0; i < entries.length; i++  ) {

                    const entry = entries[ i ];
                    const target = entry.target;

                    if ( entry.isIntersecting && target.hasAttribute( 'data-lazy-load' ) ) {

                        if ( target.nodeName === 'IMG' ) {

                            target.setAttribute( 'src', target.getAttribute( 'data-lazy-load' ) );
                        } else if ( target.nodeName === 'SOURCE' ) {

                            target.setAttribute( 'srcset', target.getAttribute( 'data-lazy-load' ) );
                        } else {

                            target.style.backgroundImage = 'url(' + target.getAttribute( 'data-lazy-load' ) + ')';
                        }

                        target.removeAttribute( 'data-lazy-load' )

                        lazyLoadImg.unobserve( target );

                        target.style.opacity = 1;
                    }
                }
            },
            {
                root: null,
                rootMargin: ( window.innerHeight / 2 ) + 'px ' + ( window.innerWidth / 2 ) + 'px',
                threshold: [ 0 ],
            }
        );

        // Start observing an element
        const lazyLoadImgElems = document.querySelectorAll( '[ data-lazy-load ]' );

        for ( let i = 0; i < lazyLoadImgElems.length; i++  ) {

            lazyLoadImg.observe( lazyLoadImgElems[ i ] );

            lazyLoadImgElems[ i ].style.opacity = 0;
            lazyLoadImgElems[ i ].style.transition = '.5s';
        }

    } ( jQuery ) );
} );
