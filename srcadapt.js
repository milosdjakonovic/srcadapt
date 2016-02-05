/**
 * --------------------------------------
 * -------------- srcadapt --------------
 * --------------------------------------
 * @description Easy and lightweight responsive image tool
 * @author      Milos Djakonovic ( @Miloshio )
 * @license     Licensed under the MIT license
 * --------------------------------------
**/

(function(win,doc){

    function _a(array,method){
      //if(Object.prototype.toString.call(array) !== '[object Array]') throw new Error('Fatal: _a method accepts only arrays.');
      var templ=array.length;
      for(var i=0;i<templ;i++){
        method.call(this, i, array[i] );
      }
    }

    function _o(object, method){
      for(var property in object){
        method.call(this, object[property], property);
      }
    }
    
    function inarray(a,b){
        
        if( Array.prototype.indexOf ){
            return !!~a.indexOf(b)
        }
        
        var t=a.length; 
        for(i=0;i<t;i++){
            if(a[i] === b) return true
        } 
        return false 
    }
    
    /**
     * Modernizr, thank you
    **/
    function is(obj, type) {
        return typeof obj === type
    }   
    
    var
        body   = doc.body || doc.getElementsByTagName('body')[0],
        doel   = doc.documentElement,
        
        //width  = Math.max(doel.clientWidth, win.innerWidth || 0),
		width  = (function(){
			if(win.innerWidth) return win.innerWidth; 
			else return doel.clientWidth
		})(),
		
		nativemq = (function(){
			return ('matchMedia' in win) ? true : false 
		} )(),

        isMaxWidth = function(num){
			if(nativemq)
				return win.matchMedia('(max-width: ' + num + 'px)').matches;
            return num >= width
        },
        
        isMinWidth = function(num){
			if(nativemq)
				return win.matchMedia('(min-width: ' + num + 'px)').matches;
            return num <= width
        },
        
        
        /**
         *
         * gets all available attrs
         * @return ['data-xs','data-sm','data-md','data-lg']....
         *
        **/
        getAllAvailable = function(node){ //BUG. Here I get: regular img  element, HTML collection and undefined. Bug is not here.
            var available = [];
            _a(['xs','sm','md','lg'], function(index, member){
                var attr = node.getAttribute('data-' + member);
                if( is(attr, 'string') && !attr=='0' ){
                    available.push( 'data-' + member);
                }
            });
            return available;
        },
        
        /**
         *
         * gets what ( best! ) matches according to viewport width and provided images
         * @return 'data-xs' | 'data-sm' | 'data-md' | 'data-lg'
         *
        **/
        getApplicable = function(node){
            var available = getAllAvailable(node),
                _return;
            
            _a( available, function(index, member){
                if( member==='data-xs' && isMaxWidth(767) ) {_return = 'data-xs';}
                if( member==='data-sm' && isMinWidth(768) ) {_return = 'data-sm';}
                if( member==='data-md' && isMinWidth(992) ) {_return = 'data-md';}
                if( member==='data-lg' && isMinWidth(1200)) {_return = 'data-lg';}
            });            
            
            return _return;
        
        },
        
        /**
         * 
         * adapts single <img> Element
         *
        **/
        adapt = function(node){
            var attrib = getApplicable(node),
            newsrc = node.getAttribute(attrib);
            if(node.src !== newsrc)
            node.src = newsrc;
        },
        /**
         * 
         * routes single element or NodeList
         * to adapt()
        **/
        doJob = function(nodeorcoll){
			if(nodeorcoll.nodeName){
				adapt(nodeorcoll);
			} else {
				//_a(nodeorcoll, function(i,member){ adapt(member) }  ); UGH
				var templen = nodeorcoll.length;
				for(var i=0; i<templen; i++){
					adapt(nodeorcoll[i])
				}
			}
        },
        /**
         * 
         * main method exposed to global
         * takes params and conducts actions
		 * for now only one param
		 *
        **/        
        srcadapt = function(nodeorselector, params){
            if(nodeorselector.nodeName){
                //node
                doJob(nodeorselector);
            } else {
                doJob(body.querySelectorAll(nodeorselector));
            }
        },
		/**
		 *
		 * get all current srcadapt images by querying the DOM
		 * TODO: mechanism to cache all prev processed imgs locally
		 * and retrieve them from local variable (e.g. without querying the DOM)
		**/
		getSrcadaptImgs = function(){
			if(Element.prototype.getElementsByClassName)
				return doel.getElementsByClassName('srcadapt');
			else return doel.querySelectorAll('.srcadapt');
		},
		
        updateAll = function(){
			if(!nativemq)
				width = (function(){
					if(win.innerWidth) return win.innerWidth; 
					else return doel.clientWidth 
				})();

			var srcadaptImgs = getSrcadaptImgs();
			doJob(srcadaptImgs);
        },
		
		tout,
		
		resizeHandler = function(){
			win.clearTimeout(tout);
			tout = win.setTimeout(updateAll,34);//approx two frames...
		}
		;
        
        if(win.addEventListener){
			win.addEventListener( 'resize',              resizeHandler, false);
			win.addEventListener( 'orientationchange',   resizeHandler, false);
		}
        else
            win.attachEvent( 'onresize', resizeHandler ); //we won't listen for orientationchange in IE8
	
    //leech srcadapt to global namespace
    win.srcadapt = srcadapt;
})(window,document);