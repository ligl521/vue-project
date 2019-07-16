import {get, post } from '@/api/http'

//国际学校库 学校列表
export const getSchoolLibrary = p => get('/new/school/list.do', p)
    //国际学校库首页 学校搜索
export const getSchoolHomeSearch = p => get('/school/suggest_search.do', p)
    //国际学校库 学校详情页面
export const getSchoolDeatail = p => get('/new/school/detail.do', p)
    //国际学校库首页 行业动态
export const getSchoolHomeInquiry = p => get('/article/list.do', p)
    //国际学校首页 学校城市切换
export const getSchoolCity = p => get('/new/school/list.do', p)
    //微信绑定
export const wechatBind = p => get('/user/WechatBinding.do', p)
    //注册
export const register = p => post('/user/register.do', p)
    //验证是否注册过
export const isRegister = p => post('/user/UserMailCheck.do', p)
    //获取验证码
export const getVerifyCode = p => post('/CommonApi/sendSms.do', p)
    //验证短信验证码
export const checkVerifyCode = p => post('/CommonApi/check_code.do', p)