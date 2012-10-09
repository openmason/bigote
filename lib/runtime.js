module.exports = (function(){

  var _templates = {};

  var result = {
    /* Execute a given JSON AST 
     * 
     * format would be
     *   {'main': {'ast': ... ast ... , 'source': ... source text ... }, partials ... }
     */
    evaluate: function (ast, context) {
      if(ast && ast.hasOwnProperty('main')) {
        // get the main to start
        _templates = ast;
        ast = _templates['main']['ast'];
        var source = _templates['main']['source'];
        return evalContext(ast, context, source);
      }
      return '<no starting point to run>';
    }
  };

  function render(text)  {
    if(text==this.source) {
      return evalContext(this.ast, this.context, this.source);
    }
    // for now, there is no compilation on
    // modified sources
    return text;
  }

  /*
   * Function to evaulate a context
   *  ast - [ array of ops ]
   *  - each ops
   *    - buf (data buffer)
   *    - var (variable from context - needs HTML escaping)
   *    - val (variable from context - no escaping)
   *    - inc (include another template)
   *    - blk (block of template)
   */
  function evalContext(ast, context, source) {
    var buf='';
    var i=0;
    var maxNodes=ast.length;
    while(maxNodes--) {
      var node = ast[i++];
      if(node && node.length>=3) {
        //type = node[0];
        //offset = node[1];
        //value = node[2];
        //console.log(type, offset, value);

        if(node[0]=='buf') {
          // [ 'buf', 14, '! You have ' ]
          buf += node[2];
        } else if(node[0]=='var' || node[0]=='val') {
          // --- variables
          // [ 'var', 8, 'name' ]
          var val = context.hasOwnProperty(node[2]) ? context[node[2]]: '';          
          buf += (node[0]=='var'?escapeHtml(val):val);
          //buf+=val;
        } else if(node[0]=='inc') {
          // ---- partials
          // included partial to be loaded
          // [ 'inc', 23, 'replace' ]
          var ast1 = _templates[node[2]]['ast'];
          var source1 = _templates[node[2]]['source'];          
          buf += evalContext(ast1, context, source1);
         } else if(node[0]=='blk' || node[0]=='not') {
           // ---- sections
           // [ 'blk', 0, pos1, pos2, 'secname', [Object] ] 
           // node[5] is the ast
           // node[4] should be the section name
           
           // check if the context value is false or empty
           var presence = context.hasOwnProperty(node[4]) ? context[node[4]] : false;
           presence = presence instanceof Array ? presence.length>0 : presence;
           if(presence && node[0]=='blk') {
             var loopContext = context[node[4]];
             loopContext = loopContext instanceof Array?loopContext:[loopContext];
             for(var cidx=0;cidx<loopContext.length;cidx++) {
               var ctxt = loopContext[cidx];
               if(typeof(ctxt)=='function') {
                 // setup the render function
                 this.render = render;
                 this.context = context;
                 this.source = source.substr(node[2], (node[3]-node[2]));
                 this.ast = node[5];
                 buf += ctxt()(this.source, this.render);
               } else {
                 buf += evalContext(node[5], ctxt, source);
               }
             }
           } else if(!presence && node[0]=='not') {
             buf += evalContext(node[5], context, source);
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

  /* Utility functions */
  // following copied from dust.js & underscore.js
  // List of HTML entities for escaping.
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };

  // Regex containing the keys listed immediately above.
  var htmlEscaper = /[&<>"'\/]/g;
  var HTMLChars = new RegExp(htmlEscaper);
  function escapeHtml(s) 
  {
    if(typeof s === 'string') {
      if(!HTMLChars.test(s)) {
        return s;
      }
      return s.replace(htmlEscaper, function(match) {
        return htmlEscapes[match];
      });
    }
    return s;
  }

  return result;
})();
