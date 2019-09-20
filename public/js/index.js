$(function(){
    var $loginBox=$('#loginBox')
    var $registerBox=$('#registerBox')
    $loginBox.find('.colMint').on('click',function(){

        $registerBox.show();
        $loginBox.hide()
    })
    $registerBox.find('.colMint').on('click',function(){
    
        $loginBox.show();
        $registerBox.hide()
    })
})