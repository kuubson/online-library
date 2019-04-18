import anime from 'animejs'

export const accountAnimations = () => {

    anime({
        targets: '.book',
        scale: [0, 1],
        easing: 'easeOutElastic(1, 2)'
    });

}