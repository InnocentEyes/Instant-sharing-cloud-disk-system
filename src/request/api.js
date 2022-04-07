//将request.js整体导入
import request from './request'
import axios from 'axios';

//---登录注册界面API---

//请求获取手机验证码
export const GetPhoneAPI = (params) => request.get('/getCode', { params });
//请求注册
export const PostRegisterAPI = (params) => request.post('/register', params);
//请求登录
export const PostLoginAPI = (params) => request.post('/login', params);


//----storage界面API----

//改变用户头像
export const PostChangeUserAvatar = (params) => {
    return axios({
        method: 'post',
        url: '/user/header/change',
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
//修改用户信息-提交按钮
export const PostChangeMessageAPI = (params) => request.post('/user/update', params);

//获取所有文件
export const GetAllFileAPI = (params) => request.get('/file/getAll', { params });
//获取所有图片
export const GetAllImgAPI = (params) => request.get('/img/user', { params });
//获取所有视频详细信息
export const GetAllVideoAPI = (params) => request.get('/video/user/get', { params });
//获取所有音乐
export const GetAllMusicAPI = (params) => request.get('/music/user/get', { params });
//获取所有办公文件
export const GetAllDocumentAPI = (params) => request.get('/document/user/get', { params });
//单张图片上传
export const PostSingleImgAPI = (params) => {
    return axios({
        method: 'post',
        url: '/img/single/upload',
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
//多张图片上传
export const PostMultiImgAPI = (params) => {
    return axios({
        method: 'post',
        url: '/img/multi/upload',
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
//单条视频上传
export const PostSingleVideoAPI = (params) => {
    return axios({
        method: 'post',
        url: '/video/single/upload',
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
//多条视频上传
export const PostMultiVideoAPI = (params) => {
    return axios({
        method: 'post',
        url: '/video/multi/upload',
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
//单条音乐上传
export const PostSingleMusicAPI = (params) => {
    return axios({
        method: 'post',
        url: '/music/single/upload',
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
//多条音乐上传
export const PostMultiMusicAPI = (params) => {
    return axios({
        method: 'post',
        url: '/music/multi/upload',
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
//单个文档上传
export const PostSimgleDocumentAPI = (params) =>{
    return axios({
        method: 'post',
        url: '/document/single/upload',
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
//多个文档上传
export const PostMultiDocumentAPI = (params) =>{
    return axios({
        method: 'post',
        url: '/document/single/upload',
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

//----Chart界面API--------

//获取聊天列表
export const GetFriendChartAPI = (params) => request.get('', { params });
//获取好友列表
export const GetFriendListAPI = (params) => request.get('', { params });
//发送好友请求
export const PostFriendRequestAPI =(params) => request.post('', params);
//发送文字
export const PostTextAPI = (params) => request.post('', params);
//获取与该好友的聊天数据
export const GetFriendMessageaAPI = (params) => request.get('', { params });
//获取好友信息列表
export const GetFriendMessageAPI = (params) => request.get('', { params });
//同意该好友请求
export const PostFriendAgreeAPI =(params) => request.post('', params);
//拒绝该好友请求
export const PostFriendRefuseAPI =(params) => request.post('', params);
//清空所有好友消息
export const PostClearMessageAPI = (params) => request.post('', params);


//-----首页界面API-----------
export const GetSearchMessageAPI = (params) => request.get('/file/search', { params });