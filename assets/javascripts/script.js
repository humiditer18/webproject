var l = Lockr;
l.prefix = 'nad';
jQuery.fn.putCursorAtEnd = function() {
    return this.each(function() {
        if (this.setSelectionRange) {
            var len = $(this).val().length * 2;
            this.setSelectionRange(len, len);
        } else {
            $(this).val($(this).val());
        }
    });
}

$(function(){
    if(Cookies.get('loggedin')){
        window.location.href = window.location.origin + '/home';
    }
    var $form_modal = $('.user-modal'),
    $form_login = $form_modal.find('#login'),
    $form_signup = $form_modal.find('#signup'),
    $form_forgot_password = $form_modal.find('#reset-password'),
    $form_modal_tab = $('.switcher'),
    $tab_login = $form_modal_tab.children('li').eq(0).children('a'),
    $tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
    $forgot_password_link = $form_login.find('.form-bottom-message a'),
    $back_to_login_link = $form_forgot_password.find('.form-bottom-message a'),
    $main_nav = $('.main-nav');
    
    //open modal
    $main_nav.on('click', function(event){
        
        if( $(event.target).is($main_nav) ) {
            // on mobile open the submenu
            $(this).children('ul').toggleClass('is-visible');
        } else {
            // on mobile close submenu
            $main_nav.children('ul').removeClass('is-visible');
            //show modal layer
            $form_modal.addClass('is-visible'); 
            //show the selected form
            ( $(event.target).is('.signup') ) ? signup_selected() : login_selected();
        }
        
    });
    
    //close modal
    $('.user-modal').on('click', function(event){
        if( $(event.target).is($form_modal) || $(event.target).is('.close-form') ) {
            $form_modal.removeClass('is-visible');
        } 
    });
    //close modal when clicking the esc keyboard button
    $(document).keyup(function(event){
        if(event.which=='27'){
            $form_modal.removeClass('is-visible');
        }
    });
    
    //switch from a tab to another
    $form_modal_tab.on('click', function(event) {
        event.preventDefault();
        ( $(event.target).is( $tab_login ) ) ? login_selected() : signup_selected();
    });
    
    //hide or show password
    $('.hide-password').on('click', function(){
        var $this= $(this),
        $password_field = $this.prev('input');
        
        ( 'password' == $password_field.attr('type') ) ? $password_field.attr('type', 'text') : $password_field.attr('type', 'password');
        ( 'Afficher' == $this.text() ) ? $this.text('Masquer') : $this.text('Afficher');
        $password_field.putCursorAtEnd();
    });
    
    $back_to_login_link.on('click', function(event){
        event.preventDefault();
        login_selected();
    });
    
    function login_selected(){
        $form_login.addClass('is-selected');
        $form_signup.removeClass('is-selected');
        $form_forgot_password.removeClass('is-selected');
        $tab_login.addClass('selected');
        $tab_signup.removeClass('selected');
    }
    
    function signup_selected(){
        $form_login.removeClass('is-selected');
        $form_signup.addClass('is-selected');
        $form_forgot_password.removeClass('is-selected');
        $tab_login.removeClass('selected');
        $tab_signup.addClass('selected');
    }
    
    $("body").on("submit", "#signup_form", function(e){
        var username = $("#signup-username");
        var password = $("#signup-password");
        var signup_error = $("#signup_error");
        var overlay = $('<div class="overlay"><img src="images/loader.gif" /></div>').appendTo(this);
        setTimeout(function(){
            if(l.get(username.val())){
                signup_error.show();
                overlay.hide();
                return false;
            }
            signup_error.hide();
            l.set(username.val(), password.val());
            overlay.find("img").attr("src", "/images/checkmark.png");
            username.val('');
            password.val('');
            setTimeout(function(){
                overlay.fadeOut("normal", function(){
                    login_selected();
                    $("#signin-username").focus();
                });
            }, 400)
        }, 500)

        e.preventDefault();
    });
    
    $("body").on("submit", "#signin_form", function(e){
        var username = $("#signin-username");
        var password = $("#signin-password");
        var signin_error = $("#signin_error");
        var overlay = $('<div class="overlay"><img src="images/loader.gif" /></div>').appendTo(this);
        
        setTimeout(function(){
            if(!l.get(username.val())){
                signin_error.show();
                overlay.remove();
                return false;
            }
            Cookies.set('loggedin', username.val(), { expires: 2 })
            signin_error.hide();
            setTimeout(function(){
                overlay.remove();
                window.location.href = window.location.origin + '/home';
            }, 200)
        }, 500);

        e.preventDefault();
    });
    
});