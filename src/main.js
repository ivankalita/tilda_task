import OrderPipline from './scripts/order_pipline';
import Busket from './scripts/busket';
import Delivery from './scripts/delivery';
import Payment from './scripts/payment';


import './styles/index.styl';
import 'reset-css'

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

    let counter = document.getElementById('totalCountItems').textContent;

    document.getElementById('totalCountItems').textContent = +counter - 1;
})

document.querySelector('.footer-act--prev').addEventListener('click', event => {
    if (pipline.getCurrentPage()) pipline.setCurrentPage(pipline.getCurrentPage() - 1)
})

document.querySelector('.footer-act--next').addEventListener('click', event => {
    if (pipline.getCurrentPage() < pipline.getCountPages()) pipline.setCurrentPage(pipline.getCurrentPage() + 1)
    else if (pipline.getCurrentPage() === pipline.getCountPages() - 1) event.target.closest('button').textContent = 'Готово'
})