/*--------------------------------------------------------------
	isTouch
--------------------------------------------------------------*/
var isTouch = 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;



/*--------------------------------------------------------------
	Menu
--------------------------------------------------------------*/
var header = new function(){
	var $ = this;

	this.nav = $$.first('header nav');
	this.cache = this.nav.querySelector('.cache');
	this.burger = $$.first('.burger');
	this.links = this.nav.querySelectorAll('a[data-scroll]');

	this.bind = function(){
		$.cache.onclick = $.toggle;
		$.burger.onclick = $.toggle;
		$.links.forEach(function(el){
			el.onclick = $.toggle;
		});
	};

	this.toggle = function(){
		$.nav.classList.toggle('visible');
		$.burger.classList.toggle('open');
	};

	return this;
};
$$.ready(header.bind);



/*--------------------------------------------------------------
	SmoothScroll
--------------------------------------------------------------*/
if(!isTouch)
	smoothScroll.init();
else{
	if($$.first('.decouvrir'))
		$$.first('.decouvrir').href = '#';
}



/*--------------------------------------------------------------
	Reveal
--------------------------------------------------------------*/
if($$.exist('.reveal')){
	function revealMe(el){
		if(el.getBoundingClientRect().top - window.innerHeight < -window.innerHeight/6)
			el.classList.add('inview');
	}
	$$.all('.reveal').forEach(function(el){
		if(!isTouch){
			revealMe(el);
			window.addEventListener('scroll', function(){
				revealMe(el);
			});
			window.addEventListener('resize', function(){
				revealMe(el);
			});
		}else{
			el.classList.add('inview');
		}
	});
}



/*--------------------------------------------------------------
	Slider
--------------------------------------------------------------*/
function sliderClass(){
	var $ = this;

	this.wrapper = $$.id('slider');
	this.left = this.wrapper.querySelector('.left');
	this.right = this.wrapper.querySelector('.right');

	this.bgs = this.wrapper.querySelectorAll('.bg');
	this.titre = this.wrapper.querySelector('h4');
	this.date = this.wrapper.querySelector('.date');
	this.soustitre = this.wrapper.querySelector('h5');
	this.excerpt = this.wrapper.querySelector('.excerpt');
	this.lien = this.wrapper.querySelector('a');

	this.active = 0;
	this.progress = false;
	this.l = this.bgs.length;

	this.init = function(){
		this.siblings();
		this.text();
		this.left.onclick = function(){
			$.move(0);
		};
		this.right.onclick = function(){
			$.move(1);
		};
	};

	this.move = function(dir){
		if(this.progress) return;
		this.progress = true;

		this.active = dir ? this.next() : this.prev();
		this.siblings();
		this.text();

		setTimeout(function(){
			$.progress = false;
		}, 500);
	};

	this.siblings = function(){
		this.bgs.forEach(function(el, i){
			if(i == $.active)
				el.className = 'bg visible t';
			else if(i == $.prev())
				el.className = 'bg l t';
			else if(i == $.next())
				el.className = 'bg r t';
			else if(i - $.active < Math.round($.l/2) && i - $.active > 0)
				el.className = 'bg r';
			else
				el.className = 'bg l';
		});
	};

	this.next = function(){
		return (this.active+this.l+1)%this.l;
	};

	this.prev = function(){
		return (this.active+this.l-1)%this.l;
	};

	this.text = function(){
		this.wrapper.classList.remove('visible');
		setTimeout(function(){
			$.titre.innerHTML = journees[$.active].titre;
			$.date.innerHTML = journees[$.active].date;
			$.soustitre.textContent = journees[$.active].soustitre;
			$.excerpt.innerHTML = journees[$.active].excerpt;
			$.lien.href = journees[$.active].lien;
			$.wrapper.classList.add('visible');
		}, 300);
	};

	this.init();
};
if($$.id('slider'))
	var slider = new sliderClass();



/*--------------------------------------------------------------
	Masonry
--------------------------------------------------------------*/
if($$.first('.galerie')){
	Macy.init({
		container: '.galerie',
		trueOrder: true,
		waitForImages: false,
		margin: 13,
		columns: 3,
		breakAt: {
			1024: 2,
			768: 1
		}
	});
	Macy.onImageLoad(Macy.recalculate, Macy.recalculate);
}



/*--------------------------------------------------------------
	Popup
--------------------------------------------------------------*/
var popup = new function(){
	var $ = this;

	this.opened = false;

	this.init = function(){
		$.dom = document.createElement('div');
		$.dom.className = 'popup';
		$.wrapper = document.createElement('div');
		$.wrapper.className = 'wrapper';
		$.cache = document.createElement('div');
		$.cache.className = 'cache';
		$.cache.onclick = $.close;
		$.dom.appendChild($.cache);
		$.dom.appendChild($.wrapper);
	};

	this.destroy = function(){
		if(this.opened){
			this.opened = false;
			document.body.removeChild($.dom);
		}
	};

	this.open = function(url){
		$.opened = true;
		$.wrapper.innerHTML = '<div class="videoWrapper"><iframe src="' + url + '"></iframe></div>';
		document.body.appendChild($.dom);
		setTimeout(function(){
			$.dom.classList.add('visible');
		}, 0);
	};

	this.close = function(){
		$.opened = false;
		$.dom.classList.remove('visible');
		setTimeout(function(){
			$.dom.classList.remove('thanks');
			$.dom.classList.remove('done');
			if(!$.dom.classList.contains('visible')){
				document.body.removeChild($.dom);
			}
		}, 400);
	};

	this.wait = function(){
		$.opened = true;
		$.dom.classList.add('thanks');
		document.body.appendChild($.dom);
		setTimeout(function(){
			$.dom.classList.add('visible');
		}, 0);
	};

	this.thanks = function(text){
		$.wrapper.innerHTML = '<p>' + text + '</p>';
		$.dom.classList.add('done');
	};

	return this;
}
$$.ready(popup.init);



/*--------------------------------------------------------------
	Parallax
--------------------------------------------------------------*/
var parallax = {
	p: $$.first(".parallax"),
	init: function(){
		this.w = this.p.querySelector(".wrapper");
		this.i = this.p.querySelector("img");
		this.i.onload = function(){
			parallax.imgFull();
		};
		window.addEventListener('resize', function(){
			parallax.imgFull();
		});
		if(!isTouch){
			['scroll', 'resize'].forEach(function(e){
				window.addEventListener(e, function(){
					parallax.calc();
				});
			});
			parallax.updateDom();
		}
	},
	calc: function(){
		this.pH = this.p.clientHeight;
		this.winH = window.innerHeight;
		this.offset = this.p.getBoundingClientRect().top;
		if(this.inView()){
			var a = this.i.clientHeight, x = this.offset, y = this.winH, z = this.pH;
			this.offsetPx = ((-2*a*x+a*y+(-y+2*x-a)*z+z*z)/(2*z+2*y));
			
			// this.w.style.transform = this.w.style.webkitTransform = this.w.style.msTransform = "translateY(" + this.offsetPx + "px)";
			// this.w.style.webkitTransform = "translateY(" + Math.round(offsetPx) + "px)";
			// this.w.style.msTransform = "translateY(" + Math.round(offsetPx) + "px)";
		}
	},
	inView: function(){
		return (this.offset - this.winH < 0 && this.offset + this.pH > 0);
	},
	imgFull: function(){
		this.pH = this.p.clientHeight;
		this.pW = this.p.clientWidth;
		if(this.i.clientHeight < this.pH || this.i.clientWidth > this.pW)
			this.i.classList.add("inverse");
		else
			this.i.classList.remove("inverse");
	},
	updateDom: function(){
		requestAnimationFrame(parallax.updateDom);
		if (parallax.i){
			parallax.i.style.transform = parallax.i.style.webkitTransform = parallax.i.style.msTransform = "translateY(" + parallax.offsetPx + "px)";
		}
	}
};
if(document.body.classList.contains("home")){
	parallax.init();
}

/*--------------------------------------------------------------
	Audio
--------------------------------------------------------------*/
// function audioPlayer(el){
// 	var
// };
// $$.all('.audio').forEach(function(el){
// 	audioPlayer(el);
// });



/*--------------------------------------------------------------
	Stripe
--------------------------------------------------------------*/
if($$.first('.stripe')){
	var amount = 2000;

	var handler = StripeCheckout.configure({
		key: 'pk_live_YKky2bZV1nIzHHACUzB0S4PF',
		image: '/wp-content/themes/expedition2017/img/picto-un-oeil-au-sommet.png',
		locale: 'auto',
		name: 'Un Å’il au sommet',
		description: 'Faire une donation',
		billingAddress: true,
		zipCode: true,
		currency: 'eur',
		token: function(token){
			popup.wait();
			$$.ajax.post('/wp-content/themes/expedition2017/stripe.php', {token: token.id, amount: amount, email: token.email, name: token.card.name}).then(function(response){
				popup.thanks(response);
			});
		}
	});

	$$.all('.stripe').forEach(function(el){
		el.querySelector('.button').onclick = function(){
			el.classList.add('noDelay');
			el.classList.add('open');
			setTimeout(function(){
				el.querySelector('input').focus();
			}, 300);
		};
		el.querySelector('input').onblur = function(){
			setTimeout(function(){
				el.classList.remove('open');
			}, 100);
		};
		el.querySelector('form').onsubmit = function(e){
			e.preventDefault();
			amount = el.querySelector('input').value*100;
			openStripe();
		};
	});

	function openStripe(){
		handler.open({amount: amount});
	}
}
