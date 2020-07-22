export function formatDate(date,fmt){
    if(/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1,(date.getFullYear().toString()).substr(4-RegExp.$1.length));

    }
    let o = {
        'M+': date.getMonth() +1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for(let k in o) {
        if(new RegExp(`(${k})`).test(fmt)){
            let str = o[k].toString();
            fmt =fmt.replace(RegExp.$1,((RegExp.$1.length === 1)?str:padleftzero(str)))
        }
    }
    return fmt;
};
function padleftzero(str){
    return ('00'+str).substr(str.length);
}