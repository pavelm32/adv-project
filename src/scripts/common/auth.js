let auth = (function () {
    const $auth_button = $('.flip-btn');
    const $flip_container = $('.welcome__container');

    let _toogleFlipBlock = e => {
        e.preventDefault();

        $('.header__link').toggleClass('header__link_hidden');
        $flip_container.toggleClass('welcome__container_fliped');
    };

    return {
        init: function () {
            $auth_button.on('click', _toogleFlipBlock);
        },
    };
})();

auth.init();