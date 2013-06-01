/*
 * bigote - translate AST to javascript
 */
module.exports = (function(){

  var _templates = {};

  var result = {
    /* convert to JS
     * 
     * format would be
     *   {'main': {'ast': ... ast ... , 'source': ... source text ... }, partials ... }
     */
    convert: function (ast) {
      if(ast) { 
        _templates = ast;
        // get the main to start
        //return "this.render = function(context) { " + translate(ast['main']['ast'], {} , 'main') + "; };";
        console.log(translate(ast['main']['ast'], {} , 'main'));
        return new Function("context", translate(ast['main']['ast'], {} , 'main') + ";");
      }
      return '<empty or null template>';
    }
  };

  // not yet supported
  function render(text)  {
    console.log('render not yet supported');
    return text;
  }

  /*
   * Function to translate AST
   *  ast - [ array of ops ]
   *  - each ops
   *    - buf (data buffer)
   *    - var (variable from context - needs HTML escaping)
   *    - val (variable from context - no escaping)
   *    - inc (include another template)
   *    - blk (block of template)
   */
  function translate(ast, context, module) {
    var buf='';
    if(!ast) return buf;
    buf = 'return ';
    for(var i=0,astlen=ast.length;i<astlen;i++) {
      var node = ast[i];
      if(i>0) buf+=' + ';
      if(node && node.length>=3) {
        // array element with type, offset, value
        if(node[0]=='buf') {
          // [ 'buf', 14, '! You have ' ]
          buf += '\'' + escape(node[2]) + '\'';
        } else if(node[0]=='var' || node[0]=='val') {
          // to handle 
          //  - function
          //  - .
          //  - absence of vars
          var tmp = "context." + node[2];
          if(node[0]=='var') {
            // escape html
            tmp+=" && " + tmp + '.replace(/&/mg,\'&amp;\').replace(/</mg,\'&lt;\').replace(/>/mg,\'&gt;\').replace(/\"/mg,\'&quot;\')';
          } 
          tmp = "(" + tmp + ") || \'\'";
          buf += "(" + tmp + ")";
        } else if(node[0]=='inc') {
          // ---- partials
          // included partial to be loaded
          // [ 'inc', 23, 'replace' ]
          buf += evalContext(_templates[node[2]]['ast'], context, node[2]);
         } else if(node[0]=='blk' || node[0]=='not') {
           // ---- sections
           // [ 'blk', 0, pos1, pos2, 'secname', [Object] ] 
           // pos1 - start offset pos in the source
           // pos2 - end offset pos in the source
           // node[5] is the ast
           // node[4] should be the section name
           
           // check if the context value is false or empty
           var section = context[node[4]];
           var presence = section || false;
           // check if its an array, if so, length of the array would
           // determine context
           presence = presence instanceof Array ? presence.length>0 : presence;
           // if presence is a function, check if the function
           // returns true/false 
           if(typeof(presence)=='function') {
             presence=section=context[node[4]]();
           }
           if(presence && node[0]=='blk') {
             section = section instanceof Array?section:[section];
             for(var cidx=0;cidx<section.length;cidx++) {
               var ctxt = section[cidx];
               if(typeof(ctxt)=='function') {
                 // setup the render function
                 this.render = render;
                 this.context = context;
                 this.source = _templates[module]['source'].substr(node[2], (node[3]-node[2]));
                 this.ast = node[5];
                 buf += ctxt(this.source, this.render);
               } else {
                 buf += evalContext(node[5], typeof(ctxt)=='boolean'?context:ctxt, module);
               }
             }
           } else if(node[0]=='not' && !presence) {
             buf += evalContext(node[5], context, module);
           }
         } else if(node[0]=='rem') {
           // just ignore comments
         } else {
           console.log('*** unknown tag **** ' + node[0]);
         }
      }
    }
    return buf;
  };

  function escape(str) {
    // TODO: escape %x75 4HEXDIG ?? chars
    return str
      .replace(/[\"]/g, '\\"')
      .replace(/[\\]/g, '\\\\')
      .replace(/[\/]/g, '\\/')
      .replace(/[\b]/g, '\\b')
      .replace(/[\f]/g, '\\f')
      .replace(/[\n]/g, '\\n')
      .replace(/[\r]/g, '\\r')
      .replace(/[\t]/g, '\\t')
    ; };

  return result;
})();
