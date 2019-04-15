import anime from 'animejs'

export const homeAnimations = () => {

    const right = window.innerWidth;
    const left = -window.innerWidth;
    const bottom = window.innerHeight;
    const top = -window.innerHeight;

    anime({
        targets: '.login',
        translateY: [top, 0],
        easing: 'easeInOutQuad',
        delay: 500
    });
    anime({
        targets: '.register',
        translateY: [top, 0],
        easing: 'easeInOutQuad',
        delay: 600
    });

    anime({
        targets: '.box1',
        translateX: [left, 0],
        easing: 'easeInOutQuad'
    });
    anime({
        targets: '.box2',
        translateY: [bottom, 0],
        easing: 'easeOutElastic(0.1, 1)'
    });
    anime({
        targets: '.box3',
        translateX: [right, 0],
        easing: 'easeInOutQuad'
    });

}