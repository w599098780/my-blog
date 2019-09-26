const express=require('express');
const router=express.Router();
const User=require('../models/User')

router.use((req,res,next)=>{

    if(!req.userInfo.isAdmin){
        res.send('对不起，只有管理员才能进入后台页面')
        return
    }
    next()
})
// 首页
router.get('/',(req,res,next)=>{
    res.render('admin/index',{userInfo:req.userInfo})

})

// 用户管理
router.get('/user',(req,res,next)=>{
    //拿到数据库中所有的用户

    //limit (number):限制获取的数据条数
    //skip(number)：忽略数据的条数
    //要求，每页显示两条

    var page=Number(req.query.page)||1;
    var limit=10
    var skip=(page-1)*limit
    var pages=0

    User.estimatedDocumentCount().then(count=>{
        //page长度限制,计算总页数
        pages=Math.ceil(count/limit)
        page=Math.min(page,pages-1)//如果当前页面小于总页数，取当前页，如果大于取总页数
        //取值不能小于1
        page=Math.max(page,1)
        User.find().limit(limit).skip(skip).then(users=>{
            res.render('admin/user_index',{
                userInfo:req.userInfo,
                users:users,
                page:page,
                count:count,
                pages:pages,
                limit:limit
            })
        })
       
    })
   
   
    
})

//分类首页
router.get('/category',(req,res,next)=>{
    res.render('admin/category_index',{userInfo:req.userInfo})

})

//添加分类
router.get('/category/add',(req,res,next)=>{
    res.render('admin/category_add',{userInfo:req.userInfo})

})

module.exports=router;