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
    
    /**
     * Modernizr, thank you
    **/
    function is(obj, type) {
        return typeof obj === type;
    }   
    
    var native = ( function(){return ('matchMedia' in win) ? true : false } )(),
        body   = doc.body || d.getElementsByTagName('body')[0],
        doel   = doc.documentElement,
        
        width  = Math.max(doel.clientWidth, win.innerWidth || 0),
        //height = Math.max(doel.clientHeight, win.innerHeight  || 0),
        
        getAllAvailable = function(node){
            var available = [];
            _a(['xs','sm','md','lg'], function(index, member){
                var attr = node.getAttribute('data-' + member);
                if( is(attr, 'string') && !attr==='0' ){
                    available.push(attr);
                }
            });
            return available;
        },
        
        getApplayable = function(node){
            var available = getAllAvailable(node);
            //let's say, viewport is 960px... how to check
            /**
             * xs - maxwidth 767px isMaxWidth767() return attr
             * sm - minwidth 768   isMinWidth768() && !isMinWidth992() && !isMinWidth1200()
             * md - minwidth 992   isMinWidth992() && !isMinWidth1200()
             * lg - minwidth 1200  isMinWidth1200()
            **/
            
        },
        
        viewport2attrib = function(node){
            var availableimgs = getApplayable(node), // example [ 'xs', 'md', 'lg']
                u = 'undefined';
            if( ! is(availableimgs['lg'], u) ) return 'lg';
            if( ! is(availableimgs['md'], u) ) return 'md';
            if( ! is(availableimgs['sm'], u) ) return 'sm';
            if( ! is(availableimgs['xs'], u) ) return 'xs';
        },
        
        adapt = function(node){
            var attrib = 'data-' + viewport2attrib(node),
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
        }
    
    
    win.srcadapt = srcadapt;
})(window,document);