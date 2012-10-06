module.exports = (function(){
  var result = {
    /* Execute a given JSON AST */
    evaluate: function(ast, context) {
      var buf='';
      for(var i=0;i<ast.length;i++) {
        var part = ast[i];
        for(var j=0;j<part.length;j++) {
          var node = part[j];
          if(node && node.length==2) {
            if(node[0] == 'buf') {
              buf += node[1];
            } else if(node[0] == 'tag') {
              buf += context[node[1]];
            }
          }
        }
      }
      return buf;
    }
  };
  return result;
})();
