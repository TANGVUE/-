(function () {
    var wrap = document.getElementsByClassName('tzc-swiper-box')[0];
    var swiper = document.getElementsByClassName('tzc-swiper');
    var length = swiper.length;
    var index = 0;
    var pageWidth = document.documentElement.clientWidth;

    // 给每个轮播图添加z-index;

    for (var i = 0; i < length; i++) {
        swiper[i].style.zIndex = length - i;
    }




    // 滑动事件
    wrap.ontouchstart = function (e) {
        var startX = e.targetTouches[0].clientX;
        var moveX;

        this.ontouchmove = getMoveX;

        function getMoveX(e) {
            moveX = e.changedTouches[0].clientX;
        }

        this.ontouchend = move;

        function move() {
            if (startX > moveX) {
                // 左

                if (index != length - 1) {
                    swiper[index + 1].style.transform = 'translate(' + pageWidth + 'px,0)';
                    swiper[index].setAttribute('class', 'tzc-swiper active');
                    swiper[index + 1].setAttribute('class', 'tzc-swiper active');
                    moveLeft(index);
                    moveLeft(index + 1);
                    index++;
                } else {
                    // 特殊情况：最后一个
                    swiper[0].style.transform = 'translate(' + pageWidth + 'px,0)';
                    swiper[0].setAttribute('class', 'tzc-swiper active');
                    swiper[index].setAttribute('class', 'tzc-swiper active');
                    moveLeft(index);
                    moveLeft(0);
                    index = 0;
                }

            } else {
                // 右

                if (index != 0) {
                    swiper[index - 1].style.transform = 'translate(' + (-pageWidth) + 'px,0)';
                    swiper[index - 1].setAttribute('class', 'tzc-swiper active');
                    swiper[index].setAttribute('class', 'tzc-swiper active');
                    moveRight(index);
                    moveRight(index - 1);
                    index--;
                } else {
                    // 特殊情况：第一个
                    swiper[length - 1].style.transform = 'translate(' + (-pageWidth) + 'px,0)';
                    swiper[length - 1].setAttribute('class', 'tzc-swiper active');
                    swiper[index].setAttribute('class', 'tzc-swiper active');
                    moveRight(index);
                    moveRight(length - 1);
                    index = length - 1;
                }

            }
            this.removeEventListener('touchmove', getMoveX);
        }
    }

    // 定时轮播
    setInterval(function () {
        if (index != length - 1) {
            swiper[index + 1].style.transform = 'translate(' + pageWidth + 'px,0)';
            swiper[index].setAttribute('class', 'tzc-swiper active');
            swiper[index + 1].setAttribute('class', 'tzc-swiper active');
            moveLeft(index);
            moveLeft(index + 1);
            index++;
        } else {
            // 特殊情况：最后一个
            swiper[0].style.transform = 'translate(' + pageWidth + 'px,0)';
            swiper[0].setAttribute('class', 'tzc-swiper active');
            swiper[index].setAttribute('class', 'tzc-swiper active');
            moveLeft(index);
            moveLeft(0);
            index = 0;
        }
    }, 4000);

    // 获取元素当前移动位置
    function getTransformX(elm) {
        var transStr = window.getComputedStyle(elm).transform;
        var transArr = transStr.split(',');
        return parseFloat(transArr[transArr.length - 2]);
    }

    // 左移
    function moveLeft(i) {
        var transX = getTransformX(swiper[i]);
        var timer;
        var x = transX;
        timer = setInterval(function () {
            x -= (pageWidth / 400) * 10;
            swiper[i].style.transform = 'translate(' + x + 'px,0)';
            if (x <= transX - pageWidth) {
                if (i != index) {
                    swiper[i].setAttribute('class', 'tzc-swiper');
                    swiper[i].style.transform = 'translate(0,0)';
                }
                clearInterval(timer);
            }
        }, 10)
    }


    // 右移
    function moveRight(i) {
        var transX = getTransformX(swiper[i]);
        var timer;
        var x = transX;
        timer = setInterval(function () {
            x += (pageWidth / 400) * 10;
            swiper[i].style.transform = 'translate(' + x + 'px,0)';
            if (x >= transX + pageWidth) {
                if (i != index) {
                    swiper[i].setAttribute('class', 'tzc-swiper');
                    swiper[i].style.transform = 'translate(0,0)';
                }
                clearInterval(timer);
            }
        }, 10)

    }

}())