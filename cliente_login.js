$(document).ready(function()
{


    var isWebkit = 'WebkitAppearance' in document.documentElement.style;


    if(isWebkit) {
    
        $({ A : 0 }).animate({ A : 250 },{ step : function(A){
            var dA = 50;
            $(".wave").css("-webkit-mask","-webkit-gradient(radial, 25 25, "+A+", 25 25, "+(A+dA)+", from(rgb(0, 0, 0)), color-stop(0.5, rgba(0, 0, 0, 0.2)), to(rgb(0, 0, 0)))");
        }, duration : 1500 });

    }

    // Define os elementos utilizados
    var login_email = $('input[name="login-email"]');
    var login_senha = $('input[name="login-senha"]');
    var login_submit =  $('[name="login-submit"]');
    var login_form =  $('form[name="login-form"]');
    var login_mensagem =  $('div.login-alerta');
    
    $(".ax-show-password").on("click", function() {
        let data   = $(this).data();
        let passEl = $(data["passwordelement"]);
        passEl.attr("type", (passEl.attr("type") == "password") ? "text" : "password");
        $(this).toggleClass("active");
    });

    if(login_email.size() && login_senha.size() ) {

        // Foca o cursos no elemento que será utilizado
        if(login_email.val().length == 0)
            login_email.focus();
        else
            login_senha.focus();

    }

    // Submit do Formulário
    login_form.submit(function(event)
    {

        login_submit.button('loading');

        // Desabilita o submit.
        login_submit.attr("disabled","disabled");

        // Serializa os campos do formulário
        var Mensagem = '';
        var Dados = login_form.serializeArray();
        var Url = login_form.attr("action");

        $.cookie("loginemail_cliente", login_email.val() );

        // --- 1. Sucesso
        $.post( Url, Dados, function(Retorno) {
            
            // --- 1.1. Requisição ocorreu corretamente
            if( Retorno.erro == 0 ) {
                //console.log(Retorno.erro_Msg);

                if(Retorno.url) $(location).attr('href', Retorno.url);
                else $(location).attr('href','/area-cliente/processos');

            }

            // --- 1.2. Erro no lado do servidor
            else
            {
                if( Retorno.erro == '-1' ) login_email.focus();
                if( Retorno.erro == '-2' ) login_senha.focus();
                if( Retorno.erro == '-3' ) login_email.focus();

                Mensagem = Retorno.mensagem;
            }

        // --- 2. Erro na requisição
        },"json").error(function() {

            Mensagem = 'Ops, ocorreu algum problema estranho!';  // Define a mensagem de erro

        // --- 3. Após o sucesso e Após o Erro
        }).complete(function(){

            // --- 3.1. Exibe a Mensagem de erro, caso tenha uma.
            if( Mensagem ) {

                login_mensagem.html(Mensagem);
                login_mensagem.fadeIn(100);
                login_mensagem.removeClass("hide");
                
                login_submit.removeAttr('disabled');
                login_submit.button('reset');

            }


        });

        // Impede a ação padrão de submit
        event.preventDefault();
        return false;
    });

});
