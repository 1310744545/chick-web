import axios from 'utils/axios'
import {Message} from 'element-ui'
import router from '../router'


//相应拦截器
axios.interceptors.response.use(success=>{
    //业务逻辑错误
    if (success.status && success.status == 200){
        if (success.data.status == 404 || success.data.status == 403 || success.data.status == 401 ){
            Message.error({message:success.data.message});
        }
        if (success.data.message){
            Message.success({message:success.data.message});
        }
    }
    return success.data;
}, error => {
    if (error.response.code == 504 || error.response.code == 504){
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


let base = '';

//传送json格式的post请求
export const postRequest = (url, params) =>{
    return axios({
        method:'post',
        url:`${base}${url}`,
        data:params
    })
}
