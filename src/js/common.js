/*工具函数*/


// 获取 URL 参数
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

//UA 检测
function uaCheck() {
    var ua = navigator.userAgent.toLowerCase();
    var resolution = window.screen;
    var deviceInfo = {
        ua: ua,
        logic_resolution_width: resolution.width,
        logic_resolution: resolution.width + "x" + resolution.height,
        physic_resolution: resolution.width * window.devicePixelRatio,
        webkit: ua.indexOf('applewebkit') !== -1, //webkit
        trident: ua.indexOf('trident') !== -1, //ie
        presto: ua.indexOf('presto') !== -1, //opera
        gecko: ua.indexOf('gecko') !== -1 && ua.indexOf('khtml') == -1, //ff
        ios: !!ua.match(/\(i[^;]+;( u;)? cpu.+mac os x/), //ios
        android: ua.indexOf('android') !== -1 || ua.indexOf('linux') !== -1, //android 或 uc
        mobile: !!ua.match(/applewebkit.*mobile/), //移动终端
        weixin: ua.indexOf('micromessenger') !== -1, //微信
        qq: ua.match(/\sqq/i) == " qq" //QQ
    };
    return deviceInfo;
}

//插件检测
function hasPlugin(name) {
    name = name.toLowerCase();
    for (var i = 0; i < navigator.plugins.length; i++) {
        if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
            return true;
        }
    }
    return false;
}


function hasIEPlugin(name) {
    try {
        new ActiveXObject(name);
        return true;
    } catch (ex) {
        return false;
    }
}


// 检测所有浏览器中 Flash
function hasFlash() {
    // return hasPlugin("Flash") || hasIEPlugin("ShockwaveFlash.ShockwaveFlash");
    var result = hasPlugin("Flash");
    if (!result) {
        result = hasIEPlugin("ShockwaveFlash.ShockwaveFlash");
    }
    return result;
}

// 播放器暂停
function playerPause() {
    vm.styleObject = {
        display: 'block'
    };
    player.pause();
}



// // 后端查询
// function queryBackend(uri, params, retry) {
//     Vue.http.get(uri).then((response) => {
//         // success callback
//         console.log("Ajax 请求成功:")
//         console.log(getAjaxStatus(response));
//         return response.json();
//     }, (response) => {
//         // error callback
//         console.log("Ajax 请求失败");
//         // queryBackend(uri);
//     });
//
// }



/* 调试类函数*/

// ajax status 信息用调试
function getAjaxStatus(response) {
    var response = {
        url: response.url,
        // get status
        status: response.status,
        // get status text
        statusText: response.statusText,
        // get all headers
        headers: response.headers,
        // get 'Expires' header
        expires: response.headers['Expires']
    };
    return response;
}

function debugHLS(player) {
    var hls = player.tech({
        IWillNotUseThisInPlugins: true
    }).hls;
    var playInfo = {
        playlists_master: hls.playlists.master,
        playlists_media: hls.playlists.media,
        bandwidth: hls.bandwidth,

    }

    return playInfo;

}
