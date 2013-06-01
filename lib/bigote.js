module.exports = (function(){
  var parser = require('./parser');
  var runtime = require('./runtime');
  var translate = require('./translate');

  var result = {
    /* Load template and partials */
    load: function(tmpl, partials) {
      var _templates = {};
      _templates['main'] = parser.parse(tmpl);
      if(partials) {
        for(var p in partials) {
          _templates[p] = parser.parse(partials[p]);
        }
      }
      return _templates;
    },
    render: runtime.evaluate,
    translate: translate.convert
  };
  return result;
})();
