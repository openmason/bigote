/*
 * logic less template engine
 */

{
  var IDENTIFIER = 'var';
  var BUFFER     = 'buf';
  var INCLUDE    = 'inc';
  var BLOCK      = 'blk';
  var NOESC      = 'esc';
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
  = tag_start v:varname tag_end          { return [IDENTIFIER, offset, v]; }
  / esc_tag_start v1:varname esc_tag_end { return [NOESC, offset, v1]; }
  / tag_start "&" v2:varname tag_end     { return [NOESC, offset, v2]; }

section
  = section_start v:varname tag_end
    b:body
    section_end x:varname tag_end
    {
      // v & v1 has to be the same
      if(v!=x) {
        console.log('section start ('+v+') and end ('+x+') does not match! at:'+offset);
      }
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

esc_tag_start
  = tag_start "{"

esc_tag_end
  = tag_end "}"

tag_start
  = "{{"

tag_end
  = "}}"

varname
  = h:[a-zA-Z_$?] t:[0-9a-zA-Z_$?]*         { return h + t.join(''); }

EOF
  = !.
