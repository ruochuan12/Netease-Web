var $ = (function(){
	/**
	 * [getEleById 通过id获取元素]
	 * @param  {[type]} id [id]
	 */
	function getEleById(id){
		return document.getElementById(id);
	}
	/**
	 * 通过class获取元素
	 * @param  {[type]} element [元素节点]
	 * @param  {[type]} names   [class样式]
	 */
    function getEleByClass(element, names) {
	    if (element.getElementsByClassName) { //特性侦测
	      return element.getElementsByClassName(names);
	    } else {
	      var elements = element.getElementsByTagName('*');
	      var result = [];
	      var element,
	          classNameStr,
	          flag;
	      names = names.split(' ');
	      for (var i = 0; element = elements[i]; i++) {
	          classNameStr = ' ' + element.className + ' ';
	          flag = true;
	          for (var j = 0, name; name = names[j]; j++) {
	              if (classNameStr.indexOf(' ' + name + '') == -1){
	                  flag = false;
	                  break;
	              }
	          }
	          if (flag) {
	              result.push(element);
	          }
	      }
	      return result;
	  	}
	}
	/**
	 * [bindEvent 事件绑定]
	 * @param  {[type]}   obj    [元素节点]
	 * @param  {[type]}   evname [时间名称]
	 * @param  {Function} fn     [回调函数]
	 */
	function bindEvent(obj, evname, fn) {
		if (obj.addEventListener) {
		  obj.addEventListener(evname, fn, false);
		} else {
		  obj.attachEvent('on' + evname, function() {
		    fn.call(obj);
		  });
		}
	}
	/**
	 * 获取样式
	 * @param  {[type]} obj  [元素节点]
	 * @param  {[type]} name [样式]
	 * @return {[type]}      [description]
	 */
	function getStyle(obj, name) {
	    if (obj.currentStyle) {
	        return obj.currentStyle[name];
	    } else {
	        return getComputedStyle(obj, false)[name];
	    }
	}
	/**
	 * 运动
	 * @param  {[type]} obj   [元素]
	 * @param  {[type]} json  [样式json]
	 * @param  {[type]} fnEnd [回调函数]
	 * @return {[type]}       [description]
	 */
	function animateMove(obj, json, fnEnd) {
	    function move() {
	        var bStop = true; //假设：所有值都已经到了
	        for (var attr in json) {
	            var cur = 0;
					if (attr == 'opacity') {
						cur = Math.round(parseFloat(getStyle(obj, [attr])) * 100); //四舍五入
					} else {
						cur = parseInt(getStyle(obj, [attr]));
					};
					var speed = (json[attr] - cur) / 3;
					//记得取整
					speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);	
					if (cur != json[attr]) {	
						bStop = false;
					};	
					if (attr == 'opacity') {
						obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
						obj.style.opacity = (cur + speed) / 100;					
					} else {	
						obj.style[attr] = cur + speed + 'px';	
					};
	        };
				if (bStop == true) { //也可以写成if(bStop)
					clearInterval(obj.timer);				
					if (fnEnd) fnEnd();				
				};
	    };
	    clearInterval(obj.timer);
	    obj.timer = setInterval(move, 30);
	}
	/**
	 * [textContent 节点内容]
	 * @param  {[type]} obj [元素节点]
	 */
	function textContent(obj){
		if(obj.textContent){
			return obj.textContent;
		}else{
			obj.innerText;
		}
	}

	/**
	 * 获取cookie
	 * @return {[object]} [cookie]
	 */
	function getCookie(){
		var cookie = {};
		var all =document.cookie;
		if(!all) return cookie;
		var list = all.split('; ');
		for(var i=0,len = list.length;i<len;i++){
			var item = list[i];
			var p = item.indexOf('=');
			var name = item.substring(0,p);
			name = decodeURIComponent(name);
			var value = item.substring(p+1);
			value = decodeURIComponent(value);
			cookie[name] = value;
			return cookie;

		}

	}
	/**
	 * [setCookie 设置cookie]
	 * @param {[type]} name    [cookie名]
	 * @param {[type]} value   [cookie值]
	 * @param {[type]} expires [失效时间]
	 * @param {[type]} path    [作用路径]
	 * @param {[type]} domain  [作用域]
	 * @param {[type]} secure  [https协议时生效]
	 */
	function setCookie(name,value,expires,path,domain,secure){
		var cookie = encodeURIComponent(name)+'='+encodeURIComponent(value);
		if(expires instanceof Date){
			cookie+='; expires='+expires.toGMTString();
		}
		if(path){
			cookie +='; path='+path;
		}
		if(domain){
			cookie +='; domain='+domain;
		}
		if(secure){
			cookie += '; secure';
		}
		document.cookie = cookie;

	};
	/**
	 * [trim 去除空格]
	 * @param  {[type]} str [字符串]
	 * @return {[type]}     [description]
	 */
	function trim(str){
		return str.replace(/^\s+|\s+$/g,'');
	}













	return {
		getEleById 			: getEleById,
		getEleByClass		: getEleByClass,
		bindEvent			: bindEvent,
		animateMove			: animateMove,
		getCookie			: getCookie,
		setCookie			: setCookie,
		trim				: trim,
	};


})();