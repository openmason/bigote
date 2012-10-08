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
   * Given a ast, produce the original string
   * text
   */
  function originalText(ast) {
    var buf='';
    for(var i=0;i<ast.length;i++) {
      var node=ast[i];
      if(node && node.length>=2) {
        switch(node[0]) {
          case 'buf': buf+=node[1]; break;
          case 'var': buf+='{{'+node[1]+'}}'; break;
          case 'inc': buf+='{{>'+node[1][1]+'}}'; break;
          case 'blk': buf+='{{#'+node[1][1]+'}}'+originalText(node[2])+'{{/'+node[1][1]+'}}'; break;
          default: console.log('*** unknown ast ' + ast); break;
        }
      }
    }
    return buf;
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
      //console.log(originalText(ast));
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
        } else if(node[0]=='var') {
          // [ 'var', 8, 'name' ]
          buf += context[node[2]];
        } else if(node[0]=='inc') {
           // included partial to be loaded
           // [ 'inc', 23, [ 'var', 23, 'replace' ] ]
           // node[2][2] is the partial name
           buf += evalContext(_templates[node[2][2]], context);
         } else if(node[0]=='blk') {
           // [ 'blk', 0, [Object], [Object] ] 
           // node[2] is the ast
           // node[2][0] should be 'var'
           // node[2][2] should be the context name
           var loopContext = context[node[2][2]];
           loopContext = loopContext && loopContext instanceof Array?loopContext:[loopContext];
           for(var cidx=0;cidx<loopContext.length;cidx++) {
             var ctxt = loopContext[cidx];
             //console.log(node[2]);
             //console.log(ctxt);
             buf += evalContext(node[3], ctxt);
           }
         } else {
           console.log('*** unknown tag **** ' + node[0]);
         }
      }
    }
    return buf;
  };

  return result;
})();
