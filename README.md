# bigote
Logic-less templating

Support for compiled mushtache specs that are highly performant. Please check the benchmarks to see for yourself, mostly beats dust.js by 10-20%. Still an alpha product, use it to toy around.

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
Include the script

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
Please refer to benchmark directory (this directory have the benchmark files from dust.js updated with bigote for comparison)

## Notes
  * Inspired by mushtache, dust.js
  * PEG.js - http://pegjs.majda.cz/
