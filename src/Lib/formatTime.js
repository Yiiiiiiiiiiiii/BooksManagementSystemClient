import Moment from 'moment';
Moment.locale('zh-cn');

export function formatDay(time) {
    return Moment(time).format('YYYY年MM月DD日');
}
export function formatMonthDay(time) {
    return Moment(time).format('MM月DD日');
}
export function formatYMD(time) {
    return Moment(time).format('YYYY-MM-DD');
}
export function formatYMDHMS(time) {
    return Moment(time).format('YYYY-MM-DD HH:SS:MM');
}
export function formatYM(time) {
    return Moment(time).format('YYYY-MM');
}
export function formatYear(time) {
    return Moment(time).format('YYYY');
}

export function formatMonth(time) {
    return Moment(time).format('MM');
}

export function formatCircle(time) {
    return Moment(time).format('YYYY.MM.DD');
}

// 本月最后一天
export function formatMounthEnd(fmt = 'YYYY-MM-DD') {
    return Moment()
        .endOf('month')
        .format(fmt);
}

// 上月第一天
export function formatLastMounth(fmt = 'YYYY-MM-DD') {
    return Moment()
        .subtract(1, 'month')
        .startOf('month')
        .format(fmt);
}

// 去年第一天
export function formatLastYear(fmt = 'YYYY-MM-DD') {
    return Moment()
        .subtract(1, 'years')
        .startOf('years')
        .format(fmt);
}

export function formatWeek(date) {
    let week = Moment(date).day();
    switch (week) {
        case 1:
            return '星期一';
        case 2:
            return '星期二';
        case 3:
            return '星期三';
        case 4:
            return '星期四';
        case 5:
            return '星期五';
        case 6:
            return '星期六';
        case 0:
            return '星期日';
    }
}

