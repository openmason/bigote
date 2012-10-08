/*
 * logic less template engine
 */

{
  var IDENTIFIER = 'var';
  var BUFFER     = 'buf';
  var INCLUDE    = 'inc';
  var BLOCK      = 'blk';
}

start
  = b:body                                { return(b); }

body
  = part*

part
  = tag
  / buffer

tag
  = section
  / partial
  / variable

variable
  = tag_start v:varname tag_end          { return v; }

section
  = section_start v:varname tag_end
    b:body
    section_end x:varname tag_end
    {
      // v & v1 has to be the same
      //console.log(v);
      //console.log(x);
      //console.log(b);
      return [BLOCK, offset, v, b];
    }

partial
  = tag_start ">" v:varname tag_end       { return [INCLUDE, offset, v]; }

buffer
  = b:(!tag_start c:. { return c; })+     { return [BUFFER, offset, b.join('')]; }

section_start
  = tag_start "#"

section_end
  = tag_start "/"

tag_start
  = "{{"

tag_end
  = "}}"

varname
  = h:[a-zA-Z_$] t:[0-9a-zA-Z_$]*         { return [IDENTIFIER, offset, h + t.join('')]; }

EOF
  = !.
