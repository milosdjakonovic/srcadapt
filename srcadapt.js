/*
*

USAGE
<img src="" data-xs="" data-sm="" data-md="" data-""
srcadapt('.selector' | Element, { force:false, delay:0 });

*/
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
        return typeof obj === type;
    }   
    
    var
        body   = doc.body || doc.getElementsByTagName('body')[0],
        doel   = doc.documentElement,
        
        width  = Math.max(doel.clientWidth, win.innerWidth || 0),

        isMaxWidth = function(num){
            return num > width
        },
        
        isMinWidth = function(num){
            return num < width
        },
        
        
        /**
         *
         * gets all available attrs
         * @return ['data-xs','data-sm','data-md','data-lg']....
         *
        **/
        getAllAvailable = function(node){
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
         * gets what matches according to viewport width
         * @return 'data-xs' | 'data-sm' | 'data-md' | 'data-lg'
         *
        **/
        getApplicable = function(node){
            var available = getAllAvailable(node),
                _return;
            
            _a( available, function(index, member){
                if( member==='data-xs' && isMaxWidth(767) )                     {_return = 'data-xs'; return}
                if( member==='data-sm' && isMinWidth(768) && !isMinWidth(992) ) {_return = 'data-sm'; return}
                if( member==='data-md' && isMinWidth(992) && !isMinWidth(1200)) {_return = 'data-md'; return}
                if( member==='data-lg' && isMinWidth(1200))                     {_return = 'data-lg'; return}
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
        
        doJob = function(nodeorcoll){
            if(Object.prototype.toString.call(nodeorcoll)==="[object NodeList]"){
                _a(nodeorcoll, adapt);
            } else {
                // -- --
                adapt(nodeorcoll);
            }
        },
        
        srcadapt = function(nodeorselector,params){
            if(nodeorselector.nodeName){
                //node
                doJob(nodeorselector);
            } else {
                doJob(body.querySelectorAll(nodeorselector));
            }
        },
        //For now, it seems to me that this function may run unbounced,
        //because of inexpensiveness of calculation
        //or maybe I'm wrong
        
        //ok, I'm wrong
        updateDimension = function(){
            width  = Math.max(doel.clientWidth, win.innerWidth || 0);
        }
        
        if(win.addEventListener)
            win.addEventListener('resize',   updateDimension, false);
        else 
            win.attachEvent     ('onresize', updateDimension       );
    
    win.srcadapt = srcadapt;
})(window,document);