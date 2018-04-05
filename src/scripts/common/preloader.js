module.exports = () => {
    const ImagePreloader = require("image-preloader");
   // const isScroll = require("./isScroll.js");
    const preloader = document.querySelector(".preloader");
    const preloaderSvg = document.querySelector(".preloader__svg");
    const circleOne = document.querySelector(".preloader__circle-one");
    const circleTwo = document.querySelector(".preloader__circle-two");
    const circleThree = document.querySelector(".preloader__circle-three");
    const preloaderText = document.querySelector(".preloader__text");

    let currentPercent = 0;
    let delayOfCircleOne = 30;
    let delayOfCircleTwo = 20;
    let degreeOne = -30;
    let degreeTwo = -20;
    let degreeThree = 0;
    let animateInterval;
    let animatePreloader = () => {
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
    };
    let exitPreloader = currentPercent => {
        if (currentPercent >= 100) {
            preloaderText.innerHTML = 100;
            currentPercent = 100;
            clearInterval(animateInterval);
            setTimeout(() => {
                preloaderSvg.style.opacity = 0;
                preloaderText.style.opacity = 0;
            }, 500);
            setTimeout(() => {
                preloader.style.opacity = 0;
                setTimeout(() => {
                    preloader.style.display = "none";
                    //isScroll(true);
                }, 1100);
            }, 1000);
        }
    };
    let imagePreloader = new ImagePreloader();
    imagePreloader
        .preload(
            "../../user/dist/layer1.png",
            "../../user/dist/layer2.png",
            "../../user/dist/layer3.png",
            "../../user/dist/layer4.png",
            "../../user/dist/layer5.png",
            "../../user/dist/layer6.png",
            "../../user/dist/layer7.png",
            "../../user/dist/layer8.png",
            "../../user/dist/layer9.png",
            "../../user/dist/layer10.png"
        )
        .then(function(status) {
            status.forEach(element => {
                if (element.status != true) {
                    document.querySelector(".header").style.backgroundImage =
                        'url("../../user/dist/bg.jpg")';
                    document.querySelector(".parallax").style.display = "none";
                }
            });
            setTimeout(() => {
                exitPreloader(100);
            }, 2000);
        })
        .catch(function() {
            if (document.querySelector(".header"))
                document.querySelector(".header").style.backgroundImage =
                    'url("../../user/dist/bg.jpg")';
            if (document.querySelector(".welcome"))
                document.querySelector(".welcome").style.backgroundImage =
                    'url("../../user/dist/bg.jpg")';
            document.querySelector(".parallax").style.display = "none";
        });
    if (preloaderSvg) {
        //isScroll(false);
        animateInterval = setInterval(animatePreloader, 80);
    }
};
