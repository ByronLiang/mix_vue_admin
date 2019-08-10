/**
 * 时间戳转换各种格式
 * @param format 格式
 * @param timeStamp 时间戳
 * @return String Date
 */
export default class {
    convertTime(format, t) {
        const timestamp = this.padZeroToEnd(t, 13);
        const time = timestamp ? new Date(timestamp) : new Date();
        const parse = /YY(?:YY)|d{2}|MM|hh|[aA]|[YMDhmsaoic]+|"[^"]*"|'[^']*'/g;
        const masks = {
            default: 'YYYY/MM/DD hh:mm:ss',
        };
        const formatN = format || masks.default;
        const f = {
            YYYY: time.getFullYear(),
            M: time.getMonth() + 1,
            MM: this.pad((time.getMonth() + 1)),
            D: time.getDate(),
            DD: this.pad(time.getDate()),
            h: time.getHours(),
            hh: this.pad(time.getHours()),
            m: time.getMinutes(),
            mm: this.pad(time.getMinutes()),
            s: time.getSeconds(),
            ss: this.pad(time.getSeconds()),

            a: this.pad(parseInt((timestamp / 1000 / 60 / 60 / 24), 10)),
            o: this.pad(parseInt((timestamp / 1000 / 60 / 60) % 24, 10)),
            i: this.pad(parseInt((timestamp / 1000 / 60) % 60, 10)),
            c: this.pad(parseInt((timestamp / 1000) % 60, 10)),

        };
        return formatN.replace(parse, ($0) => f[$0]);
    }

    pad(n) {
        return (Array(2).join('0') + n).slice(-2);
    }

    padZeroToEnd(num, length) {
        return parseInt(`${num}`.padEnd(length, '0'), 10);
    }
}
