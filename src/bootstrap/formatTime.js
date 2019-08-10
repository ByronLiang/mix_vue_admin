import Vue from 'vue';

// 时间戳转换
Vue.filter('formatTime', (val) => {
    const time = val < 1000000000000 ? new Date(val * 1000) : new Date(val);
    function timeAdd0(str) {
        if (str < 10) {
            str = `0${str}`;
        }
        return str;
    }
    const y = time.getFullYear();
    const m = time.getMonth() + 1;
    const d = time.getDate();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();
    const result = `${[y, m, d].map(timeAdd0).join('-')} ${[hour, minute, second].map(timeAdd0).join(':')}`;
    return result;
});
