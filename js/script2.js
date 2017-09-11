window.$$ = new function(){
	var _this = this;

	this.first = function(el){return document.body.querySelector(el);};
	this.all   = function(el){return document.body.querySelectorAll(el);};
	this.id    = function(el){return document.getElementById(el);};
	this.class = function(el){return document.getElementsByClassName(el);};
	this.tag   = function(el){return document.getElementsByTagName(el);};
	this.name   = function(el){return document.getElementsByName(el)[0];};

	this.ready = function(func){
		document.addEventListener('DOMContentLoaded', func);
	};

	this.scroll = function(func){
		document.addEventListener('scroll', func);
	};

	this.exist = function(el){
		var x = _this.first(el);

		if (x)
			return true;
		else
			return false;
	};

	this.inView = function (elm, threshold, mode) {
		threshold = threshold || 0;
		mode = mode || 'visible';

		var rect = elm.getBoundingClientRect();
		var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
		var above = rect.bottom - threshold < 0;
		var below = rect.top - viewHeight + threshold >= 0;

		return mode === 'above' ? above : (mode === 'below' ? below : !above && !below);
	};

	this.ajax = new function(){
		var $ = this;
		this.parseData = function(data){
			if(data && data.constructor.name == 'FormData'){
				$.dataUrl = data;
			}else{
				$.xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				$.dataUrl = [];
				for(key in data){
					$.dataUrl.push(key + '=' + encodeURIComponent(data[key]));
				}
				$.dataUrl = $.dataUrl.join('&');
			}
		};
		this.get = function(url, data){
			$.xhttp = new XMLHttpRequest();
			$.parseData(data);
			$.xhttp.open('GET', url + '?' + $.dataUrl, true);
			$.xhttp.send();
			return $.promise;
		};
		this.post = function(url, data){
			$.xhttp = new XMLHttpRequest();
			$.xhttp.open('POST', url, true);
			$.parseData(data);
			$.xhttp.send($.dataUrl);
			return $.promise;
		};
		this.upload = function(url, file, name){ // works only from IE10
			$.formData = new FormData();
			$.formData.append(name, file, file.name);
			$.xhttp = new XMLHttpRequest();
			$.xhttp.open('POST', url, true);
			$.xhttp.send($.formData);
			return $.promise;
		};
		this.promise = new function(){
			this.then = function(callback){
				$.xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						callback(this.responseText);
					}
				};
			};
			return this;
		};
		return this;
	};

	return this;
};

HTMLElement.prototype.styles = function(styles){
	for (var i in styles)
		this.style[i] = styles[i];
};
HTMLElement.prototype.on = function(e, func){
	this.addEventListener(e, func);
};
HTMLElement.prototype.removeChilds = function(){
	while(this.firstChild)
		this.removeChild(this.firstChild);
};
NodeList.prototype.forEach = Array.prototype.forEach;
