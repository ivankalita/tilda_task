import OrderPipline from './scripts/order_pipline';
import Busket from './scripts/busket';
import Delivery from './scripts/delivery';
import Payment from './scripts/payment';
import './scripts/counter';

import './styles/index.styl';
import 'reset-css'

let LAYOUT = document.querySelector('.LAYOUT-APP');
let footer = document.querySelector('footer.footer');


let pipline = new OrderPipline({
    frame: document.querySelector('.body-custom-lenta')
})

let busket = new Busket({
    el: document.querySelector('.row.row--card-items')
})

let delivery = new Delivery({
    el: document.querySelector('.row.row--card-delivery')
})

delivery.el.addEventListener('selected', event => {
    delivery.getAllDeliveries().forEach((item, id) => {
        delivery.setDeselected(id);
        if (id === event.detail.index) {
            delivery.setSelected(id);
        }
    })
})

let payment = new Payment({
    el: document.querySelector('.row.row--card-payment')
})

payment.el.addEventListener('selected', event => {
    payment.getAllDeliveries().forEach((item, id) => {
        payment.setDeselected(id);
        if (id === event.detail.index) {
            payment.setSelected(id);
        }
    })
})

busket.el.addEventListener('removeBusketItem', event => {
    event.detail.el.parentNode.remove();

    let counter = document.getElementById('totalCountItems');

    if (busket.getCountItems() - 1) counter.textContent = busket.getCountItems() - 1;
    else counter.style.display = 'none'
})

let initialFooterOffset = footer.offsetTop;

window.addEventListener('scroll', () => {
    footer.style.top = `${initialFooterOffset + window.pageYOffset}px`
})


document.getElementById('startShoping').addEventListener('click', (event) => {
    document.querySelector('.footer-nav').setAttribute('active', '')
    document.querySelector('.body-start').removeAttribute('active')
    document.querySelector('.body-custom-lenta').setAttribute('active', '')
    document.getElementById('prevPage').classList.remove('hide')
    document.getElementById('nextPage').classList.remove('hide')
    pipline.updatePagesSizes()
})

document.getElementById('prevPage').addEventListener('click', event => {
    if (pipline.getCurrentPage()) pipline.setCurrentPage(pipline.getCurrentPage() - 1)
    pipline.updatePagesSizes()
})

document.getElementById('nextPage').addEventListener('click', event => {
    let counter = document.getElementById('totalCountItems');

    if (pipline.getCurrentPage() === pipline.getCountPages() - 2) {
        document.getElementById('nextPage').textContent = 'Готово';
        document.getElementById('nextPage').setAttribute('finished', '')
        pipline.setCurrentPage(3)
        pipline.updatePagesSizes()
        return
    }

    console.log(pipline.getCurrentPage(), pipline.getCountPages())

    if (event.target.hasAttribute('finished')) {
        document.querySelector('.body-custom-lenta').removeAttribute('active')
        document.querySelector('.body-finished').setAttribute('active', '')
        document.querySelector('.footer-nav').removeAttribute('active')
        document.querySelector('.footer-finished').setAttribute('active', '')
        counter.style.display = 'none'
        document.getElementById('prevPage').classList.add('hide');
        document.getElementById('nextPage').textContent = 'К покупкам';
        document.getElementById('nextPage').removeAttribute('finished')
        document.getElementById('nextPage').setAttribute('reset', '')
    } else if (event.target.hasAttribute('reset')) {
        document.querySelector('.body-finished').removeAttribute('active')
        document.querySelector('.body-custom-lenta').setAttribute('active', '')
        document.querySelector('.footer-finished').removeAttribute('active')
        document.querySelector('.footer-nav').setAttribute('active', '')
        pipline.setCurrentPage(0);

        counter.textContent = busket.getCountItems()
        counter.style.display = 'inline-block'

        document.getElementById('prevPage').classList.remove('hide');
        document.getElementById('nextPage').textContent = 'Далее';
        document.getElementById('nextPage').removeAttribute('reset')
    }
    else if (pipline.getCurrentPage() < pipline.getCountPages()) {
        pipline.setCurrentPage(pipline.getCurrentPage() + 1)
    }
    pipline.updatePagesSizes()
})


footer.addEventListener('changePage', event => {
    if (event.detail.to === pipline.getCountPages() - 1) {
        document.getElementById('nextPage').textContent = 'Готово';
        document.getElementById('nextPage').setAttribute('finished', '')
    }
    else {
        document.getElementById('nextPage').textContent = 'Далее';
        document.getElementById('nextPage').removeAttribute('finished');
    }
})

