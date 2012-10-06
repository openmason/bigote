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
   *  - [ array of ops ]
   *  - each ops
   *    - buf (data buffer)
   *    - var (variable from context)
   */
  function evalContext(ast, context) {
    var buf='';
    for(var i=0;i<ast.length;i++) {
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
        } else if(node[0] == 'loop') {
          // node[2] is the ast
          // node[1][0] should be 'var'
          // node[1][1] should be the context name
          var loopContext = context[node[1][1]];
          //console.log(loopContext instanceof Array);
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
