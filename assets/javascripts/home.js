$(function(){
    if(!Cookies.get('loggedin')){
        $("body").html('');
        window.location.href = window.location.origin;
    }else{
        $("body").show();
    }

    $("body").on("click", "#logout", function(e){
        Cookies.remove('loggedin');
        window.location.href = window.location.origin;
    });
})