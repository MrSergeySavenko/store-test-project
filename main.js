const modal = document.querySelector('.modal');

modal.addEventListener('click', (e) => {
    e.target.classList.remove('modal--active');
});

const handleModalOpen = (item) => {
    modal.classList.add('modal--active');

    // createModalItem(item);
};

const getDayInfo = (date) => new Date(date).getFullYear();

const createModalItem = (item) => {
    const imgWrapper = document.createElement('div');
    const img = document.createElement('img');
    const cost = document.createElement('p');
    const name = document.createElement('p');
    const comment = document.createElement('input');
    const sunbim = document.createElement('input');
    const close = document.createElement('button');

    img.src = item.img;
    img.alt = 'Картинка товара';

    modal.append(imgWrapper);
    imgWrapper.append(img);
    imgWrapper.after(name);
};

const createCategoryItem = (item, parent) => {
    //Инициализация блоков
    const categoryItem = document.createElement('li');
    const imgWrapper = document.createElement('div');
    const img = document.createElement('img');
    const date = document.createElement('p');
    const cost = document.createElement('p');
    const name = document.createElement('p');
    const btn = document.createElement('button');

    //Инициализация контента блоков
    date.innerText = getDayInfo(item.date);
    name.innerText = item.name;
    cost.innerText = item.cost;
    btn.innerText = 'Купить';
    img.src = item.img;
    img.alt = 'Картинка товара';

    //Инициализация стилей
    date.classList.add('category__date');
    name.classList.add('category__name');
    cost.classList.add('category__cost');
    btn.classList.add('category__btn');
    img.classList.add('category__img');
    imgWrapper.classList.add('category__img-wrapper');
    categoryItem.classList.add('category__item');

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
