import OrderPipline from './scripts/order_pipline';
import './styles/index.styl';
import 'reset-css'

let temp = new OrderPipline({
    frame: document.querySelector('.body-custom-lenta')
})

document.querySelector('.footer-act--prev').addEventListener('click', event => {
    if (temp.getCurrentPage()) temp.setCurrentPage(temp.getCurrentPage() - 1)
})

document.querySelector('.footer-act--next').addEventListener('click', event => {
    if (temp.getCurrentPage() < temp.getCountPages()) temp.setCurrentPage(temp.getCurrentPage() + 1)
})