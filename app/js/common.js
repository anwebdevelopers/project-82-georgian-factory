document.addEventListener( 'DOMContentLoaded', function( event ) {

    'use strict';

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
    // } () );


    //*********************************************************//
    //LAZY LOAD IMAGES
    //*********************************************************//
    ( function() {

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
            lazyLoadImgElems[ i ].style.transition = '.3s';
        }

    } () );

    //*********************************************************//
    //LAZY LOAD IMAGES
    //*********************************************************//
    ( function() {

        const headerNav = document.querySelector( '.header__nav' );

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
                    } else {/* right swipe */
                        // alert( 'right!' );
                         headerNav.setAttribute( 'active', '' );
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
    //HEADER SLIDER
    //*********************************************************//
    // $( '.slider' ).addClass( 'owl-carousel' ).owlCarousel( {
    //     loop: true,
    //     items: 1,
    //     nav: true,
    //     navText: '',
    //     autoplayTimeout: 5000,
    //     autoplay: true,
    //     smartSpeed: 1200,
    //     autoHeight: true,
    //     responsiveClass: true,
    //     responsive: {
    //         0: {
    //             items: 2
    //         },
    //         481: {
    //             items: 3
    //         },
    //         769: {
    //             items: 4
    //         },
    //         993: {
    //             items: 5
    //         }
    //     },
    //     onInitialize: function( event ) {
    //         $( event.target ).find( '.about__item' ).each( function() {
    //             $( this ).attr( 'data-item-counter', $( this ).index() + 1 )
    //         } );
    //     },
    //     onInitialized: function( event ) {
    //         $( event.target ).append( '<div class="about__counter"><div class="about__counter-current">' + $( event.target ).find( '.owl-item.active [ data-item-counter ]' ).attr( 'data-item-counter' ) + '</div><div class="about__counter-amount"> / ' + ( $( event.target ).find( '.owl-item:not( .cloned )' ).length ) + '</div></div>' );
    //     },
    //     onTranslated: function( event ) {
    //         $( event.target ).find( '.about__counter-current' ).text( $( event.target ).find( '.owl-item.active [ data-item-counter ]' ).attr( 'data-item-counter' ) )
    //     }
    // } );
});
