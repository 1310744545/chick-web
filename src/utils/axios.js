import axios from 'axios'
import {Message} from 'element-ui'
import router from '../router'

//请求拦截器
axios.interceptors.request.use(config=>{
    //如果请求中存在token,后面请求携带token
    if (window.localStorage.getItem('token')!== null){
        config.headers['Authorization'] = window.localStorage.getItem('token');
    }
    return config;
},error => {
    console.log(error);
})

//相应拦截器
axios.interceptors.response.use(success=>{
    //业务逻辑错误
    if (success.status && success.status == 200){
        if (success.data.code == 401){
            Message.error({message:success.data.msg});
            router.replace('/login')
        }
        if (success.data.code == 1 || success.data.code == 403){
            Message.error({message:success.data.msg});
        }
        if (success.data.code == 0){
            Message.success({message:success.data.msg});
        }
    }
    return success.data;
}, error => {
    //这里是备用 400+ 500+ 都在上边处理
    if (error.response.code == 504){
        Message.error({message:"服务器被吃了"});
    } else if (error.response.code == 403){
        Message.error({message:"权限不足"});
        //跳转到开通vip页面
    } else if (error.response.code == 401){
        Message.error({message:"尚未登陆,请先登录"});
        router.replace('/login')
    } else {
        if (error.response.data.message){
            Message.error({message:error.response.data.message});
        } else {
            Message.error({message:"未知错误!请联系站长"});
        }
    }
    return;
});


//请求
let base = '';
//传送json格式的post请求
export const postRequest = (url, params) =>{
    return axios({
        method:'post',
        url:`${base}${url}`,
        data:params
    })
};

//传送json格式的get请求
export const getRequest = (url, params) =>{
    return axios({
        method:'get',
        url:`${base}${url}`,
        data:params
    })
};

//传送json格式的put请求
export const putRequest = (url, params) =>{
    return axios({
        method:'put',
        url:`${base}${url}`,
        data:params
    })
}

//传送json格式的delete请求
export const deleteRequest = (url, params) =>{
    return axios({
        method:'delete',
        url:`${base}${url}`,
        data:params
    })
}
