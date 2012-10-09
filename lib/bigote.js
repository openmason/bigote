module.exports = (function(){
  var parser = require('./parser');
  var runtime = require('./runtime');

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
    render: runtime.evaluate
  };
  return result;
})();
