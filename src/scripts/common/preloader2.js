module.exports = function(){
    let percentsTotal = 0;
    let preloader = $('.preloader');

    let imgPath = $('*').map(function (ndx, element) {
        let background = $(element).css('background-image');
        let isImg = $(element).is('img');
        let path = '';

        if (background !== 'none') {
            path = background.replace('url("', '').replace('")', '');
        }

        if (isImg) {
            path = $(element).attr('src');
        }

        if (path) return path;
    });

    /*let animatePreloader = () => {
        if (currentPercent > delayOfCircleOne) {
            circleOne.style.strokeDashoffset =
                440 -
                440 /
                100 *
                (currentPercent * (delayOfCircleOne / 100 + 1) - delayOfCircleOne);
            degreeOne = -30 + Math.round(currentPercent * 2);
            circleOne.style.transform = "rotate(" + degreeOne + "deg)";
        }
        if (currentPercent > delayOfCircleTwo) {
            circleTwo.style.strokeDashoffset =
                350 -
                350 /
                100 *
                (currentPercent * (delayOfCircleTwo / 100 + 1) - delayOfCircleTwo);
            degreeTwo = -20 - Math.round(currentPercent * 2);
            circleTwo.style.transform = "rotate(" + degreeTwo + "deg)";
        }
        circleThree.style.strokeDashoffset = 260 - 260 / 100 * currentPercent;
        degreeThree = Math.round(currentPercent * 2);
        circleThree.style.transform = "rotate(" + degreeThree + "deg)";
        preloaderText.innerHTML = currentPercent;
        currentPercent += 5;
    };*/

    let setPercents = function(total, current) {
        let percents = Math.ceil(current / total * 100);

        $('.preloader__text').text(percents + '%');

        if (percents >= 100) {
            preloader.fadeOut();
        }
    };

    let loadImages = function(images) {

        if (!images.length) preloader.fadeOut();

        images.forEach(function(img, i, images){
            let fakeImage = $('<img>', {
                attr : {
                    src : img,
                },
            });

            fakeImage.on('load error', function(){
                percentsTotal++;
                setPercents(images.length, percentsTotal);
            });
        });

    };

    return {
        init: function () {
            let imgs = imgPath.toArray();

            imgs.push('./images/water.jpg');
            imgs.push('./images/water-maps.jpg');

            loadImages(imgs);
        },
    };
};