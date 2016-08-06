function slideDownStep1(dist) {
    var header = document.getElementById("app_info");
    header.style.display = "block";
    // header.style.height = 50 - parseInt(dist) + "px";
    header.style.maxHeight = "15%";
    header.style.height = "15%";
}

function slideUp(dist) {
    var header = document.getElementById("app_info");
    // header.style.display = "none";
    header.style.maxHeight = "0";
    header.style.height = "0";
}

function touchListener(contentId, way) {
    var _start = 0,
        _end = 0,
        _content = document.getElementById(contentId);
    _content.addEventListener("touchstart", touchStart, false);
    _content.addEventListener("touchmove", touchMove, false);
    _content.addEventListener("touchend", touchEnd, false);

    function touchStart(event) {
        console.log("touchstart" + "方式:" + way);
        //第一个触点
        console.log(event.touches[0]);
        //触点数目
        console.log(event.touches.length);
        event.preventDefault();
        if (!event.touches.length) return;
        var touch = event.touches[0];
        if (way == "x") {
            _start = touch.pageX;
        } else {
            _start = touch.pageY;
        }
    }

    function touchMove(event) {
        event.preventDefault();
        if (!event.touches.length) return;
        var touch = event.touches[0];

        if (way == "x") {
            _end = (_start - touch.pageX);
        } else {
            _end = (_start - touch.pageY);
            console.log(_end);
            if (_end < 0) {
                slideDownStep1(_end);
            }
            if (_end > 0) {
                console.log("UPUPUP");
                slideUp(_end);
            }
        }
    }
    //
    function touchEnd(event) {
        if (_end > 0) {
            //左滑或上滑
            console.log("结束啦: 左或者上滑");
        } else {
            console.log("结束啦: 右或者下滑");
            // slideDownStep2();
        } //右滑下滑
    }
}
