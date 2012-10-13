module.exports = (function(){

  var _templates = {};

  var result = {
    /* Execute a given JSON AST 
     * 
     * format would be
     *   {'main': {'ast': ... ast ... , 'source': ... source text ... }, partials ... }
     */
    evaluate: function (ast, context) {
      if(ast) { 
        _templates = ast;
        // get the main to start
        return evalContext(ast['main']['ast'], context, 'main');
      }
      return '<empty or null template>';
    }
  };

  // for now, there is no compilation on
  // modified sources
  // -- assumed that the text was the block
  //    that was forwarded to function
  function render(text)  {
    return evalContext(this.ast, this.context, this.module);
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
  function evalContext(ast, context, module) {
    var buf='';
    if(!ast) return buf;
    for(var i=0,astlen=ast.length;i<astlen;i++) {
      var node = ast[i];
      if(node && node.length>=3) {
        // array element with type, offset, value
        if(node[0]=='buf') {
          // [ 'buf', 14, '! You have ' ]
          buf += node[2];
        } else if(node[0]=='var' || node[0]=='val') {
          // --- loop and find out associative elements
          var tmp;
          if(node[2].indexOf('.')==-1) {
            tmp=context[node[2]];
          } else {
            var kpath = node[2].split('.');
            tmp=context;
            for(var kidx=0;kidx<kpath.length;kidx++) {
              tmp=(kpath[kidx]==''?tmp:tmp[kpath[kidx]]);
              if(!tmp) break;
            }
          }
          tmp = tmp || '';
          if(typeof(tmp)=='function') {
            tmp=context[node[2]]();
          } 
          // @todo: what if tmp is an object ?? 
          buf+=(node[0]=='var'?escapeHtml(tmp):tmp);
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

  /* Utility functions */
  // following copied from dust.js & underscore.js
  // List of HTML entities for escaping.
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;'
  };

  // Regex containing the keys listed immediately above.
  var htmlEscaper = /[&<>"]/mg;
  function escapeHtml(s) 
  {
    if(typeof s === 'string') {
      if(!htmlEscaper.test(s)) {
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
