export default function OrderPipline(options) {
    let frame = options.frame,
        el = frame.querySelector('.order-pipline'),
        name = options.name || el.getAttribute('order-pip'),
        pages = el.querySelectorAll('.page-block'),
        nav = document.querySelector(`.pagination-proccess[order-pip=${name}]`),
        navItems = nav.querySelectorAll('.pagination-proccess__item'),
        isAnimationScroll = false,
        currentPage = 0;


    function calcWidthPage() {
        let frameSize = frame.getBoundingClientRect();

        pages.forEach(page => {
            page.style.width = frameSize.width + 'px'
            
        });

        el.style.width = pages.length * frameSize.width + 'px'
    }

    window.addEventListener('resize', calcWidthPage)

    el.addEventListener('mousewheel', event => {
        if (!isAnimationScroll) {
            isAnimationScroll = true;

            let pageBlock = event.target.closest('.page-block[current-offset]'),
                currentOffset = +pageBlock.getAttribute('current-offset'),
                currentMargin = parseInt(getComputedStyle(pageBlock).marginTop),
                diff = pageBlock.getBoundingClientRect().height - frame.getBoundingClientRect().height;
    
            if (event.wheelDelta > 0 && currentMargin < 0) {
                console.log(event.wheelDelta)
                pageBlock.style.marginTop = `${currentMargin + event.wheelDelta}px`
                pageBlock.setAttribute('current-offset', currentOffset + event.wheelDelta)
    
            } else if (event.wheelDelta < 0 && diff > Math.abs(currentOffset)) {
                if (diff - Math.abs(currentOffset) > Math.abs(event.wheelDelta)) {
                    pageBlock.style.marginTop = `${currentMargin + event.wheelDelta}px`;
                    pageBlock.setAttribute('current-offset', currentOffset + event.wheelDelta)
                } else {
                    pageBlock.style.marginTop = `${currentMargin - (diff - Math.abs(currentOffset))}px`;
                    pageBlock.setAttribute('current-offset', currentOffset - (diff - Math.abs(currentOffset)))
                }
            }

            setTimeout(() => isAnimationScroll = false, 500)
        }
        
    })

    nav.addEventListener('click', event => {
        let frameSize = frame.getBoundingClientRect();

        navItems.forEach((item, index) => {
            if (item == event.target) {
                item.classList.add('active');
                currentPage = index;
                el.style.marginLeft = `-${frameSize.width * index}px`
            }
            else item.classList.remove('active')
        })
        
    })

    calcWidthPage();

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
}