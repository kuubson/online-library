import anime from 'animejs'

export const registerAnimations = () => {

    const top = -window.innerHeight;
    const right = window.innerWidth;

    anime({
        targets: '.name',
        translateY: [top, 0],
        easing: 'easeOutElastic(1, 1.1)',
        delay: 100
    });
    anime({
        targets: '.surname',
        translateY: [top, 0],
        easing: 'easeOutElastic(1, 1.1)',
        delay: 200
    });
    anime({
        targets: '.email',
        translateY: [top, 0],
        easing: 'easeOutElastic(1, 1.1)',
        delay: 300
    });
    anime({
        targets: '.password',
        translateY: [top, 0],
        easing: 'easeOutElastic(1, 1.1)',
        delay: 400
    });
    anime({
        targets: '.password2',
        translateY: [top, 0],
        easing: 'easeOutElastic(1, 1.1)',
        delay: 500
    });
    anime({
        targets: '.submit',
        translateY: [top, 0],
        easing: 'easeOutElastic(1, 1.1)',
        delay: 600
    });
    anime({
        targets: '.form-link',
        translateX: [right, 0],
        easing: 'easeOutElastic(1, 1.1)',
        delay: 700
    });
}