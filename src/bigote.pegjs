/*
 * logic less template engine
 */

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
      return ['blk', v, b];
    }

partial
  = tag_start ">" v:varname tag_end       { return ['inc', v]; }

buffer
  = b:(!tag_start c:. { return c; })+     { return ['buf',b.join('')]; }

section_start
  = tag_start "#"

section_end
  = tag_start "/"

tag_start
  = "{{"

tag_end
  = "}}"

varname
  = h:[a-zA-Z_$] t:[0-9a-zA-Z_$]*         { return ['var', h + t.join('')]; }

EOF
  = !.
