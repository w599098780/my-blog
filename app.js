const express=require('express')
//加载模板处理模块
const swig=require('swig')
const app=express();
 //记载数据库模块
const mongoose =require('mongoose')

//设置静态文件托管
app.use('/public',express.static(__dirname+'/public'));

//配置应用模板
//定义当前应用多使用的模板引擎
//第一个参数：模板引擎的名称，同时也是模板文件的后缀，第二个参数表示用于解析处理模板内容的方法
app.engine('html',swig.renderFile)
app.set('views','./views')
//注册所使用的模板引擎，第一个参数必须是view engine，第二个参数和app.engine第一个参数保持一致
app.set('view engine','html')

//开发过程中，取消缓存
swig.setDefaults({cache:false})


// req request对象
// res response对象
// next 函数

// app.get('/',function(req,res,next){
//     // res.send('<h1>欢迎光临我的博客</h1>')
//     //读取views目录下的指定文件，解析并返回给客户端
//     //第一个参数表示模板文件，第二个参数：传递给模板使用的数据
//     res.render('index')
// })


//根据不同的功能划分模块
 app.use('/admin',require('./routers/admin'));
 app.use('/api',require('./routers/api'));
 app.use('/',require('./routers/main'));
//  mongodb
//监听http
mongoose.connect('mongodb://localhost:27018/blog',(err)=>{
    if(err){
        console.log('数据库连接失败')
    }else{
        console.log('数据库连接成功')
        app.listen(9000)
    }
})

// 用户发送http请求=》url=>解析路由=》找到匹配的规则=》执行指定的绑定函数，返回内容给用户
// public=>静态=》直接读取指定目录下的文件，返回给用户=》动态=》处理业务逻辑，加载模板=》返回数据用户

