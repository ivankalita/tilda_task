export default function Busket(options) {
    this.el = options.el;

    let itemsEl = options.itemsEl || options.el.querySelectorAll('.card-item'),
        items = options.items || new Array();


    fillInBusket();
    function fillInBusket() {
        itemsEl.forEach((item, index) => {
            items.push({
                id: index,
                title: item.querySelector('.title').textContent,
                total: parseFloat(item.querySelector('.total .total-price').textContent)
            })
        })
    }

    itemsEl.forEach((item, index) => {
        item.querySelector('.actions .button--del').addEventListener('click', event => {
            items = items.filter((card, id) => {
                if (id === index) {
                    let eventRemoveItem = new CustomEvent('removeBusketItem', {
                        bubbles: true,
                        detail: {
                            el: item,
                            index
                        }
                    });

                    console.log(event)
                    item.dispatchEvent(eventRemoveItem)
                    return false;

                } else return true;
            })
        })
    })

}