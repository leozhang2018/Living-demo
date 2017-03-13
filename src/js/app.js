var subtitle = new Vue({
    el: '#subtitle',
    data: {
        message: '现实生活，实时展现'
    }
})

var vm = new Vue({
    el: '.lang-container',
    // 在 `methods` 对象中定义方法
    //初始状态语言为 CN
    data: {
        'on': true,
        'off': false,
        'cn_opacity': false,
        'en_opacity': true
    },
    methods: {
        zh_cn: function(event) {
            // `event` 是原生 DOM 事件
            this.en_opacity = true
            this.cn_opacity = false
            console.log(event.target.className)
            console.log(subtitle.message)
            subtitle.message = '现实生活，实时展现'
            console.log(subtitle.message)
        },
        us_en: function(event) {
            this.en_opacity = false
            this.cn_opacity = true
            console.log(event.target.className)
            console.log(subtitle.message)
            subtitle.message = 'Real life in real-time.'
            console.log(subtitle.message)
        }
    }
})
