const modal = document.querySelector('.modal');
const constructModal = document.querySelector('#construct-modal');
const cross = document.querySelector('#cross');
const close = document.querySelector('#close');

const themeBtn = document.querySelector('.nav__theme');

let darkTheme = false;

themeBtn.addEventListener('click', (e) => {
    const themeElements = document.querySelectorAll('.theme');
    const cross = document.querySelector('.modal__cross');

    if (e.currentTarget.src.includes('sun')) {
        e.currentTarget.src = './img/moon24.svg';
        cross.src = './img/cross-white24.svg';
        darkTheme = true;
    } else {
        e.currentTarget.src = './img/sun24.svg';
        cross.src = './img/cross24.svg';
        darkTheme = false;
    }

    themeElements.forEach((el) => {
        el.classList.toggle('theme-dark');
    });
});

const modalClose = (e) => {
    e.preventDefault();
    if (e.currentTarget === e.target) {
        modal.classList.remove('modal--active');

        const nodes = [].slice.call(constructModal.children);

        nodes.forEach((node) => node.remove());
    }
};

modal.addEventListener('click', (e) => {
    modalClose(e);
});

cross.addEventListener('click', (e) => {
    modalClose(e);
});

close.addEventListener('click', (e) => {
    modalClose(e);
});

const handleModalOpen = (item) => {
    modal.classList.add('modal--active');

    createModalItem(item);
};

const getDayInfo = (date) => new Date(date).getFullYear();

const handleRadioClick = (e) => {
    const radio = document.querySelectorAll('.modal__fake');

    radio.forEach((el) => {
        if (el.classList.contains('modal__fake--active')) {
            el.classList.remove('modal__fake--active');
        }
    });

    e.target.classList.add('modal__fake--active');
};

const handleCounterClick = (e) => {
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
};

/**
 * Функция для создания элемента с классом и текстом
 *
 * @param {keyof HTMLElementTagNameMap} element - HTML Элемент
 * @param {string | string[]} style - Класс
 * @param {string} [text] - Текст
 * @param {boolean} [isDarkTheme] - Создавать стиль для темной темы
 */
const createCustomElement = (element, style, text, isDarkTheme) => {
    const el = document.createElement(`${element}`);

    if (Array.isArray(style)) {
        style.forEach((cls) => {
            el.classList.add(`${cls}`);
        });
    } else {
        el.classList.add(`${style}`);
    }

    if (isDarkTheme && darkTheme) {
        el.classList.add('theme-dark');
    }

    if (text) {
        el.innerText = text;
    }

    return el;
};

const createModalItem = (item) => {
    const imgWrapper = createCustomElement('div', 'modal__img-wrapper');
    const img = createCustomElement('img', 'modal__img');
    const textWrapper = createCustomElement('div', 'modal__product-text-wrapper');
    const textName = createCustomElement('p', 'modal__product-text', 'Наименование товара');
    const textColor = createCustomElement('p', 'modal__product-text', 'Цвет');
    const textCounter = createCustomElement('p', 'modal__product-text', 'Количество');
    const textPrice = createCustomElement('p', 'modal__product-text', 'Цена');
    const name = createCustomElement('p', 'modal__product-name', '', true);
    const inputWrapper = createCustomElement('div', 'modal__input-wrapper');
    const inputTable = createCustomElement('div', 'modal__input-table');
    const pointerWrapper = createCustomElement('div', 'modal__pointer-wrapper');
    const priceWrapper = createCustomElement('div', 'modal__price-wrapper');

    const counter = createCustomElement('div', 'counter');
    const counterMinus = createCustomElement('button', 'counter__minus', '', true);
    const counterPlus = createCustomElement('button', 'counter__plus', '', true);
    const counterMinusImg = createCustomElement('img', 'counter__minus-img');
    const counterPlusImg = createCustomElement('img', 'counter__plus-img');
    const counterInput = createCustomElement('input', 'counter__input', '', true);

    const price = createCustomElement('p', 'modal__price', '', true);

    // Атрибуты из ITEM
    img.src = item.img;
    img.alt = 'Картинка товара';
    name.innerText = item.name;
    price.innerText = item.cost;

    // Атрибуты для COUNTER INPUT
    counterInput.disabled = true;
    counterInput.value = '1';
    counterInput.name = 'counter';
    counterInput.type = 'text';
    if (darkTheme) {
        counterMinusImg.src = './img/minus-white12.svg';
        counterPlusImg.src = './img/plus-white12.svg';
    } else {
        counterMinusImg.src = './img/minus12.svg';
        counterPlusImg.src = './img/plus12.svg';
    }
    counterMinus.value = 'minus';
    counterPlus.value = 'plus';

    // Генерация
    constructModal.append(imgWrapper);
    imgWrapper.append(img);
    imgWrapper.after(textWrapper);
    textWrapper.append(textName);
    textName.after(name);
    textWrapper.after(inputWrapper);
    inputWrapper.append(textColor);
    textColor.after(inputTable);

    item.color.forEach((color, i) => {
        const inputStyle = createCustomElement('label', 'modal__input-style');
        const radioInput = createCustomElement('input', 'modal__input');
        const radioStyle = createCustomElement('span', 'modal__fake');
        radioInput.type = 'radio';
        radioInput.name = 'color';

        radioStyle.addEventListener('click', handleRadioClick);

        if (i === 0) {
            radioInput.checked = true;
            radioStyle.classList.add('modal__fake--active');
        }
        radioStyle.style = `background-color: ${color}`;

        inputTable.append(inputStyle);
        inputStyle.append(radioInput);
        inputStyle.append(radioStyle);
    });

    inputWrapper.after(pointerWrapper);
    pointerWrapper.append(textCounter);
    pointerWrapper.append(counter);
    counter.append(counterMinus);
    counterMinus.append(counterMinusImg);
    counter.append(counterInput);
    counter.append(counterPlus);
    counterPlus.append(counterPlusImg);

    pointerWrapper.after(priceWrapper);
    priceWrapper.append(textPrice);
    priceWrapper.append(price);

    counterMinus.addEventListener('click', handleCounterClick);
    counterPlus.addEventListener('click', handleCounterClick);
};

const createCategoryItem = (item, parent) => {
    //Инициализация блоков
    const categoryItem = createCustomElement('li', 'category__item');
    const imgWrapper = createCustomElement('div', 'category__img-wrapper');
    const img = createCustomElement('img', 'category__img');
    const date = createCustomElement('p', 'category__date');
    const cost = createCustomElement('p', ['category__cost', 'theme']);
    const name = createCustomElement('p', ['category__name', 'theme']);
    const btn = createCustomElement('button', 'category__btn');

    //Инициализация контента блоков
    date.innerText = getDayInfo(item.date);
    name.innerText = item.name;
    cost.innerText = item.cost;
    btn.innerText = 'Купить';
    img.src = item.img;
    img.alt = 'Картинка товара';

    //Работа с кнопкой
    btn.addEventListener('click', () => handleModalOpen(item));

    //Вставка в HTML документ
    parent.append(categoryItem);
    categoryItem.append(imgWrapper);
    imgWrapper.append(img);
    imgWrapper.after(date);
    date.after(cost);
    cost.after(name);
    name.after(btn);
};

for (let key in initialData) {
    const parent = document.querySelector(`#${key}`);
    initialData[key].forEach((obj) => {
        createCategoryItem(obj, parent);
    });
}
