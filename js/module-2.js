function getRand(min, max) {
	// min = Math.ceil(min);
  // max = Math.floor(max);
  // return Math.floor(Math.random() * (max - min + 1)) + min;
	return Math.random() * (max - min) + min;
}

function module2(){
	var $ = this;

	this.p = {};
	this.pause = false;
	this.stage = new PIXI.Container();
	this.mouse = {};
	this.sprites = {
		images : [],
		circles : [],
		shadows : [],
		texts : [],

		backgrounds : [],
		text : [],
		lines : [],
		add : []
	};
	this.subgroup = [];
	this.addgroup = [];
	this.groups = {
		images  : new PIXI.Container(),
		backgrounds : new PIXI.Container(),
		// text : new PIXI.Container()
	};
	this.renderer;
	this.textures;
	this.nbSprites = {
		images : 12,
		backgrounds : 1,
		add : [6,6,6,6,6,6,6,6,6,6,6,6]
	};
	this.addPos = [
		[
			{ x: -225, y: 50 },
			{ x: 200, y: 150 },
			{ x: 50, y: -225 },
			{ x: 225, y: -150 },
			{ x: -50, y: 225 },
			{ x: 650, y: -175 }
		],
		[
			{ x: -225, y: 50 },
			{ x: 200, y: 150 },
			{ x: 50, y: -225 },
			{ x: 225, y: -150 },
			{ x: -50, y: 225 },
			{ x: 500, y: 0 }
		],
		[
			{ x: -225, y: 50 },
			{ x: 200, y: 150 },
			{ x: 50, y: -225 },
			{ x: 225, y: -150 },
			{ x: -50, y: 225 },
			{ x: -150, y: -150 }
		],
		[
			{ x: -225, y: 50 },
			{ x: 200, y: 150 },
			{ x: 50, y: -225 },
			{ x: 225, y: -150 },
			{ x: -325, y: -200 },
			{ x: -150, y: -150 }
		],
		[
			{ x: -225, y: 50 },
			{ x: 240, y: -140 },
			// { x: 200, y: 150 },
			{ x: 50, y: -225 },
			{ x: 225, y: -150 },
			{ x: 550, y: -250 },
			{ x: -50, y: 225 }
		],
		[
			{ x: 150, y: 150 },
			{ x: 200, y: 150 },
			{ x: -50, y: -225 },
			{ x: 225, y: -150 },
			{ x: -50, y: 225 },
			{ x: 375, y: -125 }
		],
		[
			{ x: -225, y: 50 },
			{ x: 200, y: 150 },
			{ x: 175, y: 175 },
			{ x: 50, y: -225 },
			{ x: -50, y: 225 },
			{ x: 550, y: 250 }
		],
		[
			{ x: -225, y: 50 },
			{ x: 200, y: 150 },
			{ x: 125, y: 175 },
			{ x: 225, y: -150 },
			{ x: -50, y: 225 },
			{ x: 600, y: -150 }
		],
		[
			{ x: -150, y: -150 },
			{ x: 625, y: -200 },
			{ x: 50, y: 250 },
			{ x: 225, y: -150 },
			{ x: -150, y: 125 },
			{ x: -350, y: 250 }
		],
		[
			{ x: -225, y: 50 },
			{ x: 200, y: 150 },
			{ x: 50, y: -225 },
			{ x: 225, y: -150 },
			{ x: -50, y: 225 },
			{ x: 500, y: 300 }
		],
		[
			{ x: -225, y: 50 },
			{ x: 200, y: 150 },
			{ x: 50, y: -225 },
			{ x: 225, y: -150 },
			{ x: -50, y: 225 },
			{ x: -150, y: -150 }
		],
		[
			{ x: 150, y: 150 },
			{ x: 200, y: 150 },
			{ x: -50, y: -225 },
			{ x: 225, y: -150 },
			{ x: -50, y: 225 },
			{ x: 375, y: -125 }
		]
	];
	this.origin = {};
	this.anchor = {
		x : 0.5,
		y : 0.5
	};
	this.basePath = "/wp-content/themes/expedition2017";
	window.WebFontConfig = {
	    google: {
	        families: ['Roboto', 'Droid Serif']
	    }
	};
	this.textContent = [
		{
			firstname : 'Marie-Anne',
			lastname : 'Varechon',
			text : "Atteinte dâ€™une des multiples formes de la maladie de Stargardt, dÃ©celÃ©e Ã  la suite dâ€™une rougeole Ã  lâ€™Ã¢ge de 12 ans, jâ€™ai mis des annÃ©es Ã  accepter mon handicap visuel. DÃ©sormais engagÃ©e au quotidien, participer Ã  cette aventure constitue pour moi un challenge immense mais tellement magiqueÂ ! Rejoignez-nousÂ ! soutenez-nousÂ !"
		},
		{
			firstname : 'Jean-Christophe',
			lastname : 'Mallet',
			text : "Victime dâ€™un accident Ã  31 ans (tendeur Ã  lâ€™Å“il droit), jâ€™ai subi de multiples interventions chirurgicales dont une opÃ©ration de la cataracte en 1984, puis une greffe de la cornÃ©e en 2004. Participer Ã  lâ€™expÃ©dition constitue un immense dÃ©fi, Ã  la hauteur de la nÃ©cessaire sensibilisation au handicap visuel !"
		},
		{
			firstname : 'Eric',
			lastname : 'Hinderer',
			text : "La dÃ©gradation ou la perte de la vue peut tous nous toucherÂ ! Vous, moi, nous tous, aujourdâ€™hui ou un jour prochain. Porter ce projet est pour moi une Ã©vidence et nous espÃ©rons au travers de cette expÃ©dition aider la recherche mÃ©dicale en France et favoriser la prÃ©vention et lâ€™accompagnement pour tous nos amis atteints dâ€™un handicap visuel."
		},
		{
			firstname : 'RÃ©mi',
			lastname : 'Meurant',
			text : "Â«Â GuÃ©rir parfois, soulager souvent, Ã©couter toujoursÂ Â». On dit aussi que le voyage c'est aller de soi Ã  soi en passant par les autres. Alors participer Ã  cette extraordinaire aventureÂ ? Oui sans aucune hÃ©sitationÂ ! Chacun Ã  sa mesure doit se lancer et faire quelque chose pour son prochain. â€œNous devons Ãªtre le changement que nous voulons dans le mondeâ€ (Gandhi). C'est pourquoi je suis fier de vivre cette expÃ©rience, en espÃ©rant que vous nous y rejoindrezÂ !"
		},
		{
			firstname : 'Nathalie',
			lastname : 'Lavayssiere',
			text : "Je suis heureuse de mâ€™engager dans cette aventure humaine, sportive et solidaire. A l'initiative d'Eric, avec les nÃ©palais et leur philosophie exemplaire, au cÅ“ur des plus hautes montagnes du monde, nous porterons les messages de sensibilisation Ã  la perte de l'acuitÃ© visuelle. Merci Ã  tous ceux qui soutiennent et soutiendront cette cause."
		},
		{
			firstname : 'Christophe',
			lastname : 'Petit',
			text : "Â«Â Le destin bat les cartes mais câ€™est nous qui les joueronsÂ Â»"
		},
		{
			firstname : 'Marcelin',
			lastname : 'Hellequin',
			text : "Les solitudes des grands sommets dans une cordÃ©e solidaire...Que cette passion de la montagne avec ses dÃ©fis ouvre les portes du partage et de lâ€™accompagnement! Ces Ãªtres animÃ©s de volontÃ©,  Ã  travers leur handicap, nous donnent des leÃ§ons dâ€™humilitÃ©  et de courage."
		},
		{
			firstname : 'Ang',
			lastname : 'Chhiri Sherpa',
			text : "Namaste. Avec mon agence DISCOVERY MOUNTAIN TREK & EXPEDITION, je suis fier dâ€™organiser cette expÃ©dition pour une si belle cause qui touche tant et tant de mes amis nÃ©palais, adultes comme enfants. Un grand MERCI pour votre aideÂ !"
		},
		{
			firstname : 'Alexandre',
			lastname : 'Lepart',
			text : "Atteint d'une choroÃ¯dÃ©rÃ©mie dÃ©celÃ© Ã  l'Ã¢ge de 6 ans, je soutiens de tout coeur et avec ferveur l'initiative de l'association ExpÃ©ditions Solidaires. Les recherches sont en cours pour trouver un traitement Ã  ma maladie d'origine gÃ©nÃ©tique, alors faites comme moi et soutenez l'expÃ©dition Un oeil au sommet !"
		},
		{
			firstname : 'Clara, Charles',
			lastname : 'et Marianne',
			text : "Â«Â On ne voit bien qu'avec le cÅ“ur. L'essentiel est invisible pour les yeuxÂ Â» (Le Petit Prince, Saint-ExupÃ©ry)"
		},
		{
			firstname : 'Elise',
			lastname : 'Garcia',
			text : "Je suis ravie de contribuer et de soutenir ce premier beau dÃ©fi orchestrÃ©e par lâ€™association ExpÃ©ditions Solidaires. Engageons nous tous pour dÃ©fendre la cause du handicap visuel !"
		},
		{
			firstname : 'Agence',
			lastname : 'Adelios',
			text : "Adelios est fiÃ¨re de participer Ã  ce projet en proposant une expÃ©rience interactive Ã  la hauteur de lâ€™ambition derriÃ¨re cette expÃ©dition. Notre Ã©quipe de choc : GrÃ©gory Caplat, directeur dâ€™agence ; Pierre Patrault, Directeur artistique et MathÃ©o Raveux, dÃ©veloppeur."
		}
	];
	this.isResizing = false;
	this.resizeT = null;
	this.mobileWidth = 768;
	this.isMobile = false;
	this.mobileScrollRatio = 2;
	this.canvasHeight = 800;
	this.canvasHeightMin = 500;
	this.module2 = $$.first('.module2');
	this.jsonSpritePath = this.basePath + "/sprites/module-2.json";

	this.start = function(){
		$.init.responsive();
		$.init.data();
		$.init.objects();
		$.init.events();
		$.init.webfontLoader();

    $.load();
	};

	this.init = new function(){
		this.responsive = function(){
			$.p.screenRatio = window.innerWidth / 1080;
			$.p.scale_sprite = 0.6 * $.p.screenRatio;

			if ($.p.scale_sprite > 1 ) {
				$.p.scale_sprite = 1;
			}
			else if ($.p.scale_sprite < 0.5) {
				$.p.scale_sprite = 0.5;
			}

			var tmp = ($.p.scale_sprite - 0.5) / 0.5;
			$.module2.style.height = ($.canvasHeightMin + (tmp * ($.canvasHeight - $.canvasHeightMin))) + 'px';
		};
		this.data = function(){
			$.p.center = {};
			$.p.winSize = {};

			$.p.center.x = $.module2.clientWidth / 2;
			$.p.center.y = $.canvasHeight / 1.5;
			$.p.winSize.x = $.module2.clientWidth;
			$.p.winSize.y = $.canvasHeight;

			// if ($.p.winSize.x <= $.mobileWidth) {
			// 	$.isMobile = true;
			// 	$.p.center.y = $.module2.clientHeight / 1.5;
			// }

			$.p.screenRatio = window.innerWidth / 1080;
			$.p.scale_sprite = 0.6 * $.p.screenRatio;

			if ($.p.scale_sprite > 1 ) {
				$.p.scale_sprite = 1;
			}
			else if ($.p.scale_sprite < 0.5) {
				$.p.scale_sprite = 0.5;
			}

			$.p.center.y = $.canvasHeight / (1 + $.p.scale_sprite);

			$.origin.y = $.p.center.y;

			$.mouse.x = $.p.center.x;
			$.mouse.y = $.origin.y;
			$.mouse.from = {};
			$.mouse.from.x = 0;
			$.mouse.from.y = 0;
			$.mouse.store = {};
			$.mouse.store.x = 0;
			$.mouse.store.y = 0;
			$.mouse.vx = 0;
			$.mouse.vy = 0;
			// $.mouse['in'] = true;
			$.mouse.direction = '';
			$.mouse.last = {};
			$.mouse.last.x = 0;
			$.mouse.last.y = 0;

			// $.imageRatio = 1;
			$.imageRatio = .6;
		};
		this.objects = function(){
			$.renderer = new PIXI.CanvasRenderer($.p.winSize.x, $.canvasHeight, {
					view : document.getElementById('slideEquipe'),
					transparent : true
			});

			$.renderer.plugins.interaction.autoPreventDefault = false;
			$.renderer.view.style['touch-action'] = 'auto';
		};
		this.events = function(){
			$.module2.on('mousemove', $.events.mousemove, false);
			$.module2.on("mouseout", $.events.mouseout, false);
			$.module2.on("mouseover", $.events.mouseover, false);
			$.module2.on("mousedown", $.events.mousedown, false);
			$.module2.on("mouseup", $.events.mouseup, false);

			// $.module2.on("touchmove", $.events.touchmove, false);
			// $.module2.on("touchend", $.events.touchend, false);
			// $.module2.on("touchstart", $.events.touchstart, false);

			window.addEventListener("resize", $.events.resize, false);

			window.addEventListener('scroll', $.events.domscroll, false);

			if ($.isMobile) {
				$$.first('.module2 .previous').on('click', function(){
					$.scrollButtons.previous();

					TweenMax.to($.scrollButtons.buttons[$.scrollButtons.scrollSteps.indexOf($.scrollButtons.current)], 0.5, {
						opacity: 1,
						x: 0
					});
					TweenMax.to($.scrollButtons.buttons[$.scrollButtons.scrollSteps.indexOf($.scrollButtons.current) + 1], 0.5, {
						opacity: 0,
						x: +50
					});
				});

				$$.first('.module2 .next').on('click', function(){
					$.scrollButtons.next();

					TweenMax.to($.scrollButtons.buttons[$.scrollButtons.scrollSteps.indexOf($.scrollButtons.current)], 0.5, {
						opacity: 1,
						x: 0
					});
					TweenMax.to($.scrollButtons.buttons[$.scrollButtons.scrollSteps.indexOf($.scrollButtons.current) - 1], 0.5, {
						opacity: 0,
						x: -50
					});
				});

				TweenMax.set([$.scrollButtons.buttons[1], $.scrollButtons.buttons[2]], {
					opacity: 0,
					x: +10
				});
			}
			else {
				$.scrollButtons.init();
			}

		};
		this.webfontLoader = function(){
				var wf = document.createElement('script');
				wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +
					'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
				wf.type = 'text/javascript';
				wf.async = 'true';
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(wf, s);
		};

		return this;
	};

	this.scrollButtons = new function(){
		var $scrollB = this;

		this.scrollSteps = [0, 2, 7];
		this.buttons = $$.all('.module2buttons .equipeButton');
		this.current = 0;

		this.init = function(){
			var i = $scrollB.buttons.length;
			while (--i !== -1) {
				$scrollB.buttons[i].dataset.id = $scrollB.scrollSteps[i];

				$scrollB.buttons[i].on('click', function(e){
					var id = e.target.dataset.id;
					$scrollB.current = id;
					$scrollB.scrollTo(id);
				});
			}
		};

		this.scrollTo = function(i){
			if ($.isMobile) {
				TweenMax.to($.mouse.store, 1.5, {
					x: -($.sprites.images[i].x - $.p.center.x - $.sprites.images[i].width / 2),
					ease: Strong.easeInOut
				});
			}
			else {
				TweenMax.to($.mouse.store, 1.5, {
					x: -($.sprites.images[i].x - $.p.center.x),
					ease: Strong.easeInOut
				});
			}
		};

		this.next = function(){
			var cur = parseInt($scrollB.current);
			var curId = $scrollB.scrollSteps.indexOf(cur);

			if (curId > $scrollB.scrollSteps.length - 2) {
				curId = $scrollB.scrollSteps.length - 2;
			}

			var scrollTo = $scrollB.scrollSteps[curId + 1];

			$scrollB.current = scrollTo;
			$scrollB.scrollTo(scrollTo);
		};

		this.previous = function(){
			var cur = parseInt($scrollB.current);
			var curId = $scrollB.scrollSteps.indexOf(cur);

			if (curId < 1) {
				curId = 1;
			}

			var scrollTo = $scrollB.scrollSteps[curId - 1];

			$scrollB.current = scrollTo;
			$scrollB.scrollTo(scrollTo);
		};

		return this;
	};

	this.events = new function(){
		this.mousemove = function(e){
			if (!$.mouse.down)
			{
				return;
			}

			$.mouse.x = e.clientX / $.p.scale_sprite;
			$.mouse.y = e.clientY / $.p.scale_sprite;

			if ($.mouse.last.x < $.mouse.x) {
				$.mouse.direction = 'right';
			}
			else if ($.mouse.last.x > $.mouse.x) {
				$.mouse.direction = 'left';
			}
			else {
				$.mouse.direction = '';
			}

			$.mouse.last.x = $.mouse.x;
			$.mouse.last.y = $.mouse.y;
		};
		this.mouseout = function(e){
			// $.mouse['in'] = false;
		};
		this.mouseover = function(e){
			// $.mouse['in'] = true;
		};
		this.mousedown = function(e){
			$.mouse.down = true;

			$.mouse.x = e.clientX / $.p.scale_sprite;
			$.mouse.last.x = e.clientX / $.p.scale_sprite;
			$.mouse.from.x = e.clientX / $.p.scale_sprite;

			$.mouse.y = e.clientY / $.p.scale_sprite;
			$.mouse.last.y = e.clientY / $.p.scale_sprite;
			$.mouse.from.y = e.clientY / $.p.scale_sprite;
		};
		this.mouseup = function(e){
			$.mouse.down = false;

			$.mouse.store.x += ($.mouse.x - $.mouse.from.x);
			// $.mouse.store.y += ($.mouse.y - $.mouse.from.y);

			var min = 0;
			var max = -(($.nbSprites.images - 1) * $.imageRatio * $.p.winSize.x);

			if ($.mouse.store.x > min / $.p.scale_sprite) {
				$.mouse.store.x = min / $.p.scale_sprite;
			}
			else if ($.mouse.store.x < max / $.p.scale_sprite) {
				$.mouse.store.x = max / $.p.scale_sprite;
				// $.mouse.store.x = -(($.nbSprites.images - 1) * $.imageRatio * $.p.winSize.x) / $.p.scale_sprite;

			}

			$.mouse.from.y = 0;
			$.mouse.from.x = 0;
			$.mouse.y = 0;
			$.mouse.x = 0;
			$.mouse.direction = '';
		};

		this.touchmove = function(e){
			console.log('mousemove');
			if (!$.mouse.down)
			{
				return;
			}

			$.mouse.x = e.touches[0].clientX / $.p.scale_sprite * $.mobileScrollRatio;
			$.mouse.y = e.touches[0].clientY / $.p.scale_sprite * $.mobileScrollRatio;

			if ($.mouse.last.x < $.mouse.x) {
				$.mouse.direction = 'right';
			}
			else if ($.mouse.last.x > $.mouse.x) {
				$.mouse.direction = 'left';
			}
			else {
				$.mouse.direction = '';
			}

			$.mouse.last.x = $.mouse.x;
			$.mouse.last.y = $.mouse.y;
		};
		this.touchend = function(){
			$.mouse.down = false;

			$.mouse.store.x += ($.mouse.x - $.mouse.from.x);
			// $.mouse.store.y += ($.mouse.y - $.mouse.from.y);

			var min = 0;
			// var max = -(($.nbSprites.images - 1) * $.imageRatio * $.p.winSize.x) - ($.sprites.images[0].width * $.p.scale_sprite);
			var max = -(($.nbSprites.images - 1) * $.imageRatio * $.p.winSize.x);

			if ($.mouse.store.x > min / $.p.scale_sprite) {
				$.mouse.store.x = min / $.p.scale_sprite;
			}
			else if ($.mouse.store.x < max / $.p.scale_sprite) {
				$.mouse.store.x = max / $.p.scale_sprite;
				// $.mouse.store.x = -(($.nbSprites.images - 1) * $.imageRatio * $.p.winSize.x) / $.p.scale_sprite * $.mobileScrollRatio;
			}

			$.mouse.from.y = 0;
			$.mouse.from.x = 0;
			$.mouse.y = 0;
			$.mouse.x = 0;
			$.mouse.direction = '';
		};
		this.touchstart = function(e){
			$.mouse.down = true;

			$.mouse.x = e.touches[0].clientX / $.p.scale_sprite * $.mobileScrollRatio;
			$.mouse.last.x = e.touches[0].clientX / $.p.scale_sprite * $.mobileScrollRatio;
			$.mouse.from.x = e.touches[0].clientX / $.p.scale_sprite * $.mobileScrollRatio;

			$.mouse.y = e.touches[0].clientY / $.p.scale_sprite * $.mobileScrollRatio;
			$.mouse.last.y = e.touches[0].clientY / $.p.scale_sprite * $.mobileScrollRatio;
			$.mouse.from.y = e.touches[0].clientY / $.p.scale_sprite * $.mobileScrollRatio;
		};

		this.resize = function(e){
			$.p.screenRatio = window.innerWidth / 1080;
			$.p.scale_sprite = 0.6 * $.p.screenRatio;

			if ($.p.scale_sprite > 1 ) {
				$.p.scale_sprite = 1;
			}
			else if ($.p.scale_sprite < 0.5) {
				$.p.scale_sprite = 0.5;
			}

			var tmp = ($.p.scale_sprite - 0.5) / 0.5;
			$.module2.style.height = ($.canvasHeightMin + (tmp * ($.canvasHeight - $.canvasHeightMin))) + 'px';

			$.renderer.resize($.module2.clientWidth, $.canvasHeight);

			$.init.data();
			$.resetSprites.images();
			$.resetSprites.backgrounds();

			$.stage.scale.set($.p.scale_sprite, $.p.scale_sprite);

		};

		this.domscroll = function(e){
			if ($$.inView($.module2)) {
				$.pause = false;
			}
			else {
				$.pause = true;
			}
		};

		return this;
	};

	this.load = function(){
		var images = [];

		images.push($.basePath + "/sprites/ressources/shadow-1.png");
		images.push($.basePath + "/sprites/ressources/background-1.jpg");

		for (var i = 0; i < $.nbSprites.images; i++) {
			images.push($.basePath + "/sprites/ressources/image-"+ (i + 1) +'.png');
			for (var n = 1; n <= $.nbSprites.add[i]; n++) {
				images.push($.basePath + "/sprites/ressources/add-"+(i+1)+"-"+n+".png");
			}
		}

    PIXI.loader
			.add(images)
      // .add($.jsonSpritePath)
      .load($.setup)
    ;
	};

	this.setup = function(){
 		//$.textures = PIXI.loader.resources[$.jsonSpritePath].textures;
		$.ressources = PIXI.loader.resources;

		$.addSprites.images();
		$.addSprites.backgrounds();
		$.addSprites.lines();

		$.stage.addChild($.groups.backgrounds);
		$.stage.addChild($.groups.images);

		$.stage.scale.set($.p.scale_sprite);

		// $.autoScroll = TweenMax.to($.mouse.store, 60, {
		// 	x: -($.sprites.images[5].x - $.p.center.x - $.sprites.images[5].width / 2)
		// });
		// $.module2.addEventListener('mousedown', function(){
		// 	$.autoScroll.kill();
		// 	$.module2.removeEventListener('mousedown', arguments.callee);
		// });

		$.autoScrollId = 1;
		$.autoScroll = setInterval(function(){
			$.scrollButtons.scrollTo($.autoScrollId);
			$.autoScrollId++;
		}, 5000);
		$.module2.addEventListener('mousedown', function(){
			clearInterval($.autoScroll);
			$.module2.removeEventListener('mousedown', arguments.callee);
		});

		setInterval($.renderLoop, 1000 / 30);

		$.render();
	};

	this.addSprites = new function(){
		this.images = function(){
			for (var i = 0; i < $.nbSprites.images; i++) {
				var filename = "image-"+ (i + 1) +'.png';

				$.sprites.images.push(
					new PIXI.Sprite(
						// $.textures[filename]
						$.ressources[$.basePath + '/sprites/ressources/' + filename].texture
					)
				);

				// image
				$.sprites.images[i].anchor.set($.anchor.x, $.anchor.y);
				$.sprites.images[i].x = $.p.center.x + (i * $.imageRatio * $.p.winSize.x) - (($.sprites.images[i].width * $.p.scale_sprite)/2);
				if ($.isMobile) {
					$.sprites.images[i].x = $.p.center.x + (i * $.imageRatio * $.p.winSize.x);
				}
				$.sprites.images[i].x /= $.p.scale_sprite;
				$.sprites.images[i].y = $.p.center.y;

				// bordure
				$.sprites.circles.push(new PIXI.Graphics());
				$.sprites.circles[i].lineStyle(0);
				$.sprites.circles[i].beginFill(0xFFFFFF, 0.5);
				$.sprites.circles[i].drawCircle($.sprites.images[i].x, $.sprites.images[i].y, ($.sprites.images[i].width/2) + 10);
				$.sprites.circles[i].endFill();

				// ombre
				$.sprites.shadows.push(new PIXI.Sprite( $.ressources[$.basePath + "/sprites/ressources/shadow-1.png"].texture ));
				$.sprites.shadows[i].anchor.set($.anchor.x, $.anchor.y);
				$.sprites.shadows[i].scale.set(0.95);
				$.sprites.shadows[i].x = $.sprites.images[i].x + 25;
				$.sprites.shadows[i].y = $.sprites.images[i].y + 25;

				$.sprites.texts.push(new PIXI.Container());
				// firstname
				var firstname = new PIXI.Text($.textContent[i].firstname, {
					font: 'regular 25pt Roboto',
					lineHeight: '25',
					fill: '#394358'
				});

				firstname.x = 50;
				firstname.y = 100;

				// lastname
				var lastname = new PIXI.Text($.textContent[i].lastname, {
					font: 'bold 25pt Roboto',
					lineHeight: '25',
					fill: '#394358'
				});

				lastname.x = firstname.x + firstname.width + 10;
				lastname.y = firstname.y;

				// texte
				var text = new PIXI.Text($.textContent[i].text, {
					font: (($.isMobile) ? 'regular 12pt Droid Serif' : 'regular 10pt Droid Serif'),
					lineHeight: '25',
					fill: '#394358',
					wordWrap: true,
					wordWrapWidth: 400
				});

				text.x = firstname.x;
				text.y = firstname.y + firstname.height + 15;

				// if ($.isMobile) {
				// 	text.scale.set(1.5, 1.5);
				// }

				$.sprites.texts[i].addChild(firstname);
				$.sprites.texts[i].addChild(lastname);
				$.sprites.texts[i].addChild(text);

				$.sprites.texts[i].scale.set(1 + (1 - $.p.scale_sprite));
				// $.sprites.texts[i].y = $.sprites.images[i].y;
				$.sprites.texts[i].x = Math.round($.sprites.images[i].x + $.sprites.images[i].width/2);

				if (i % 2 == 0) { // haut
					$.sprites.texts[i].y = $.sprites.images[i].y - 90;
				}
				else { // bas
					$.sprites.texts[i].y = $.sprites.images[i].y;
				}

				if ($.isMobile) {
					$.sprites.texts[i].x = Math.round($.sprites.images[i].x - $.sprites.images[i].width / 2 - 100);
					$.sprites.texts[i].y = $.sprites.images[i].y + $.sprites.images[i].height * $.p.scale_sprite;
				}

				$.sprites.text.push($.sprites.texts[i]);

				$.subgroup.push(new PIXI.Container());
				$.subgroup[i].addChild($.sprites.text[i]);
				$.subgroup[i].addChild($.sprites.shadows[i]);
				$.subgroup[i].addChild($.sprites.circles[i]);
				$.subgroup[i].addChild($.sprites.images[i]);

				$.subgroup[i].index = i;
				$.subgroup[i].mousein = false;
				$.subgroup[i].interactive = true;
				$.subgroup[i].tx = 0;
				$.subgroup[i].ty = 0;
				$.subgroup[i].hitArea = new PIXI.Circle($.sprites.images[i].x, $.sprites.images[i].y, ($.sprites.images[i].width/2) * 2);
				$.subgroup[i].mouseover = function(mouseData){
					var target = mouseData.data.target;
					target.mousein = true;
				};
				$.subgroup[i].mousemove = function(mouseData){
					var target = mouseData.data.target;

					if (target && target.mousein) {
						var image = $.sprites.images[target.index];

						var mouse = {
							x : mouseData.data.global.x - $.mouse.store.x,
							y : mouseData.data.global.y - $.mouse.store.y
						};
						var max = 35;

						target.angley = (Math.abs((Math.atan2(mouse.x - image.x, -(mouse.y - image.y)) * (180/Math.PI)) / 180) - 0.5) * 2;
						target.anglex = (Math.abs((Math.atan2(mouse.y - image.y, -(mouse.x - image.x)) * (180/Math.PI)) / 180) - 0.5) * 2;

						target.ty = max * (target.angley);
						target.tx = max * (target.anglex);

						$.sprites.add[target.index].forEach(function(add, id){
							add.tx = add.originx + target.tx * add.dir;
							add.ty = add.originy + target.ty * add.dir;
						});
					}
				};
				$.subgroup[i].mouseout = function(mouseData){
					var target = mouseData.data.target;
					target.mousein = false;
					target.ty = 0;
					target.tx = 0;
				};

				// add
				$.addgroup.push(new PIXI.Container());
				$.addgroup[i].index = i;
				$.addgroup[i].x = $.sprites.images[i].x;
				$.addgroup[i].y = $.sprites.images[i].y;
				$.sprites.add.push([]);
				for (var n = 1; n <= $.nbSprites.add[i]; n++) {
					var filename = "add-"+(i+1)+"-"+n+".png";

					$.sprites.add[i].push(
						new PIXI.Sprite(
							// $.textures[filename]
							$.ressources[$.basePath + '/sprites/ressources/' + filename].texture
						)
					);

					var posx = $.addPos[i][n-1].x;
					var posy = $.addPos[i][n-1].y;

					$.sprites.add[i][n - 1].anchor.set(0.5);
					$.sprites.add[i][n - 1].x = posx;
					$.sprites.add[i][n - 1].y = posy;

					$.sprites.add[i][n - 1].originx = posx;
					$.sprites.add[i][n - 1].originy = posy;

					$.sprites.add[i][n - 1].dir = getRand(-1, 1);

					$.sprites.add[i][n - 1].tx = posx;
					$.sprites.add[i][n - 1].ty = posy;

					$.addgroup[i].addChild($.sprites.add[i][n - 1]);
				}

				$.groups.images.addChild($.subgroup[i]);
				$.groups.images.addChild($.addgroup[i]);
			}
		};
		this.lines = function(){
			for (var i = 0; i < $.nbSprites.images - 1; i++)
			{
				var curX = $.p.center.x + (i * $.imageRatio * $.p.winSize.x) - ($.sprites.images[i].width);
				var nextX = $.p.center.x + ((i + 1) * $.imageRatio * $.p.winSize.x) - ($.sprites.images[i].width);

				var graphics = new PIXI.Graphics();
				graphics.lineStyle(3, 0xFFFFFF, 1.0);
				graphics.moveTo(curX, $.p.center.y);

				if (i % 2 == 0) {
					graphics.bezierCurveTo(
						curX, $.p.center.y,
						curX + ((nextX - curX) / 2), $.p.winSize.y * 0.35,
						nextX, $.p.center.y
					);
				}
				else {
					graphics.bezierCurveTo(
						curX, $.p.center.y,
						curX + ((nextX - curX) / 2), $.p.winSize.y * 0.65,
						nextX, $.p.center.y
					);
				}

				$.sprites.lines.push(graphics);
				$.groups.images.addChildAt(graphics, 0);
			}
		};
		this.backgrounds = function(){
				$.sprites.backgrounds.push(
					new PIXI.Sprite(
						// $.textures['background-1.jpg']
						$.ressources[$.basePath + '/sprites/ressources/background-1.jpg'].texture
					)
				);

				$.sprites.backgrounds[0].x = $.p.center.x;
				$.sprites.backgrounds[0].y = $.p.center.y;
				// $.sprites.backgrounds[0].pivot.y = $.p.center.y + 100;
				$.sprites.backgrounds[0].pivot.y = $.p.center.y;
				$.sprites.backgrounds[0].pivot.x = (-($.mouse.store.x) * $.anim.backgrounds.coeff) + $.p.winSize.x;

				if ($.isMobile) {
					$.sprites.backgrounds[0].scale.set(1.5, 1.5);
				}

				$.groups.backgrounds.addChild($.sprites.backgrounds[0]);
		};

		return this;
	};

	this.resetSprites = new function(){
		this.images = function(){
			for (var i = 0; i < $.nbSprites.images; i++) {

				// image
				$.sprites.images[i].anchor.set($.anchor.x, $.anchor.y);
				$.sprites.images[i].x = $.p.center.x + (i * $.imageRatio * $.p.winSize.x) - (($.sprites.images[i].width * $.p.scale_sprite)/2);
				if ($.isMobile) {
					$.sprites.images[i].x = $.p.center.x + (i * $.imageRatio * $.p.winSize.x);
				}
				$.sprites.images[i].x /= $.p.scale_sprite;
				$.sprites.images[i].y = $.p.center.y;

				// bordure
				$.sprites.circles[i].clear();
				$.sprites.circles[i].lineStyle(0);
				$.sprites.circles[i].beginFill(0xFFFFFF, 0.5);
				$.sprites.circles[i].drawCircle($.sprites.images[i].x, $.sprites.images[i].y, ($.sprites.images[i].width/2) + 10);
				$.sprites.circles[i].endFill();

				// ombre
				$.sprites.shadows[i].anchor.set($.anchor.x, $.anchor.y);
				$.sprites.shadows[i].scale.set(0.95);
				$.sprites.shadows[i].x = $.sprites.images[i].x + 25;
				$.sprites.shadows[i].y = $.sprites.images[i].y + 25;

				$.sprites.texts[i].x = Math.round($.sprites.images[i].x + $.sprites.images[i].width/2);

				if (i % 2 == 0) { // haut
					$.sprites.texts[i].y = $.sprites.images[i].y - 90;
				}
				else { // bas
					$.sprites.texts[i].y = $.sprites.images[i].y;
				}

				if ($.isMobile) {
					$.sprites.texts[i].x = Math.round($.sprites.images[i].x - $.sprites.images[i].width / 2 - 100);
					$.sprites.texts[i].y = $.sprites.images[i].y + $.sprites.images[i].height * $.p.scale_sprite;
				}

				$.subgroup[i].tx = 0;
				$.subgroup[i].ty = 0;
				$.subgroup[i].hitArea = new PIXI.Circle($.sprites.images[i].x, $.sprites.images[i].y, ($.sprites.images[i].width/2) * 2);

				$.addgroup[i].x = $.sprites.images[i].x;
				$.addgroup[i].y = $.sprites.images[i].y;

				for (var n = 1; n <= $.nbSprites.add[i]; n++)
				{
					var posx = $.addPos[i][n-1].x;
					var posy = $.addPos[i][n-1].y;

					$.sprites.add[i][n - 1].anchor.set(0.5);
					$.sprites.add[i][n - 1].x = posx;
					$.sprites.add[i][n - 1].y = posy;

					$.sprites.add[i][n - 1].originx = posx;
					$.sprites.add[i][n - 1].originy = posy;

					$.sprites.add[i][n - 1].dir = getRand(-1, 1);

					$.sprites.add[i][n - 1].tx = posx;
					$.sprites.add[i][n - 1].ty = posy;
				}
			}
		};
		this.backgrounds = function(){
			$.sprites.backgrounds[0].x = $.p.center.x;
			$.sprites.backgrounds[0].y = $.p.center.y;
			$.sprites.backgrounds[0].pivot.y = $.p.center.y + 100;
			$.sprites.backgrounds[0].pivot.x = (-($.mouse.store.x) * $.anim.backgrounds.coeff) + $.p.winSize.x;

			if ($.isMobile) {
				$.sprites.backgrounds[0].scale.set(1.5, 1.5);
			}
		};

		return this;
	};

	this.renderLoop = function(){
		// if ($.mouse['in'] == false) {
		// 	$.pause = true;
		// }
		// else {
		// 	$.pause = false;
		// }

		if (!$.pause) {

			TweenMax.to($.groups.images, 1, {
				x : $.anim.images.posX,
			});

			// TweenMax.to($.sprites.backgrounds, 2, {
			// 	// x : $.anim.backgrounds.posX,
			// 	// y : $.anim.backgrounds.posY,
			// 	rotation : $.anim.backgrounds.rotate
			// });

			TweenMax.to($.sprites.backgrounds[0].pivot, 2, {
				x : $.anim.backgrounds.pivotX
			});

			TweenMax.to($.sprites.text, 0.5, {
				alpha : $.anim.text.alpha,
				onUpdate : $.anim.text.onUpdate
			});

			TweenMax.to($.subgroup, 2, {
				y : $.anim.subgroup.posY,
				x : $.anim.subgroup.posX
			});

			$.addgroup.forEach(function(group, index){

				TweenMax.to($.sprites.add[index], 1, {
					x : $.anim.addgroup.posX,
					y : $.anim.addgroup.posY,
					alpha : $.anim.addgroup.alpha,
					rotation : $.anim.addgroup.rotation,
					onUpdate : $.anim.addgroup.onUpdate
				});

			});

			$.sprites.text.forEach($.anim.text.posY);

			$.anim.lines.update();

			// $.renderer.render($.stage);
		}

		// requestAnimationFrame($.renderLoop);
	};

	this.render = function(){
		requestAnimationFrame($.render);
		$.renderer.render($.stage);
	};

	this.anim = new function(){
		var self = this;

		this.images = new function(){
			var $img = this;

			this.posX = function(i, target) {
				var ret;
				if ($.mouse.down) {
					ret = $.mouse.store.x + ($.mouse.x - $.mouse.from.x);
				}
				else {
					ret = $.mouse.store.x;
				}

				return ret;
			};

			return this;
		};
		this.backgrounds = new function(){
			var $bg = this;

			$bg.coeff = 0.15;

			this.rotate = function(i, target){
				var ret = 0;
				var rot = 0.025;

				if ($.mouse.direction == 'left') {
					ret = rot;
				}
				else if ($.mouse.direction == 'right') {
					ret = -rot;
				}

				return ret;
			};

			this.pivotX = function(){
				var pivot;
				if ($.mouse.down) {
					pivot = -($.mouse.store.x + ($.mouse.x - $.mouse.from.x));
				}
				else {
					pivot = -($.mouse.store.x);
				}

				var ret = (pivot * $bg.coeff) + $.p.winSize.x;

				return ret;
			};
			this.pivotX2 = function(){
				var pivot;
				if ($.mouse.down) {
					pivot = -($.mouse.store.x + ($.mouse.x - $.mouse.from.x));
				}
				else {
					pivot = -($.mouse.store.x);
				}

				// var tmp  = (Math.abs(pivot) - $bg.bg2.left) / ($.p.winSize.x);
				// console.log(tmp);
				// if (tmp < 0) {
				// 	tmp = 0;
				// }
				// else if (tmp > 1){
				// 	tmp = 1;
				// }
				// var tmp2 = $bg.bg2.left + ((1 - tmp) * $bg.bg2.coeff);

				// var tmp = $.p.center.x + (4 * $.imageRatio * $.p.winSize.x) - ($.sprites.images[4].width);

				// return ((pivot * $bg.coeff) + $.p.winSize.x) - ;

				return pivot + $.p.center.x - ($.sprites.images[4].position.x + ($.p.winSize.x*$.imageRatio)/2);
			};

			return this;
		};
		this.text = new function(){
			var $txt = this;
			$txt.dur = 0.5;
			$txt.del = 0.10;
			$txt.from = 100;
			$txt.to = 75;

			this.onUpdate = function(){
				if ($.mouse.down) {
					$txt.mouse = $.mouse.store.x + ($.mouse.x - $.mouse.from.x);
				}
				else {
					$txt.mouse = $.mouse.store.x;
				}

				$txt.minX = (window.innerWidth * 0.30);
				$txt.maxX = (window.innerWidth * 0.75);
			};
			this.posX = function(i, target){
				return target.x;
			};
			this.posY = function(bloc, i){
				var curX = bloc.x + $txt.mouse + bloc.width/2;
				curX *= $.p.scale_sprite;


				if (curX >= $txt.minX && curX <= $txt.maxX && bloc.children[0].y == $txt.from){
					TweenMax.to(bloc.children[0], $txt.dur, { y : $txt.to });
					TweenMax.to(bloc.children[1], $txt.dur, { y : $txt.to, delay: $txt.del });
					TweenMax.to(bloc.children[2], $txt.dur, { y : $txt.to + bloc.children[0].height + 15, delay: $txt.del*2 });
				}
				else if ((curX <= $txt.minX || curX >= $txt.maxX) && bloc.children[0].y == $txt.to){
					TweenMax.to(bloc.children[0], $txt.dur, { y : $txt.from });
					TweenMax.to(bloc.children[1], $txt.dur, { y : $txt.from, delay: $txt.del });
					TweenMax.to(bloc.children[2], $txt.dur, { y : $txt.from + bloc.children[0].height + 15, delay: $txt.del*2 });
				}

			};
			this.alpha = function(i, target){
				var ret = 0;

				var curX = target.x + $txt.mouse + target.width/2;
				curX *= $.p.scale_sprite;

				if (curX >= $txt.minX && curX <= $txt.maxX) {
					ret = 1;
				}

				return ret;
			};

			return this;
		};
		this.lines = new function(){
			var $line = this;

			this.update = function(){
				for (var i = 0; i < $.nbSprites.images - 1; i++)
				{
					var curX = $.sprites.images[i].x + $.subgroup[i].x;
					var curY = $.sprites.images[i].y + $.subgroup[i].y;

					var nextX = $.sprites.images[i + 1].x + $.subgroup[i + 1].x;
					var nextY = $.sprites.images[i + 1].y + $.subgroup[i + 1].y;

					$.sprites.lines[i].clear();
					$.sprites.lines[i].lineStyle(3, 0xFFFFFF, 1.0);
					$.sprites.lines[i].moveTo(curX, curY);

					if (i % 2 == 0) {
						$.sprites.lines[i].bezierCurveTo(
							curX, curY,
							curX + ((nextX - curX) / 2), $.p.winSize.y * 0.35,
							nextX, nextY
						);
					}
					else {
						$.sprites.lines[i].bezierCurveTo(
							curX, curY,
							curX + ((nextX - curX) / 2), $.p.winSize.y * 0.65,
							nextX, nextY
						);
					}

				}
			};

			return this;
		};
		this.subgroup = new function(){
			var $sub = this;

			this.posY = function(i, target){
				return target.ty;
			};
			this.posX = function(i, target){
				return target.tx;
			};

			return this;
		};
		this.addgroup = new function(){
			var $add = this;
			this.percent = 0.45;

			if (window.innerWidth <= $.mobileWidth) {
				this.percent = 0.20;
			}

			this.onUpdate = function(){
				$add.mouse;

				if ($.mouse.down) {
					$add.mouse = $.mouse.store.x + ($.mouse.x - $.mouse.from.x);
				}
				else {
					$add.mouse = $.mouse.store.x;
				}

				$add.minX = ($.p.winSize.x * $add.percent) / $.p.scale_sprite;
				$add.maxX = ($.p.winSize.x * (1 - $add.percent)) / $.p.scale_sprite;

			};
			this.posY = function(id, target){
				return target.ty;
			};
			this.posX = function(id, target){
				return target.tx;
			};
			this.scale = function(target, ret){
				TweenMax.to(target.scale, 0.5, {
					x : ret,
					y : ret
				});
			};
			this.alpha = function(id, target){
				// var ret = 0;
				//
				// var curX = target.x + $add.mouse + target.parent.x;
				//
				// if (curX >= $add.minX && curX <= $add.maxX) {
				// 	ret = 1;
				// }

					var ret = 1;

					var curX = target.x + $add.mouse + target.parent.x;

					if (curX < $add.minX) // out left
					{
						ret *= (curX / $add.minX);
					}
					else if (curX > $add.maxX) // out right
					{
						var tmp = $.p.winSize.x * (1 - $add.percent);

						ret *= 1 - ( (curX - tmp) / $add.minX );
					}

					if (ret <= 0) {
						ret = 0;
					}

					// $add.scale(target, ret * $.p.scale_sprite);
				$add.scale(target, ret);

				return 1;
			};
			this.rotation = function(id, target){
				var ret = 0.70;

				var curX = target.x + $add.mouse + target.parent.x;

				// if (curX >= $add.minX && curX <= $add.maxX) {
				// 	ret = -ret;
				// }

				if (curX < $add.minX) // out left
				{
					ret *= (curX / $add.minX);
				}
				else if (curX > $add.maxX) // out right
				{
					var tmp = $.p.winSize.x * (1 - $add.percent);

					ret *= 1 - ( (curX - tmp) / $add.minX );
				}

				return ret - 0.35;
			};

			return this;
		};

		return this;
	};

	return this;
};
