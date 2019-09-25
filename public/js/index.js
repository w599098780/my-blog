$(function(){
    var $loginBox=$('#loginBox')
    var $registerBox=$('#registerBox')
    var $userInfo=$('#userInfo')
    $loginBox.find('.colMint').on('click',function(){
        $registerBox.show();
        $loginBox.hide()
    })
    $registerBox.find('.colMint').on('click',function(){
    
        $loginBox.show();
        $registerBox.hide()
    })
     //注册
    $registerBox.find('button').on('click',function(){ 
        $.ajax({
            type:'post',
            url:'api/user/register',
            data:{
                username: $registerBox.find('[name=username]').val(),
                password:$registerBox.find('[name=password]').val(),
                repassword:$registerBox.find('[name=repassword]').val(),
            },
            dataType:'json',
            success:(res)=>{
                console.log(res)
                $registerBox.find('.colWarning').html(res.message)
                if(res.code===0){
                     setTimeout(()=>{
                        $loginBox.show();
                        $registerBox.hide()
                    },1000)
                }
               
            }

        })
      
    })

    //登录
    $loginBox.find('button').on('click',function(){
        $.ajax({
            type:'post',
            url:'api/user/login',
            data:{
                username:$loginBox.find('[name=username]').val(),
                password:$loginBox.find('[name=password]').val()
            },
            dataType:'json',
            success:(res)=>{
                console.log(res)
                if(res.code===0){
                    window.location.reload()
                
                }else{
                    alert(res.message)
                }
            }
        })
    })

    //退出
    $('.logout').on('click',function(){
    
        $.ajax({
            url:'/api/user/logout',
            success:function(res){
                if(!res.code){
                    window.location.reload()
                }

            }
        })
    })
})