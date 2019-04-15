import anime from 'animejs'

export const loginAnimations = () => {

    const top = window.innerHeight;

    anime({
        targets: '.email',
        translateY: [-top, 0],
        easing: 'easeOutElastic(1, 1.1)',
        delay: 400
    });
    anime({
        targets: '.password',
        translateY: [-top, 0],
        easing: 'easeOutElastic(1, 1.1)',
        delay: 500
    });
    anime({
        targets: '.submit',
        translateY: [-top, 0],
        easing: 'easeOutElastic(1, 1.1)',
        delay: 600
    });

}