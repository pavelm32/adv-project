//const $ = require('jquery');

let menu = (function(options) {
    let button = $(options.hamburger);
    let overlay = $(options.overlay);
    let menu = $(options.menu);

    let _toggleMenu = function(e) {
        button.toggleClass('hamburger_fixed');
        overlay.toggleClass('overlay_show');
        menu.toggleClass('wrapper-menu_opened');
    };

    let addListeners = function() {
        button.on('click', _toggleMenu);
    };

    return {
        init: addListeners,
    };
})({
    hamburger: '.hamburger',
    overlay: '#overlay',
    menu: '.wrapper-menu',
});

menu.init();