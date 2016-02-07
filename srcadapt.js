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

    //simple array iterator
    function _a(array,method){
      var templ=array.length;
      for(var i=0;i<templ;i++){
        method.call(this, i, array[i] );
      }
    }
    //obj iterator
    function _o(object, method){
      for(var property in object){
        method.call(this, object[property], property);
      }
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
    /*onAdapt callbacs*/
    onAdaptPool = [],
        
    /**
     *
     * Exposed to global
     * this fn inserts callback parameter
     * into onAdaptPoll
     * @param callback - function
     *
    **/
    onAdapt = function(callback){
        onAdaptPool.push(callback);
    },
    /**
     *
     * Exposed to global
     * this fn removes callback parameter
     * from onAdaptPoll
     * @param callback - function
     *
    **/
    offAdapt = function(callback){
        var i;
        if( Array.prototype.indexOf){
            i = onAdaptPool.indexOf(callback);
        } else {
            _a(onAdaptPool, function(index,member){
                if( callback === member) i = index;
            });
        }
        if(i>-1){
            onAdaptPool.splice(i,1);
        }
    },
    /**
     *
     * fire every callback
     * from onAdaptPoll
     * @param node   - which node(img element) was adapted
     * @param attrib - attr name
     *
    **/
    adapted = function(node, attrib){
        _a(onAdaptPool, function(i,member){
            member.call(this, node, attrib)
        });
    },

    /**
     *
     * adapts single <img> Element
     *
    **/
    adapt = function(node){
        var attrib = getApplicable(node),
        newsrc = node.getAttribute(attrib);
        //tricky part. Inserting relative URL to img src results in
        if(node.src !== newsrc && node.src !== doc.location.href + newsrc ){
            node.src = newsrc;
            adapted(node, attrib);
        }
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

    isElement = function(obj){
         return (
            typeof HTMLElement === "object" ? obj instanceof HTMLElement :
            obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName==="string"
        );
    },


    isHTMLCollection = function(obj){
        return isElement(obj[0])
    },
    /**
     *
     * main method exposed to global
     * takes params and conducts actions
     * for now only one param
     *
    **/
    srcadapt = function(nodeorselector, params){
        if( isElement(nodeorselector) ){
            //node
            doJob(nodeorselector);
        } else if( isHTMLCollection(nodeorselector) ){
            var templen = nodeorselector.length;
            for(var i=0; i<templen; i++){
                adapt(nodeorselector[i])
            }
        } else {
            //selector string
            //we are passing to qSA
            doJob( doel.querySelectorAll(nodeorselector) )
        }
    },
    /**
     *
     * get all current srcadapt images by querying the DOM
     * TODO: mechanism to cache all prev processed imgs locally
     * and retrieve them from local variable (e.g. without querying the DOM)
     * @return Element | HTMLCollection
    **/
    getSrcadaptImgs = function(){
        if(Element.prototype.getElementsByClassName)
            return doel.getElementsByClassName('srcadapt');
        else return doel.querySelectorAll('.srcadapt');
    },
    /**
     *
     * update all images
     * i.e. doJob to all srcadapt images
     *
    **/
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

    resizeHandler = function(e){
        if(e.type && e.type==='orientationchange') {
            // IMHO there is no need to debounce orientationchange event
            updateAll();
            return;
        }
        win.clearTimeout(tout);
        tout = win.setTimeout(updateAll,34);//approx two frames...
    }
    ;

    srcadapt.all = function(){
        var srcadaptImgs = getSrcadaptImgs();
        doJob(srcadaptImgs);
    }

    srcadapt.onAdapt  = onAdapt;
    srcadapt.offAdapt = offAdapt;

    if(win.addEventListener){
        win.addEventListener( 'resize',              resizeHandler, false);
        win.addEventListener( 'orientationchange',   resizeHandler, false);
    }
    else
        win.attachEvent( 'onresize', resizeHandler ); //we won't listen for orientationchange in IE8
	
    //leech srcadapt to global namespace
    win.srcadapt = srcadapt;
})(window,document);
