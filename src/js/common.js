//工具函数
function getUrlParams(url) {
    if (!url) {
        url = window.location.href;
        // console.log(url);
    }
    var arrUrl = url.split('?');
    if (typeof(arrUrl[1]) == 'string') {
        var u = arrUrl[1].split('&');
        var get = {};
        for (var i in u) {
            var j = u[i].split('=');
            get[decodeURIComponent(j[0])] = decodeURIComponent(j[1]);
        }
        // console.log(get);
        return get;
    } else {
        return {};
    }
}
