export default function Payment(options) {
    this.el = options.el;

    let itemsEl = options.itemsEl || options.el.querySelectorAll('.card-payment'),
        items = options.items || new Array();

    itemsEl.forEach((item, index) => {
        items.push({
            id: index,
            title: item.querySelector('.title').textContent,
            isSelected: item.hasAttribute('selected')
        })

        console.log(items)
        item.querySelector('.actions .button--success').addEventListener('click', event => {
            if (item.hasAttribute('selected')) return
            else {
                let eventSelected = new CustomEvent('selected', {
                    bubbles: true,
                    detail: {
                        el: item,
                        index
                    }
                })
    
                item.dispatchEvent(eventSelected)
            }
        })
    })

    this.getAllDeliveries = () => items;
    this.setDeselected = (id) => {
        items[id].isSelected = false;
        itemsEl[id].removeAttribute('selected')
        itemsEl[id].querySelector('.actions .button--success').textContent = 'Выбрать'
    }
    this.setSelected = (id) => {
        items[id].isSelected = true;
        itemsEl[id].setAttribute('selected', '')
        itemsEl[id].querySelector('.actions .button--success').textContent = 'Выбрано'
    }
}