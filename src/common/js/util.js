/**
 * 解析URL参数
 * @example ?id=1234&a=b
 * @return object {id:1234,a:b}
 */
export function urlParse(){
    let url=window.location.search;
    let obj={};
    //         ?   id   =  12345
    let reg=/[?&][^?&]+=[^?&]+/g;
    let arr=url.match(reg);
    //得出的arr是  ['?id=1234','&a=b']
    if(arr){
        arr.forEach((item) =>{
            let temparr=item.substring(1).split('=');
            let key=decodeURIComponent(temparr[0]);
            let value=decodeURIComponent(temparr[1]);
            obj[key]=value;
        });
    }
    return obj;
}