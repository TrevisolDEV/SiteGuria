$(document).ready(function() {

	/**************************************************************************/
	/*PASSAGEM DE FOTOS POR MINIATURA (SLICK) E ZOOM DO PRODUTO */
	/**************************************************************************/

		/* Slick, responsÃ¡vel por organizar as fotos e as miniaturas para ter um efeito tipo carroseul*/
		 $('.list-product').slick({
			   infinite: true,
			   slidesToShow: 1,
			   slidesToScroll: 1,
			   nextArrow: '<i class="icon-chevron-right"></i>',
			   prevArrow: '<i class="icon-chevron-left"></i>',
			   dots: false
		 });

		 $('.thumbs span').click(function(){
			  var _index = $(this).index();
			  $('.list-product').slick('slickGoTo', _index);
		 });
		 /*Final slick*/

		 /*Chamada do metodo .zoom pelo id do produto jQuery plugin*/
		 	$.ajax
	            ({
	                type: "POST",
	                url: URL_LOJA+'ajax/fotosSlickZoom',

	                data: {
	                	modulo: 'telaProduto'
	                },

	                cache: false,

	                success: function(dados)
	                {
	                	if(dados){
	                		for(var key in dados){
	                			$("#pagProduct"+key).zoom({url: dados[key]});
	                		}
	                	}

	                }

	            });
		 /*Fim Zoom*/

	/**************************************************************************/
	/*SELEÃ‡ÃƒO DE ATRIBUTOS*/
	/**************************************************************************/

	$("input:radio").click(function(){

		if($(this).attr('name') != 'color'){


			$('input[name=size]').attr('checked',false);
			$('input[name=color]').attr('checked',false);

			$(this).attr('checked','checked');
			$('input[name=color]').removeClass('selecionado');
			$('input[name=size]').removeClass('selecionado');
			$(this).addClass('selecionado');
			$('input[name=color]').attr('checked',false);
			$('input[name=color]').removeClass('selecionado');
			var idCorSelecionada = $(this).val();

		    $.ajax
			({

			    type: "POST",
			     url: URL_LOJA+'ajax/product',

			    data: {
			    	modulo: 'atributos',
			    	    id: $('#idProduto').val()
			    },

			    cache: false,

			    success: function(dados)
			    {
			        if(dados != 'Error'){
			        	$('#obsTam').css('display','none');
						atributesForShowing = new Array();
						atributesForHidden = new Array();
						/* MONTA ARRAY DE QUAIS ATRIBUTOS ESTÃƒO DISPONÃVEIS PARA A SELEÃ‡ÃƒO CONFORME A COR*/
						$.each( dados, function( key, value ) {
							if(value.idCor > 0 && value.idTam >0){
								if(value.idTam == idCorSelecionada){
									atributesForShowing.push(value);
								}else{
									atributesForHidden.push(value);
								}
							}
						});
						/* ESCONDE ATRIBUTOS QUE NÃƒO SERÃƒO EXIBIDOS */
						atributesForHidden.forEach(function(value){
							$('#label_'+value.idCor).css('display','none');
							$('#itemCor_'+value.idCor).attr('checked',false);
						});
						/* EXIBE ATRIBUTOS */
						atributesForShowing.forEach(function(value){
                            
                           // console.log(atributesForShowing.length);
                        
							$('#label_'+value.idCor).css('display','inline-block');
                             $('#label_'+value.idCor).prev('input').prop('checked',false); 
                             
                            if(atributesForShowing.length == 1){
                                $('#label_'+value.idCor).prev('input').attr('checked','checked'); 
							    $('#label_'+value.idCor).prev('input').addClass('selecionado');
                                $('#label_'+value.idCor).prev('input').click();
                            }    
         
							$('#label_'+value.idCor).prev('input').change(function(){
								if($(this).prop('checked')){
									$('.product-prices > div').hide();
									$('#valorItem_'+value.idItVenda).show();
								}
							});
						});

				        }else{
				        	alert('Error');
				        }
			    }
			});
		}else{
			$('input[name=color]').attr('checked',false);
			$('input[name=color]').removeClass('selecionado');
			$(this).attr('checked','checked');
			$(this).addClass('selecionado');
			//valida estoque das variaÃ§Ãµes selecionadas
			$.ajax({
				type: "POST",
				url: URL_LOJA+'ajax/product',

			    data: {

			    	modulo: 'verificaEstoque',
					id: $('#idProduto').val(),
					idCor: $('#corProduto .selecionado').val(),
					idTam: $('#tamProduto .selecionado').val()
			    },
			    cache: false,
			    success: function(dados)
			    {
					/* CONVERTE O RETORNO PARA OBJETO*/
					dados = JSON.parse(dados);
					if(dados.estoque == 0 ){
						/* INSERE FORM PRODUTO INDISPONIVEL */
						$("#btnComprar").css("display",'none');
						$("#formAviseme").css("display",'block');
						$("#idItVenda").val(dados.idItVenda);

					}else{
						/* REMOVE FORM PRODUTO INDISPONIVEL */
						$("#btnComprar").css("display",'block');
						$("#formAviseme").css("display",'none');
						$("#idItVenda").val(0);
					}
			    }
			});
		}
	});

//
	/**************************************************************************/
	/*BOTÃƒO AVISE-ME*/
	/**************************************************************************/
	$('#btnAviseme').click(function(){
		$.ajax({
			type: "POST",
		     url: URL_LOJA+'ajax/product',

			 data: {
			 	modulo: 'aviseme',
			 	idProduto: $("#idProduto").val(),
			 	idItemVenda: $("#idItVenda").val(),
			 	email: $("#emailAviseme").val()
			 },
			 cache: false,
			 success: function(dados)
			 {
				 $("#divMsgError").fadeOut();
				 $("#divMsgWarning").fadeOut();
				 $("#divMsgSuccess").fadeOut();
				 /* CONVERTE O RETORNO PARA OBJETO*/
				 dados = JSON.parse(dados);
				 /* Faz mensagem de retorno aparecer e desaparecer da tela*/
				 if(dados.error){
					 $("#msgError").text(dados.msg);
					 $("#divMsgError").fadeIn();
				 }else if(!dados.error && dados.warning){
					 $("#msgWarning").text(dados.msg);
					 $("#divMsgWarning").fadeIn();
				 }else if(!dados.error && !dados.warning){
					 $("#msgSuccess").text(dados.msg);
					 $("#divMsgSuccess").fadeIn();
				 }
			 }
		});
	});

	/**************************************************************************/
	/*BOTÃƒO COMPRAR*/
	/**************************************************************************/
	$('#btnComprar').click(function(){
		$.ajax({
			type: "POST",
		    url: URL_SEC+'ajax/product',
		    data: {
		    	modulo: 'comprar',
		    	id: $('#idProduto').val(),
		    	idCor: $('#corProduto .selecionado').val(),
		    	idTam: $('#tamProduto .selecionado').val()
		    },
		    cache: false,
		    success: function(dados)
		    {
				dados = JSON.parse(dados);
		    	if(!dados.error){
		    		//document.location = URL_SEC+'carrinho';
		    		atualizarFloaterCarrinho(true);
		    	}else if(dados.error){
					$("#msgWarning").text(dados.msg);
					$("#divMsgWarning").fadeIn();
		    	}
		    }
		});
	});

    $("#openMedidas").click(function(){
          $("#tabelaMedidas").modal('show');  

    });

	// $(document).ready(function(){
	// 	setTimeout(atualizarFloaterCarrinho(true), 500);
	// });

	/**************************************************************************/
	/*BOTÃƒO ADDLISTA*/
	/**************************************************************************/

	$('#addLista').click(function(){

		$.ajax({
			type: "POST",
		    url: URL_LOJA+'ajax/product',
		    data: {
		    	modulo: 'lista',
		    	    id: $('#idProduto').val()
		    },
		    cache: false,
		    success: function(dados)
		    {
		    	//console.log(dados);
		    	var retorno = dados.split('|')
		    	alert(retorno[0]);
		    	$('#txtBtnLista').html(retorno[1]);

		    }

		});

	});
	/**************************************************************************/
	/*BOTÃƒO FECHAR MENSAGENS DE RETORNO*/
	/**************************************************************************/
	$("#closeMsgError").click(function(){
		$("#divMsgError").fadeOut();
	});
	$("#closeMsgWarning").click(function(){
		$("#divMsgWarning").fadeOut();
	});
	$("#closeMsgSuccess").click(function(){
		$("#divMsgSuccess").fadeOut();
	});
});
