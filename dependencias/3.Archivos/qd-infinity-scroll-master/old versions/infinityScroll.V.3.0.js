/**
* Infinity Scroll
* @author Carlos Vinicius
* @version 3.0
* @date 2012-11-30
*/
if("function"!==typeof(String.prototype.trim)) String.prototype.trim=function(){ return this.replace(/^\s+|\s+$/g,""); };
(function($){
	jQuery.fn.infinityScroll=function(opts)
	{
		var defaults,log,extTitle,options,$this,$empty,$window, $document, toTopE, elemLoading, moreResults, currentPage;
		
		extTitle="Infinity Scroll";
		log=function(msg,type){
			if(typeof console=="object")
				console.log("!\n["+extTitle+" - "+(type||"Erro")+"] "+msg);
		};
		
		defaults=
		{
			// �ltima prateleira/vitrine na p�gina
			lastShelf:">div:last",
			// Elemento com mensagem de carregando ao iniciar a requisi��o da p�gina seguinte
			elemLoading:'<div id="scrollLoading">Carregando ... </div>',
			// Op��o p/ definir a URL manualmente, ficando autom�tico apenas a pagina��o. A url deve terminar com "...&PageNumber="
			searchUrl:null,
			// Objeto jQuery com o bot�o de voltar ao topo
			returnToTop:$('<div id="returnToTop"><a href="#"><span class="text">voltar ao</span><span class="text2">TOPO</span><span class="arrowToTop"></span></a></div>'),
			// Callback quando uma requisi��o ajax da prateleira � completada
			callback:function(){},
			// C�lculo do tamanho do footer para que uam nova p�gina seja chamada antes do usu�rio chegar ao "final" do site
			getShelfHeight:function()
			{
				return ($this.scrollTop()+$this.height());
			},
			// Op��o para fazer a pagin��o manualmente, uma nova p�gina s� � chamada quando executado o comando dentro desta fun��o
			// Ela recebe como par�metro: 1 fun��o que chama a pr�xima p�gina (caso ela exista)
			paginate:null,
			// Esta fun��o � quem controla onde o conte�do ser� inserido. Ela recebe como par�metro: O �ltimo bloco inserido e os dados da nova requisi��o AJAX
			insertContent:function(currentItems,ajaxData)
			{
				currentItems.after(ajaxData);
			}
		};
		options=jQuery.extend({},defaults, opts);
		$this=jQuery(this);
		$empty=jQuery("");
			
		if($this.length<1)
			return $this;

		// Checando se existe mais de uma prateleira selecionada
		if($this.length>1)
		{
			log("Identifiquei que a seletor informado ("+$this.selector+") retornou "+$this.length+" elementos.\n Como correto, selecionado o primeiro com o id: #"+($this.filter("[id^=ResultItems]:first").attr("id")||"!Not Found"),"Aviso");
			$this=$this.filter("[id^=ResultItems]:first");
		}
		
		// tentando adivinhar se esta pegando o elemento correto da prateleira
		if(!$this.filter("[id^=ResultItems]").length)
			log("Certifique-se que esta selecionando o elemento correto.\n O plugin espera que o elemento seja o que cont�m o id: #"+jQuery("div[id^=ResultItems]").attr("id")||"!Not Found","Aviso");
		if($this.parent().filter("[id^=ResultItems]").length)
		{
			log("Identifiquei que o seletor pai do elemento que voc� informou � o #"+(jQuery("div[id^=ResultItems]").attr("id")||"!Not Found")+".\n Como forma de corrigir esse problema de sele��o de elemento, assumirei prateleira correta.","Aviso");
			$this=$this.parent();
		}
		
		// Adicionando bot�o de voltar ao topo
		$("body").append(options.returnToTop);
		
		$window=jQuery(window);
		$document=jQuery(document);
		toTopE=$(options.returnToTop);
		elemLoading=jQuery(options.elemLoading);
		moreResults=true;
		currentPage=2;
		
		var fns=
		{
			scrollToTop:function()
			{
				var windowH=$window.height();
				
				$window.bind("resize",function(){
					windowH=$window.height();
				});
				
				$window.bind("scroll",function(){
					if($document.scrollTop()>(windowH))
						toTopE.stop(true).fadeTo(300,1,function(){toTopE.show();});
					else
						toTopE.stop(true).fadeTo(300,0,function(){toTopE.hide();});
				});
				
				toTopE.find("a").bind("click",function(){
					jQuery("html,body").animate({scrollTop:0},"slow");
					return false;
				});
			},
			getSearchUrl:function()
			{
				var url, content, preg;
				jQuery("script:not([src])").each(function(){
					content=jQuery(this)[0].innerHTML;
					preg=/\/buscapagina\?.+&PageNumber=/i;
					if(content.search(/\/buscapagina\?/i)>-1)
					{
						url=preg.exec(content);
						return false;
					}
				});

				if(typeof(url)!=="undefined" && typeof(url[0])!=="undefined")
					return url[0];
				else
				{
					log("N�o foi poss�vel localizar a url de busca da p�gina.\n Tente adicionar o .js ao final da p�gina. \n[M�todo: getSearchUrl]");
					return "";
				}
			},
			infinityScroll:function()
			{
				var elementPages,pages,searchUrl,currentStatus,fn;
				
				elementPages=jQuery(".pager[id*=PagerTop]:first").attr("id")||"";
				if(""===elementPages){log("N�o foi poss�vel localizar o div.pages contendo o atributo id*=PagerTop");return "";}
				
				pages=window["pagecount_"+elementPages.split("_").pop()];
				searchUrl=(null!==options.searchUrl)?options.searchUrl:fns.getSearchUrl();
				currentStatus=true;
					
				// Reportando erros
				if("undefined"===typeof pages) log("N�o foi poss�vel localizar quantidade de p�ginas.\n Tente adicionar o .js ao final da p�gina. \n[M�todo: infinityScroll]");
				
				fn=function()
				{
					if(!currentStatus) return;
					
					var currentItems=$this.find(options.lastShelf);
					if(currentItems.length<1){log("�ltima Prateleira/Vitrine n�o encontrada \n ("+currentItems.selector+")"); return false;}
					
					currentItems.after(elemLoading);
					currentStatus=false;
					jQuery.ajax({
						url: searchUrl+currentPage,
						success:function(data)
						{
							if(data.trim().length<1)
							{
								moreResults=false;
								log("N�o existem mais resultados a partir da p�gina: "+currentPage,"Aviso");
							}
							else
								options.insertContent(currentItems,data);
							currentStatus=true;
							elemLoading.remove();
						},
						error:function()
						{
							log("Houve um erro na requisi��o Ajax de uma nova p�gina.");
						},
						complete: function(jqXHR, textStatus)
						{
							options.callback();
						}
					});
					currentPage++;
				};
				
				
				if(typeof options.paginate === "function")
					options.paginate(
						function(){
							if(currentPage<=pages && moreResults)
								fn();
						}
					);
				else
					$window.bind("scroll",function(){
						if(currentPage<=pages && moreResults)
						{
							if(($window.scrollTop()+$window.height())>=(options.getShelfHeight()))
								fn();
						}
						else
							return false;
					});
			}
		};

		fns.scrollToTop();	
		fns.infinityScroll();

		return $this;
	};
})(jQuery);