module.exports = (function(){

  var _templates = {};

  var result = {
    /* Execute a given JSON AST */
    evaluate: function (ast, context) {
      if(!(ast && ast instanceof Array)) {
        // for now assume it has partials
        _templates = ast;
        ast = _templates['main'] || ast;
      }
      return evalContext(ast, context);
    }
  };

  /*
   * Function to evaulate a context
   *  ast - [ array of ops ]
   *  - each ops
   *    - buf (data buffer)
   *    - var (variable from context)
   *    - inc (include another template)
   *    - blk (block of template)
   */
  function evalContext(ast, context) {
    var buf='';
    if(typeof(context)=='function') {
      //console.log(ast);
    }
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
        } else if(node[0]=='var' || node[0]=='esc') {
          // --- variables
          // [ 'var', 8, 'name' ]
          var val = context.hasOwnProperty(node[2]) ? context[node[2]]: '';          
          buf += (node[0]=='var'?escapeHtml(val):val);
        } else if(node[0]=='inc') {
          // ---- partials
          // included partial to be loaded
          // [ 'inc', 23, 'replace' ]
          buf += evalContext(_templates[node[2]], context);
         } else if(node[0]=='blk') {
           // ---- sections
           // [ 'blk', 0, 'secname', [Object] ] 
           // node[3] is the ast
           // node[2] should be the section name
           
           // check if the context value is false or empty
           var presence = context.hasOwnProperty(node[2]) ? context[node[2]] : false;
           presence = presence instanceof Array ? presence.length>0 : presence;
           if(presence) {
             var loopContext = context[node[2]];
             loopContext = loopContext instanceof Array?loopContext:[loopContext];
             for(var cidx=0;cidx<loopContext.length;cidx++) {
               var ctxt = loopContext[cidx];
               //console.log(node[2]);
               //console.log(ctxt);
               buf += evalContext(node[3], ctxt);
             }
           }
         } else {
           console.log('*** unknown tag **** ' + node[0]);
         }
      }
    }
    return buf;
  };

  /* Utility functions */
  // following copied from underscore.js
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
  function escapeHtml(string) 
  {
    return ('' + string).replace(htmlEscaper, function(match) {
      return htmlEscapes[match];
    });
  }

  return result;
})();
