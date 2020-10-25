export default function OrderPipline(options) {
    let frame = options.frame,
        el = frame.querySelector('.order-pipline'),
        name = options.name || el.getAttribute('order-pip'),
        pages = el.querySelectorAll('.page-block'),
        nav = document.querySelector(`.pagination-proccess[order-pip=${name}]`),
        navItems = nav.querySelectorAll('.pagination-proccess__item');

    let frameSize = frame.getBoundingClientRect();


    function calcWidthPage() {

        console.log(nav)

        pages.forEach(page => {
            page.style.width = frameSize.width + 'px'
            
        });

        el.style.width = pages.length * frameSize.width + 'px'
    }

    nav.addEventListener('click', event => {
        navItems.forEach((item, index) => {
            if (item == event.target) {
                item.classList.add('active');
                el.style.marginLeft = `-${frameSize.width * index}px`
            }
            else item.classList.remove('active')
        })
        
    })

    calcWidthPage()
}