const modal = document.querySelector('.modal');
const constructModal = document.querySelector('#construct-modal');
const cross = document.querySelector('#cross');
const closeBtn = document.querySelector('.modal__btn-close');
const textarea = document.querySelector('.modal__textarea');
const themeBtn = document.querySelector('.nav__theme');
const navOpen = document.querySelector('.nav__span-wrapper');
const nav = document.querySelector('.nav__ul-wrapper');
const navCross = document.querySelector('.nav__cross');
const btnUp = document.querySelector('.up__wrapper');

// Тема
let isDarkTheme = false;

// Переменные для вывода результата submit формы
let orderName = '';
let orderSum = 0;
let orderPrice = 0;
let orderColor = '';
let orderCount = 1;

/**
 * Формат даты.
 * @param {string} date - Дата
 */
const getDayInfo = (date) => new Date(date).getFullYear();

/**
 * Формат цены.
 * @param {number} money - Цена
 */
const getMoney = (money) =>
    String(money)
        .split(/(?=(?:\d{3})+(?!\d))/g)
        .join(' ') + ' ₽';

/**
 * Эвент закрытия модального окна.
 * @param {Event} e - Эвент
 */
const handleModalClose = (e) => {
    if (e.currentTarget === e.target) {
        modal.classList.remove('modal--active');

        const nodes = [].slice.call(constructModal.children);

        nodes.forEach((node) => node.remove());

        textarea.value = '';
    }
};

/**
 * Эвент открытия/закрытия nav-bar
 * @param {event} e - Эвент
 */
const handleNavBar = (e) => {
    navOpen.classList.toggle('nav--active');
    themeBtn.classList.toggle('nav--active');
    nav.classList.toggle('nav--active');
};

/**
 * Эвент скрытия btnUp
 * @param {event} e - Эвент
 */
const showBtnUp = (e) => {
    btnUp.classList.toggle('up__wrapper--active');
};

/**
 * Эвент раскрытия btnUp
 * @param {event} e - Эвент
 */
const hideBtnUp = (e) => {
    btn.classList.toggle('up__wrapper--active');
};

/**
 * Эвент открытия модального окна.
 * @param {Event} item - Товар
 */
const handleModalOpen = (item) => {
    modal.classList.add('modal--active');

    createModalItem(item);
};

/**
 * Эвент нажатия на выбор цвета.
 * @param {Event} e - Эвент
 */
const handleRadioClick = (e) => {
    const radio = document.querySelectorAll('.modal__fake');

    radio.forEach((el) => {
        if (el.classList.contains('modal__fake--active')) {
            el.classList.remove('modal__fake--active');
        }
    });

    e.target.classList.add('modal__fake--active');
    orderColor = e.target.previousSibling.value;
};

/**
 * Эвент нажатия на счетчик в форме.
 * @param {Event} e - Эвент
 * @param {HTMLElement} price - Элемент цены
 */
const handleCounterClick = (e, price) => {
    e.preventDefault();

    const input = document.querySelector('.counter__input');
    const action = e.currentTarget.value;

    switch (action) {
        case 'minus':
            if (+input.value > 1) {
                input.value = +input.value - 1;
            }
            break;
        case 'plus':
            input.value = +input.value + 1;
            break;
    }
    price.innerText = getMoney(orderPrice * +input.value);
    orderCount = input.value;
    orderSum = orderPrice * +input.value;
};

/**
 * Функия создания элемента с стилями и атрибутами.
 * @param {keyof HTMLElementTagNameMap} element - Элемент
 * @param {Array<string>} styles - Список стилей
 * @param {{[x: key]: string}} attr - Список атрибутов
 */
const createCustomElement = (element, styles, attr) => {
    const el = document.createElement(`${element}`);

    styles.forEach((cls) => el.classList.add(`${cls}`));

    for (let key in attr) {
        switch (key) {
            case 'theme':
                if (isDarkTheme) {
                    el.classList.add('theme-dark');
                }
                break;
            case 'text':
                el.innerText = attr[key];
                break;
            default:
                el.setAttribute(key, attr[key]);
        }
    }

    return el;
};

/**
 * Функция создания списка элементов для цветов.
 * @param {{[x: colorName]: color}} colors - Объект цветов товара
 */
const createColorElements = (colors) => {
    return Object.keys(colors).map((color, i) => {
        const inputStyle = createCustomElement('label', ['modal__input-style']);
        const radioInput = createCustomElement('input', ['modal__input'], {
            type: 'radio',
            name: 'color',
            value: color,
        });
        const radioStyle = createCustomElement('span', ['modal__fake']);

        radioStyle.addEventListener('click', handleRadioClick);

        if (i === 0) {
            radioInput.checked = true;
            radioStyle.classList.add('modal__fake--active');
        }
        radioStyle.style = `background-color: ${colors[color]}`;

        return [inputStyle, radioInput, radioStyle];
    });
};

/**
 * Создание товара в модальном окне.
 * @param {{name: string; cost: number; img: string; color: {[x: colorName]: color}}} item - Объект товара
 */
const createModalItem = (item) => {
    // Инициализация переменных товара
    orderPrice = item.cost;
    orderSum = item.cost;
    orderName = item.name;

    // Инициализация блоков
    const imgWrapper = createCustomElement('div', ['modal__img-wrapper']);
    const charWrapper = createCustomElement('div', ['modal__char-wrapper']);
    const amountWrapper = createCustomElement('div', ['modal__amount-wrapper']);
    const img = createCustomElement('img', ['modal__img'], { src: item.img, alt: 'Картинка товара' });
    const textWrapper = createCustomElement('div', ['modal__product-text-wrapper']);
    const textName = createCustomElement('p', ['modal__product-text'], { text: 'Наименование товара' });
    const textColor = createCustomElement('p', ['modal__product-text'], { text: 'Цвет' });
    const textCounter = createCustomElement('p', ['modal__product-text'], { text: 'Количество' });
    const textPrice = createCustomElement('p', ['modal__product-text'], { text: 'Цена' });
    const name = createCustomElement('p', ['modal__product-name'], { theme: true, text: item.name });
    const inputWrapper = createCustomElement('div', ['modal__input-wrapper']);
    const inputTable = createCustomElement('div', ['modal__input-table']);
    const pointerWrapper = createCustomElement('div', ['modal__pointer-wrapper']);
    const priceWrapper = createCustomElement('div', ['modal__price-wrapper']);
    const counter = createCustomElement('div', ['counter']);
    const counterMinus = createCustomElement('button', ['counter__minus'], { value: 'minus', theme: true });
    const counterPlus = createCustomElement('button', ['counter__plus'], { value: 'plus', theme: true });
    const counterMinusImg = createCustomElement('img', ['counter__minus-img'], {
        src: isDarkTheme ? './img/minus-white12.svg' : './img/minus12.svg',
    });
    const counterPlusImg = createCustomElement('img', ['counter__plus-img'], {
        src: isDarkTheme ? './img/plus-white12.svg' : './img/plus12.svg',
    });
    const counterInput = createCustomElement('input', ['counter__input'], {
        theme: true,
        disabled: true,
        value: '1',
        name: 'counter',
        type: 'text',
    });
    const price = createCustomElement('p', ['modal__price'], { theme: true, text: getMoney(orderPrice) });

    // Эвенты счетчика
    counterMinus.addEventListener('click', (e) => handleCounterClick(e, price));
    counterPlus.addEventListener('click', (e) => handleCounterClick(e, price));

    // Генерация в HTML
    constructModal.append(imgWrapper, charWrapper, amountWrapper);
    imgWrapper.append(img);

    textWrapper.append(textName, name);

    inputWrapper.append(textColor, inputTable);
    createColorElements(item.color).forEach((color) => {
        inputTable.append(...color);
    });

    charWrapper.append(textWrapper, inputWrapper);

    pointerWrapper.append(textCounter, counter);
    counter.append(counterMinus, counterInput, counterPlus);
    counterMinus.append(counterMinusImg);
    counterPlus.append(counterPlusImg);

    priceWrapper.append(textPrice, price);

    amountWrapper.append(pointerWrapper, priceWrapper);
};

/**
 * Формула выведения человекочитаемой даты
 * @param {{date: string}} date - дата обьекта
 */
const getActualData = (date) => {
    const dateNew = new Date(date);
    console.log(dateNew);
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четвег', 'Пятница', 'Суббота'];
    const month = [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декабря',
    ];
    let week = 0;
    const actualDay = days[dateNew.getDay()];
    const actualMonth = month[dateNew.getMonth()];
    const actualYear = dateNew.getFullYear();

    const dayNumber = Number(dateNew.getDate());
    dayNumber <= 7
        ? (week = 1)
        : dayNumber <= 14
        ? (week = 2)
        : dayNumber <= 21
        ? (week = 3)
        : dayNumber <= 28
        ? (week = 4)
        : dayNumber <= 31
        ? (week = 5)
        : (week = 1);

    const actualDate = `${actualDay}, ${week} неделя ${actualMonth} ${actualYear} года`;

    return actualDate;
};

/**
 * Создание элементов товаров на главной странице.
 * @param {{name: string; cost: number; date: string; img: string}} item - Объект товара
 * @param {HTMLElement} parant - Родительский элемент для вставки в HTML
 */
const createCategoryItem = (item, parent) => {
    // Инициализация блоков
    const categoryItem = createCustomElement('li', ['category__item']);
    const imgWrapper = createCustomElement('div', ['category__img-wrapper']);
    const img = createCustomElement('img', ['category__img'], { src: item.img, alt: 'Картинка товара' });
    const date = createCustomElement('p', ['category__date'], { text: getActualData(item.date) });
    const cost = createCustomElement('p', ['category__cost', 'theme'], { text: getMoney(item.cost) });
    const name = createCustomElement('p', ['category__name', 'theme'], { text: item.name });
    const btn = createCustomElement('button', ['category__btn'], { text: 'Купить' });

    // Эвент кнопки купить
    btn.addEventListener('click', () => handleModalOpen(item));

    // Генерация в HTML
    parent.append(categoryItem);
    categoryItem.append(imgWrapper, date, cost, name, btn);
    imgWrapper.append(img);
};

/**
 * Инициализация submit для формы.
 */
const initFormAction = () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', submitForm, true);

    function submitForm(e) {
        e.preventDefault();

        const message = textarea.value;

        alert(
            `Мы приняли ваш заказ, спасибо
            Название: ${orderName}
            Цвет: ${orderColor}
            Количество: ${orderCount}
            Цена (шт.): ${getMoney(orderPrice)}
            Общая цена: ${getMoney(orderSum)}
            ${message && `Комментарий: ${message}`}
            `
        );
        handleModalClose(e);
    }
};

/**
 * Входная точка в приложение.
 * @param {{[x: key]: any}} data - Начальные данные из файла initialData.js
 */
const initApp = (data) => {
    //Рендер товаров на главной
    for (let key in data) {
        const parent = document.querySelector(`#${key}`);
        data[key].forEach((obj) => {
            createCategoryItem(obj, parent);
        });
    }

    // Эвенты
    themeBtn.addEventListener('click', (e) => {
        const themeElements = document.querySelectorAll('.theme');
        const cross = document.querySelector('.modal__cross');

        if (e.currentTarget.src.includes('sun')) {
            e.currentTarget.src = './img/moon24.svg';
            cross.src = './img/cross-white24.svg';
            isDarkTheme = true;
        } else {
            e.currentTarget.src = './img/sun24.svg';
            cross.src = './img/cross24.svg';
            isDarkTheme = false;
        }

        themeElements.forEach((el) => {
            el.classList.toggle('theme-dark');
        });
    });
    modal.addEventListener('click', (e) => {
        handleModalClose(e);
    });
    cross.addEventListener('click', (e) => {
        handleModalClose(e);
    });
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleModalClose(e);
    });
    navOpen.addEventListener('click', (e) => {
        handleNavBar(e);
    });
    navCross.addEventListener('click', (e) => {
        handleNavBar(e);
    });
    const btnUp = {
        el: document.querySelector('.up__wrapper'),
        show() {
            this.el.classList.remove('up__wrapper--active');
        },
        hide() {
            this.el.classList.add('up__wrapper--active');
        },
        addEventListener() {
            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY || document.documentElement.scrollTop;
                scrollY > 400 ? this.show() : this.hide();
            });
        },
    };

    btnUp.addEventListener();

    //Рендер формы
    initFormAction();
};

// Начальный вызов приложения
initApp(initialData);
