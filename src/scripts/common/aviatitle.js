module.exports = function(){
    return {
        generate: function (string, block) {
            let wordsArray = string.split(' '),
                stringArray = string.split(''),
                sentence = [],
                word = '';

            block.text('');

            wordsArray.forEach(function (currentWord) {
                let wordsArray = currentWord.split('');

                wordsArray.forEach(function (letter) {
                    let letterHtml = '<span class="letter-span">' + letter + '</span>';

                    word += letterHtml;
                });

                let wordHTML = '<span class="letter-word">' + word + '</span>';

                sentence.push(wordHTML);
                word = '';
            });

            block.append(sentence.join(' '));

            // анимация появления
            let letters = block.find('.letter-span'),
                counter = 0,
                timer,
                duration = 500 / stringArray.length;

            function showLetters() {
                let currentLetter = letters.eq(counter);

                currentLetter.addClass('active');
                counter++;

                if (typeof timer !== 'undefined') {
                    clearTimeout(timer);
                }

                timer = setTimeout(showLetters, duration);
            }

            showLetters();

        },
    };
};