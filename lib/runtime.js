module.exports = (function(){
  var result = {
    /* Execute a given JSON AST */
    evaluate: evalContext
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
        } else if(node[0] == 'loop') {
          // node[2] is the ast
          // node[1][0] should be 'var'
          // node[1][1] should be the context name
          var loopContext = context[node[1][1]];
          //console.log(loopContext);
          loopContext = loopContext.isArray?loopContext:[loopContext];
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
