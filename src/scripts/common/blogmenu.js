let scrollMenu = (function() {
    const $news = $('.article');
    const $item = $('.sidebar__item');
    const $wrapMenu = $('.sidebar__menu');
    const $wrapSidebar = $('.blog__sidebar');

    let positionArticle = [];
    let offsetHeight = 0; // верхнее смещение для скролла
    let flagAnimation = true;

    if (!$('.blog').length) {
        return {
            init: function () {

            },
        };
    }

    // выполняем расчет позиций для каждой статьи
    const _setPositionArticle = function(elements) {
        elements.each(function(item) {
            // $(this) = статья
            positionArticle[item] = {};
            positionArticle[item].top = $(this).offset().top - offsetHeight;
            positionArticle[item].bottom =
                positionArticle[item].top + $(this).innerHeight();


            console.log(positionArticle); // positionArticle массив объектов в верхним и нижним отступом
        });
    };

    const _scrollPageFixMenu = function(e) {
        let scroll = window.pageYOffset;

        if (scroll < ($wrapSidebar.offset().top - 20)) {
            //$wrapMenu.removeClass('fixed');
            $wrapMenu.offset({top : $wrapSidebar.offset().top});
        } else {
            $wrapMenu.offset({top : (scroll + 20) });
            //$wrapMenu.addClass('fixed');
        }

        // проверка на отступ сверху, если больше чем нужно ставим добавляем класс fixed
    };

    const _scrollPage = function(e) {
        const isFirstVision = function(element, current) {
            let scroll = window.pageYOffset;
            return (
                scroll >= element.top &&
                scroll < element.bottom &&
                !current.hasClass('sidebar__item_active')
            );


        };
        positionArticle.forEach((element, index) => {
            let $currentElement = $item.eq(index);
            if (isFirstVision(element, $currentElement)) {
                $currentElement
                    .addClass('sidebar__item_active')
                    .siblings()
                    .removeClass('sidebar__item_active');
            }
        });
    };

    const _clickMenu = function(e) {
        if (flagAnimation) {
            flagAnimation = false;
            let $element = $(e.currentTarget);
            let index = $element.index();
            let sectionOffset = Math.ceil(positionArticle[index].top);
            $(document).off('scroll', _scrollPage);
            $element.siblings().removeClass('sidebar__item_active');

            $("body, html").animate({ scrollTop: sectionOffset }, 1000, () => {
                $element.addClass('sidebar__item_active');
                $(document).on('scroll', _scrollPage);
                flagAnimation = true;
            });
        }
    };

    const _clickSwipeBtn = function () {
        $wrapSidebar.toggleClass('blog__sidebar_opened');
    };

    const addListener = function() {
        $(window).one('load', function(e) {
            _setPositionArticle($news);
            $item.on('click', _clickMenu);
            $('.swipe-btn').on('click', _clickSwipeBtn);
            $(document).on('scroll', _scrollPage);
            if ($wrapSidebar.css('position') !== 'fixed') {
                $(document).on('scroll', _scrollPageFixMenu);
            }
        });

        $(window).on('resize', function(e) {
            _setPositionArticle($news);
        });
    };

    return {
        init: addListener,
    };
})();

scrollMenu.init();
