# bigote
Logic-less template engine

Compiles mushtache templates to AST which are then rendered using a super slim runtime engine. Please check the benchmarks to see the performance for yourself, even beats dust.js by 10-20%. Still an alpha product, use it to toy around.

## Features
Full support for mustache templates. Please refer to examples directory for samples from mustache man pages.

   * http://mustache.github.com/mustache.5.html

### Load
To compile templates

    var bigote=require('bigote');
    // load the templates
    var compiledTemplate = bigote.load(templateString);

### Render
To render compiled template

    // set the data in context and call
    var result=bigote.render(compiledTemplate, context);

### Browser
To use it on the browser side, include the script from dist directory

    <script src="bigote-full-0.3.0.js"></script>

To compile template

    // load the template and partials (optional)
    // templateString="...{{abc}}......";
    // partials={partialName:"...my partial string {{xyz}} ...", ...}
    var tmpl = bigote.load(templateString, partials);

To render template

    // tmpl is from previous load statement
    // ctx is the object that carries data
    bigote.render(tmpl, ctx);


## Performance
Please refer to benchmark directory (this directory have the benchmark files from dust.js updated with bigote for comparison). For those who want to see a screen shot.

![Template engine](bigote/doc/images/performance.png "Performance shootout")

## Notes
  * Inspired by mushtache, dust.js
  * PEG.js - http://pegjs.majda.cz/

## Useful Links
Other template engines that might be of interest
  * Hogan - https://github.com/twitter/hogan.js
  * Dust - https://github.com/akdubya/dustjs
  * Mu2 - https://github.com/raycmorgan/Mu

