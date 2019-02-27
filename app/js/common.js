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

    ( function( $ ) {

        // $( '.filter__item' ).on( 'mouseenter', function() {
        //     $( this ).attr( 'active', '' );
        // } ).on( 'mouseleave', function() {
        //     $( this ).removeAttr( 'active' );
        // } );

    } ( jQuery ) );


    //*********************************************************//
    //SWIPE MOBILE CATEGORIES MENU
    //*********************************************************//
    ( function() {

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

    } () );

    //*********************************************************//
    //CLICK MOBILE CATEGORIES MENU
    //*********************************************************//
    ( function( $ ) {

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

    } ( jQuery ) );

    //*********************************************************//
    //HEADER SLIDER
    //*********************************************************//
    ( function( $ ) {

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

    } ( jQuery ) );

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
    //MLTIPLE RANGE SLIDER
    //*********************************************************//
    ( function( $ ) {

        $( '.input-range-multiple input[ type="range" ]' ).on( 'change', function( e ) {
            console.log(e.target.value);
        } )
        // $(document).on( 'click', function( e ) { $( 'input[ type="range" ]' ).val('1000') } )

        // $( 'input[ type="range" ][ multiple ]' ).nativeMultiple( {
        //     // stylesheet: 'input-range',
        //     onCreate: function() {
        //         console.log(this);
        //     },
        //     onChange: function (first_value, second_value ) {
        //         console.log('onchange', [first_value, second_value]);
        //     },
        //     onSlide: function( first_value, second_value ) {
        //         console.log('onslide', [first_value, second_value]);
        //     }
        // } );

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
