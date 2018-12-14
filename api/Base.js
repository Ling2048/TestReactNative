var BaseUrl = 'http://192.168.1.162/AppService/AppWebService.asmx/';
var BaseMVCUrl = 'http://192.168.1.162/SMIAO/maxapi/';

var Post = (action, body, callBack) => {
    //console.warn(BaseUrl + action);
    //console.warn(formData);
    //action = 'HelloWorld';
    fetch(BaseUrl + action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    })
    .then((res)=>{
        return res.json();
    })
    .then((res)=>{
        callBack(res);
    }).catch((s) => {
        console.error(s);
    })
}

var PostMVC = (action, body, callBack) => {
    fetch(BaseMVCUrl + action, {
        method: 'POST',
        headers: {},
        body: body
    })
    .then((res)=>{
        return res.json();
    })
    .then((res)=>{
        callBack(res);
    }).catch((s) => {
        console.error(s);
    })
}

export { Post, PostMVC }