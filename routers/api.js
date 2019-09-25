const express=require('express');
const router=express.Router();
const User=require('../models/User')

// 用户注册
// 1.用户不能为空
// 2.密码不能为空
// 3.两次数据密码必须一致

// 1.用户是否已经被注册

//返回统一格式
var responseData;
router.use(function(req,res,next){
    responseData={
        code:0,
        message:''
    }
    next()
})
//用户注册
router.post('/user/register',(req,res)=>{
    var username=req.body.username
    var password=req.body.password
    var repassword=req.body.repassword
    if(!username){
        responseData.code=1;
        responseData.message='用户名不能为空'
        res.json(responseData)
        return false
    }
    if(!password){
        responseData.code=2;
        responseData.message='密码不能为空'
        res.json(responseData)
        return false
    }
    if(repassword!=password){
        responseData.code=3;
        responseData.message='两次输入的密码不一致'
        res.json(responseData)
        return false
    }
    //用户名是否已经被注册了，如果数据库中已经存在和我们要注册的用户名同名的数据，表示用户名已经被注册了

    User.findOne({username:username}).then((userInfo)=>{
        if(userInfo){
            responseData.code=4;
            responseData.message='用户名已被注册'
            res.json(responseData)
            return false
        }
        //保存用户的信息到数据库中
        var user=new User({
            username:username,
            password:password
        });
        return user.save()
    }).then((newUserInfo)=>{
        console.log(newUserInfo)
        responseData.message='注册成功'
        res.json(responseData)
      

    })

})

//用户登录
router.post('/user/login',(req,res)=>{
    var username=req.body.username
    var password=req.body.password
    if(username=='' || password==''){
        responseData.code=1;
        responseData.message='用户名/密码不能为空'
        res.json(responseData)
        return false
    }
    User.findOne({username:username,password:password}).then((userInfo)=>{
        if(userInfo){
            responseData.code=0;
            responseData.message='登录成功'
            responseData.userInfo={
                id:userInfo._id,
                username:userInfo.username
            }
            req.cookies.set('userInfo',JSON.stringify({
                id:userInfo._id,
                username:userInfo.username
            }))
            res.json(responseData)
        }else{
            responseData.code=1;
            responseData.message='用户名/密码错误'
            res.json(responseData) 
        }
    })


})
//退出
router.get('/user/logout',(req,res)=>{
    req.cookies.set('userInfo',null)
    responseData.message='退出成功'
    res.json(responseData)
})

module.exports=router;