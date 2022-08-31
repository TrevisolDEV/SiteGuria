function fim(){
	
	$('#fim').fadeIn(1000);
 $('html, body').animate({
    scrollTop: $("#fim").offset().top
}, 1000);	
	
	
	
}

function escolheFrete(tfrete,fvalor){
	
	document.getElementById('tipofrete').value=tfrete;
	document.getElementById('valorfrete').value=fvalor;
	
	
	
}
function abrePagamento(){

var tf=document.getElementById('tipofrete').value;
var vf=document.getElementById('valorfrete').value;
var vp=document.getElementById('valorpedido').value;

window.location='https://guriapitanga.com.br/montafrete.php?tf='+tf+'&vf='+vf+'&vp='+vp; 
	
	
}
 function ordenar(order){
	 if(order>0)
	  window.location='?or='+order;
	 
 }

function  calculaFrete(peso,total){
	
     var fre=document.getElementById('cep').value;
	 ajaxFunction(document.getElementById('frete'),'https://guriapitanga.com.br/frete.php?cep='+fre+'&peso='+peso+'&total='+total);
	
}



function  calculaFrete2(peso,altura,total){
	
     var fre=document.getElementById('cep').value;
	 
	 
      $.get("https://apps.widenet.com.br/busca-cep/api/cep.json", { code: fre },
         function(result){
	 
            if( result.status!=1 ){
              // alert(result.message || "Houve um erro desconhecido");
               ajaxFunction(document.getElementById('frete'),'https://guriapitanga.com.br/cfrete.php?cep='+fre+'&peso='+peso+'&total='+altura);
            } else{
            ajaxFunction(document.getElementById('frete'),'https://guriapitanga.com.br/cfrete.php?cep='+fre+'&peso='+peso+'&total='+altura+'&cidade='+result.city+'&totalv='+total+'&estado='+result.state);
			}
         });
 
	 
	
	
}

$(window).scroll(function() {
var sc = Math.abs($(this).scrollTop()); // Posição da scrollbar

var wi = screen.width;

if(sc>100){

if(wi>979)
 $(".cab_oculto").fadeIn(600);

}
if(sc<100){


 $(".cab_oculto").fadeOut(600);

}





							});

function abreMenud1(){
	 	
	  $(".menu_link_d1").fadeIn(600);
 }


function abreMenud2(){
	 	
	  $(".menu_link_d2").fadeIn(600);
 }
 function abreMenud3(subdep){
	 	
	  $(subdep).fadeIn(600);
 }
 var au=0;
  function abreSuperMenu(){
	 
	 if(au==0){$(".menu_dev_out").fadeIn(600);au=1}
			else{$(".menu_dev_out").fadeOut(600);au=0}	
	 $(".busca_dev").fadeOut(600);
	 var aub=0;
 }

function abreMenuBusca(){
	 	
	  $(".busca_dev").fadeIn(600);
 }
 var aub=0;
 function abreSuperBusca(){
	 
	 if(aub==0){$(".busca_dev").fadeIn(600);aub=1}
			else{$(".busca_dev").fadeOut(600);aub=0}	
	 $(".menu_dev_out").fadeOut(600);
	 var au=0;
 }

function busca(busca){

window.location='https://guriapitanga.com.br/busca/'+busca;	
}
function abreAgenda(ag){
$(".agendacompleta").fadeOut(00);	
$("#agendacompleta"+ag).fadeIn(600);
$(".agendacompleta").css({"text-decoration":"none"});

//$("#boxes_not"+ag).removeClass("boxes_not");
	//$("#boxes_not"+ag).addClass("boxes_not2");
}


function tamanho(tam,tamfinal){
	
	$("#"+tam).removeClass("tam");
	$("#"+tam).addClass("tam2");
	
	document.getElementById('tamanhofinal').value=tamfinal;
	
}

function abreMostra(mostra){

	$("#mostra").removeClass("miolo_texto");
	$("#mostra").addClass("miolo_texto2");
 ajaxFunction(document.getElementById('mostra'),mostra);	
 $('html, body').animate({
    scrollTop: $("#mostra").offset().top
}, 3000);
 
}

function valida_orcamento()
{
	
	 var razao = document.orcamento.razao.value
  if (razao=="")
  {
    alert(" Nome!");
    document.orcamento.razao.focus();
    return false
  }
  
  
 
var txt = document.orcamento.email.value;
  if ((txt.length != 0) && ((txt.indexOf("@") < 1) || (txt.indexOf('.') < 7)) || (txt==""))
  {
    alert('Email invalido');
	    document.orcamento.email.focus();
	return false;
  }
  var telefone = document.orcamento.telefone.value;
 
  if (telefone=="")
  {
    alert("Informe seu  telefone!");
    document.orcamento.fone.focus();
    return false
  }

   
 
  


document.forms['orcamento'].submit();

}



function alteraValor(qtd,iten,id,tam){
	
	window.location='https://guriapitanga.com.br/alteramonta.php?item='+iten+'&qtd='+qtd+'&id='+id+'&tam='+tam; 
}


function montaCarrinho2(iid){

	var tamf=document.getElementById('tamanhofinal').value;
	
	if(tamf!=''){
	qtd=document.getElementById('qtd').value;
	
	window.location='https://guriapitanga.com.br/monta.php?id='+iid+'&qtd='+qtd+'&tamanhofinal='+tamf;
	
}else {alert('escolha do tamanho')}
}




function montaCarrinho(){

var quantidade=0;

quantidade=document.getElementById('quantidade').value;
var nome=document.getElementById('nome').value;
var valor=document.getElementById('valor').value;


var car=document.getElementById('id').value;


if(quantidade==0){
	alert ('informe a quantidade');
return false;  
	
}


var q="id="+car+"&n="+nome+"&q="+quantidade+"&c="+valor;

			
				ajaxFunction(document.getElementById('carrinho'),'monta_carrinho.php?'+q);
					
								
}





function valida_fale()
{
  var nome = document.contatoc.nome.value
 

  var telefone = document.contatoc.fone.value;
 
    var mens = document.contatoc.mensagem.value;
 
  if ((nome=="")||(telefone=="")||(mens=="")||(nome=="Nome")||(telefone=="Telefone")||(mens=="Mensagem"))
  {
    
	
	if((nome=="")||(nome=="Nome"))document.getElementById('nome').style.background='#FFE3BB';
	if((telefone=="")||(telefone=="Telefone"))document.getElementById('fone').style.background='#FFE3BB';
	
	if((mens=="")||(mens=="Mensagem"))document.getElementById('mensagem').style.background='#FFE3BB';
	return false;
  }
var txtc = document.contatoc.email.value;
   if ((txtc.length != 0) && (txtc.indexOf("@") < 1) || (txtc==""))
  {
    alert('Email invalido');
	    document.contatoc.email.focus();
	return false;
  }
 ajaxFunction(document.getElementById('fale'),'https://guriapitanga.com.br/leva-contato.php?nome='+nome+'&email='+txtc+'&fone='+telefone+'&mensagem='+mens);
 document.getElementById('nome').value='Nome';
 document.getElementById('email').value='Email';
 document.getElementById('fone').value='Telefone';
 document.getElementById('mensagem').value='Mensagem';
}
// JavaScript Document



 
function abreEventos(url){
	
	
	window.open(url,'_blank')
	
}
function trocaPagina(url){
	
	window.location=url;
	
}

function abreDetalhes(id){
	
		 ajaxFunction(document.getElementById('mostra_d'),'detalhes_cursos.php?id='+id);
		 $('html, body').animate({
    scrollTop: $("body").offset().top
}, 1);
		
}
function abreComprar(id){
	
		 ajaxFunction(document.getElementById('mostra_d'),'detalhes_comprar.php?id='+id);
		 $('html, body').animate({
    scrollTop: $("body").offset().top
}, 1);
		
}

function abreDetalhesProdutos(id){
	
		 ajaxFunction(document.getElementById('mostra_d'),'detalhes_produtos.php?id='+id);
		 $('html, body').animate({
    scrollTop: $("body").offset().top
}, 1);
		
}

function abreDetalhesEspecial(id){
	
		 ajaxFunction(document.getElementById('mostra_d'),'detalhes_promocao.php?id='+id);
		 $('html, body').animate({
    scrollTop: $("body").offset().top
}, 1000);
		
}

function ChangeClass(objAttrib,NameClass)
{
//Tratamento para FF
if ((!document.all)&&(document.getElementById))
{
objAttrib.setAttribute("class",NameClass);
} 
//Tratamento para I.E
if ((document.all)&&(document.getElementById)){
objAttrib.setAttribute("className",NameClass);
}
}


function limpaEmail(vlr){
	if(vlr=='E-mail')
	document.getElementById('input_news').value='';
	if(vlr=='')
	document.getElementById('input_news').value='E-mail';
	
}

function limpaLogin(vlr){
	if(vlr=='Login')
	document.getElementById('top_login').value='';
	if(vlr=='')
	document.getElementById('top_login').value='Login';
	
}
function limpaSenha(vlr){
	if(vlr=='Senha')
	document.getElementById('top_senha').value='';
	if(vlr=='')
	document.getElementById('top_senha').value='Senha';
	
}

function voltar(){

window.history.go(-1);
	
}
function animeBox(){
	

	 $("#menu3").animate({"height": "105px"}, 600);
	 $('#menu31').fadeIn(600);	
	  $('#menu32').fadeIn(600);	
	
	
}

function animeBoxOff(d){
	
	 
 $("#menu3").animate({"height": "35px"}, 600);
	 $('#menu31').fadeOut(600);	
	  $('#menu32').fadeOut(600);	
	
}





function effectmenu(id){

	
}

function effect(id){
	


	$("#"+id).animate({
        opacity: 0.5,

       
        
      }, 700 )
}
function effect2(id){
	


	$("#"+id).animate({
        opacity: 1,
       
       
      }, 500 )
}

 function moveCorretorI(){
	 
	  $("#box_cor").animate({"top": "+=290px"}, 1200);
	 // document.getElementById('$box_cor')style.display='scroll';
	 // document.getElementById('$box_cor').style.position='fixed';
	 
	 //fixaCorretor = setTimeout('fixa()', 1500);
	 //$("#box_cor").fadeOut(600);
	 timeCorretor = setTimeout('fixa()', 1200);
	 
	 
 }
 function moveLine(line){


		var pos= document.getElementById('top_line_effect').offsetLeft;
	 	var mix=0;
	if(line==1){
		
		$("#top_line_effect").animate({
    			left:320,
    			width:60},600);}
		
		if(line==2){
			
		
		$("#top_line_effect").animate({
    			left:400,
    			width:72},600);}
		if(line==3){
			
		
		$("#top_line_effect").animate({
    			left:498,
    			width:60},600);}
		
		if(line==4){
			
		
		$("#top_line_effect").animate({
    			left:580,
    			width:72},600);}
		
		if(line==5){
			
		
		$("#top_line_effect").animate({
    			left:672,
    			width:40},600);}
		
		if(line==6){
			
		
		$("#top_line_effect").animate({
    			left:735,
    			width:115},600);}
		
		if(line==7){
			
		
		$("#top_line_effect").animate({
    			left:880,
    			width:70},600);}
}
 function fixa(){
	 
	 document.getElementById('box_cor').style.position='fixed';
 }
 function fechaOnline(){
	 	
	  $("#box_cor").fadeOut(600);
 }
 function abreLink(linke){
	 
	 
	
	  ajaxFunction(document.getElementById('destaque'),linke);	 
 }
 function abrePerfil(){
	 window.location='seuperfil.php'; 
	 
 }
 function movePagina(pg){
	 
	window.location=pg; 
	 
 }
 
 function abreProduto(id){
	 
	window.location='produto.php?id='+id; 
	 
 }
 
 
function abrePagina(pag){
	
	window.location=pag;	
}
 
function ajaxFunction(elemento,pagina) {
elemento.style.visibility = 'visible';
elemento.innerHTML = '<img src="https://guriapitanga.com.br/img/load.gif">';
var xmlhttp;
if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp=new XMLHttpRequest();
	}
	else 
	if (window.ActiveXObject){ // code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		else{
			alert("Your browser does not support XMLHTTP!");
			}
xmlhttp.onreadystatechange=function(){
									if (xmlhttp.readyState==4){
										elemento.innerHTML = xmlhttp.responseText;
										}
									}
xmlhttp.open("GET",pagina,true);
xmlhttp.send(null);
}





var t;
var l = 0;
         
function roda_dir() {
	

    l = l - 10;
        //alert(largura);

//document.getElementById('seta_dir').className='dir';
document.getElementById('barra').style.left = l+'px';
if (navigator.appName != 'Microsoft Internet Explorer') 
	t = setTimeout('roda_dir()',80);
	else
	t = setTimeout('roda_dir()',100);
	
}

function roda_esq() {
//document.getElementById('seta_esq').className='esq';
if (l < 0 ) {
l = l + 10;
document.getElementById('barra').style.left = l+'px';
if (navigator.appName != 'Microsoft Internet Explorer') 
	t = setTimeout('roda_esq()',80);
	else
	t = setTimeout('roda_esq()',100);
}
}

function pararoda() {
document.getElementById('seta_dir').className='dir_40';
document.getElementById('seta_esq').className='esq_40';
clearTimeout(t);
}
var add='';
function addVer(v_num)

{
	add+=v_num;
	alert(add);
	
	
}


function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
  {
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}

function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function checkCookie()
{
var username=getCookie("username");
if (username!=null && username!="")
  {
  alert("Welcome again " + username);
  }
else 
  {
  username=prompt("Please enter your name:","");
  if (username!=null && username!="")
    {
    setCookie("username",username,365);
    }
  }
}




function valida_news()
{
  var nome = document.contaton.nomen.value
  if ((nome=="Nome")||(nome==''))
  {
    alert("Informe seu nome!");
    document.contaton.nomen.focus();
    return false
  }
var txtc = document.contaton.emailn.value;
  if ((txtc.length != 0) && ((txtc.indexOf("@") < 1) || (txtc.indexOf('.') < 7)) || (txtc==""))
  {
    alert('Email invalido');
	    document.contaton.emailn.focus();
	return false;
  }
 
   
 
 

 ajaxFunction(document.getElementById('news'),'https://guriapitanga.com.br/leva-news.php?nome='+nome+'&email='+txtc);
 document.getElementById('nomen').value='Nome';
 document.getElementById('emailn').value='Email';


}


function valida_in()
{
  var nome = document.contatoin.nomen.value
  if ((nome=="Nome")||(nome==''))
  {
    alert("Informe seu nome!");
    document.contatoin.nomen.focus();
    return false
  }

 
   var txtc = document.contatoin.emailn.value
   var tel = document.contatoin.tel.value
   var prod = document.contatoin.prod.value
 
 

 ajaxFunction(document.getElementById('newsin'),'https://guriapitanga.com.br/leva-in.php?nome='+nome+'&email='+txtc+'&tel='+tel+'&prod='+prod);
 document.getElementById('nomen').value='Nome';
 document.getElementById('emailn').value='Email';
  document.getElementById('tel').value='WhatsApp (informe DDD)';


}



function valida_whats()
{
  var t = document.contatow.tel.value
  if ((t=="WhatsApp (informe DDD)")||(t==''))
  {
    alert("Informe seu telefone!");
    document.contatow.tel.focus();
    return false
  }

 
   
 
 

 ajaxFunction(document.getElementById('whats'),'https://guriapitanga.com.br/leva-whats.php?tel='+t);
 document.getElementById('tel').value='WhatsApp (informe DDD)';



}




function valida_car()
{
  var nomec = document.contatoc.nome.value
  if ((nomec=="")||(nomec=='Nome'))
  {
    alert("Informe seu nome!");
    document.contatoc.nome.focus();
    return false
  }
var txtc = document.contatoc.email.value;
  if ((txtc.length != 0) && ((txtc.indexOf("@") < 1) || (txtc.indexOf('.') < 7)) || (txtc==""))
  {
    alert('Email invalido');
	    document.contatoc.email.focus();
	return false;
  }
  var telefonec = document.contatoc.fone.value;
 
  if ((telefonec=="")||(telefonec=='Telefone'))
  {
    alert("Informe seu  telefone!");
    document.contatoc.fone.focus();
    return false
  }

   
 
  
   var mensc = document.contatoc.mensagem.value;
 
  if( (mensc=="")||(mensc=='Mensagem'))
  {
    alert("Digite sua mensagem!");
    document.contatoc.mensagem.focus()
    return false
  }

document.forms['contatoc'].submit();

}
