import anime from 'animejs'
import $ from 'jquery'

export const booksAnimations = (whichBooks) => {

    const books = $(whichBooks);

    let timeGap = 50;

    for (let x = 0; x < books.length; x++) {
        anime({
            targets: books[x],
            scale: [0, 1],
            easing: 'easeOutElastic(1, 1.1)',
            delay: timeGap += 50
        });
    }

}
