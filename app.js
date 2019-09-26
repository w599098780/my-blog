const express=require('express')
//加载模板处理模块
const swig=require('swig')
const app=express();
 //记载数据库模块
const mongoose =require('mongoose')
const User=require('./models/User')

//加载body-parser,用来处理post提交的数据
const bodyParser = require('body-parser');
//加载cookies模块
const Cookies=require('cookies')
//bodyParser 配置
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//设置cookie

app.use((req,res,next)=>{
    req.cookies=new Cookies(req,res);
    //解析用户的登录信息
    req.userInfo={}
    if(req.cookies.get('userInfo')){
        try{
            req.userInfo=JSON.parse(req.cookies.get('userInfo'))
            User.findById(req.userInfo.id).then((userInfo)=>{
                req.userInfo.isAdmin=Boolean(userInfo.isAdmin)
                next()
            
            })
         
        }catch(e){
            next()
        }
    }else{
        next()
    }

})

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
        app.listen(8888,()=>{
            console.log('正在监听8888端口')
        })
    }
})

// 用户发送http请求=》url=>解析路由=》找到匹配的规则=》执行指定的绑定函数，返回内容给用户
// public=>静态=》直接读取指定目录下的文件，返回给用户=》动态=》处理业务逻辑，加载模板=》返回数据用户

