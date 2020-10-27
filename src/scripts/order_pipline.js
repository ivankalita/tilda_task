export default function OrderPipline(options) {
    let frame = options.frame,
        el = frame.querySelector('.order-pipline'),
        name = options.name || el.getAttribute('order-pip'),
        pages = el.querySelectorAll('.page-block'),
        nav = document.querySelector(`.pagination-proccess[order-pip=${name}]`),
        navItems = nav.querySelectorAll('.pagination-proccess__item'),
        currentPage = 0;

    calcPageSizes();
    function calcPageSizes() {
        let frameSize = frame.getBoundingClientRect();

        pages.forEach((page, index) => {
            page.style.width = frameSize.width + 'px'

            console.log(frameSize.width)
            if (currentPage !== index) page.querySelector('.page-block__body').classList.remove('active')
            else page.querySelector('.page-block__body').classList.add('active');
        });

        el.style.width = pages.length * frameSize.width + 'px'
    }

    window.addEventListener('resize', calcPageSizes)

    nav.addEventListener('click', event => {
        let frameSize = frame.getBoundingClientRect();

        navItems.forEach((item, index) => {
            if (item == event.target) {
                item.classList.add('active');

                let eventChangePage = new CustomEvent('changePage', {
                    bubbles: true,
                    detail: {
                        from: currentPage,
                        to: index
                    }
                })

                currentPage = index;
                calcPageSizes()
                el.style.marginLeft = `-${frameSize.width * index}px`;
                item.dispatchEvent(eventChangePage);
            }
            else item.classList.remove('active')
        })
        
    })

    this.getCountPages = () => pages.length;
    this.getCurrentPage = () => currentPage;
    this.setCurrentPage = id => {
        let frameSize = frame.getBoundingClientRect();

        if (id >= 0 && id < pages.length) {
            nav.querySelectorAll('.pagination-proccess__item')[currentPage].classList.remove('active')
            currentPage = id;
            el.style.marginLeft = `-${frameSize.width * currentPage}px`
            nav.querySelectorAll('.pagination-proccess__item')[currentPage].classList.add('active')
        }
    }
    this.updatePagesSizes = calcPageSizes
}