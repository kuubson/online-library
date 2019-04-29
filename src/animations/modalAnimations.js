import anime from 'animejs'

export const modalAnimations = () => {
    anime({
        targets: '.modal',
        scale: [1.2, 1],
        easing: 'easeOutElastic(1, 1.1)',
    });
}
