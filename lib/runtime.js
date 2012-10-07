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
    var astEntries=ast.length;
    var i;
    for(i=0;astEntries--;i++) {
      var node = ast[i];
      if(node && node.length>=2) {
        if(node[0] == 'buf') {
          buf += node[1];
        } else if(node[0] == 'var') {
          buf += context[node[1]];
        } else if(node[0] == 'inc') {
          // included partial to be loaded
          // [ 'inc', [ 'var', 'replace' ] ]
          // node[1][1] is the partial name
          buf += evalContext(_templates[node[1][1]], context);
        } else if(node[0] == 'blk') {
          // node[2] is the ast
          // node[1][0] should be 'var'
          // node[1][1] should be the context name
          var loopContext = context[node[1][1]];
          loopContext = loopContext && loopContext instanceof Array?loopContext:[loopContext];
          for(var cidx=0;cidx<loopContext.length;cidx++) {
            var ctxt = loopContext[cidx];
            //console.log(node[2]);
            //console.log(ctxt);
            buf += evalContext(node[2], ctxt);
          }
        }
      }
    }
    return buf;
  };

  return result;
})();
