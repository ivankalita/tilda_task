export default function Busket(options) {
    this.el = options.el;

    let itemsEl = options.itemsEl || options.el.querySelectorAll('.card-item'),
        items = options.items || new Array();


    fillInBusket();
    function fillInBusket() {
        itemsEl.forEach((item, index) => {
            items.push({
                uniqID: item.querySelector('.descr-item[articul]').textContent,
                title: item.querySelector('.title').textContent,
                total: parseFloat(item.querySelector('.total .total-price').textContent)
            })
        })
    }

    itemsEl.forEach((item, index) => {
        // Удаление из корзины
        item.querySelector('.actions .button--del').addEventListener('click', event => {
            items = items.filter(card => {
                if (card.uniqID === item.querySelector('.descr-item[articul]').textContent) {
                    let eventRemoveItem = new CustomEvent('removeBusketItem', {
                        bubbles: true,
                        detail: {
                            el: item,
                            index
                        }
                    });

                    item.dispatchEvent(eventRemoveItem)
                    return false;

                } else return true;
            })
        })

        // 
    })

    this.getCountItems = () => items.length;

}