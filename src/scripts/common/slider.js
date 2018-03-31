const aviatitle = require('./aviatitle')();

let Slider = function(container) {
    const nextBtn = container.find('.slider__scroll_down'), // левая  кнопка
        prevBtn = container.find('.slider__scroll_up'), // правая кнопка
        items = $('.slider__previews-item'), // слайды
        display = container.find('.slider__main-slide'), // Витрина слайдера
        title = container.find('.slider__project-name'), // заголовок слайда
        skills = container.find('.slider__stack-tech'), // технологии
        link = container.find('.slider__link'); // ссылка


    let timeout,
        itemsLength = items.length, // количество слайдов
        duration = 500,
        flag = true;

    this.counter = 0;

    // private Генерация разметки кнопки следующий слайд
    let generateMarkups = function() {
        let list = $('.slider__nav-preview_down').find('.slider__previews'),
            markups = list.clone();

        $('.slider__nav-preview_up').append(markups);
    };
    // Вытащить данные из дата атрибутов для левой части слайдера
    let getDataArrays = function() {
        let dataObject = {
            pics: [],
            title: [],
            skills: [],
            link: [],
        };

        $.each(items, function() {
            let $this = $(this);

            dataObject.pics.push($this.data('full'));
            dataObject.title.push($this.data('title'));
            dataObject.skills.push($this.data('skills'));
            dataObject.link.push($this.data('link'));
        });

        return dataObject;
    };

    let slideInLeftBtn = function(slide) {
        let reqItem = items.eq(slide - 1),
            activeItem = items.filter('.slider__previews-item_active');

        activeItem.stop(true, true).animate(
            {
                transform: 'translateY(100%)',
            },
            duration
        );

        reqItem.stop(true, true).animate(
            {
                transform: 'translateY(0%)',
            },
            duration,
            function() {
                $(this)
                    .addClass('slider__previews-item_active')
                    .siblings()
                    .removeClass('slider__previews-item_active');
                   // .css('transform', 'translateY(-100%)');
            }
        );
    };

    let slideInRightBtn = function(slide) {
        let items = $('.slider__nav-preview_up').find('.slider__previews-item'), //prevBtn.find('.works-slider__control-item'),
            activeItem = items.filter('.slider__previews-item_active'),
            reqSlide = slide + 1;

        if (reqSlide > itemsLength - 1) {
            reqSlide = 0;
        }

        let reqItem = items.eq(reqSlide);

        activeItem.stop(true, true).animate(
            {
                transform: 'translateY(-100%)',
            },
            duration
        );

        reqItem.stop(true, true).animate(
            {
                transform: 'translateY(0%)',
            },
            duration,
            function() {
                $(this)
                    .addClass('slider__previews-item_active')
                    .siblings()
                    .removeClass('slider__previews-item_active');
                    //.css('transform', 'translateY(100%)');
            }
        );
    };

    let changeMainPicture = function(slide) {
        let image = display.find('.slider__image');
        let data = getDataArrays();

        image.stop(true, true).fadeOut(duration / 2, function() {
            image.attr('src', data.pics[slide]);
            $(this).fadeIn(duration / 2);
        });
    };

    let changeTextData = function(slide) {
        let data = getDataArrays();

        // название работы
        aviatitle.generate(data.title[slide], title, 'ru');

        // описание технологий
        aviatitle.generate(data.skills[slide], skills, 'en');

        // ссылка
        link.attr('href', data.link[slide]);
    };

    // public
    this.setDefaults = function() {
        let _that = this;
        let data = getDataArrays();

        console.log(data);
        // создаем разметку
        generateMarkups();

        // левая кнопка
        $('.slider__nav-preview_down')
            .find('.slider__previews-item')
            .eq(_that.counter - 1)
            .addClass('slider__previews-item_active');

        // правая кнопка
        $('.slider__nav-preview_up')
            .find('.slider__previews-item')
            .eq(_that.counter + 1)
            .addClass('slider__previews-item_active');

        // основное изображение
        display
            .find('.slider__image')
            .attr('src', data.pics[_that.counter]);

        // текстовые описания
        changeTextData(_that.counter);
    };

    this.moveSlide = function(direction) {
        let _that = this;

        let directions = {
            next: function() {
                // закольцовывание слайдера
                if (_that.counter < itemsLength - 1) {
                    _that.counter++;
                } else {
                    _that.counter = 0;
                }
            },

            prev: function() {
                if (_that.counter > 0) {
                    _that.counter--;
                } else {
                    _that.counter = itemsLength - 1;
                }
            },
        };

        directions[direction]();

        if (flag) {
            flag = false;

            if (typeof timeout !== 'undefined') {
                clearTimeout(timeout);
            }

            timeout = setTimeout(function() {
                flag = true;
            }, duration);

            slideInLeftBtn(_that.counter);
            slideInRightBtn(_that.counter);
            changeMainPicture(_that.counter);
            changeTextData(_that.counter);
        }
    };
};

let slider = new Slider($('.works'));
slider.setDefaults();

$('.slider__scroll_down').on('click', function(e) {
    e.preventDefault();
    slider.moveSlide('prev');
});

$('.slider__scroll_up').on('click', function(e) {
    e.preventDefault();
    slider.moveSlide('next');
});
