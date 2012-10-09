/*
 * logic less template engine
 */

{
  var IDENTIFIER = 'var';
  var BUFFER     = 'buf';
  var INCLUDE    = 'inc';
  var NOESC      = 'esc';
  var BLOCK      = 'blk';
  var NOT_BLOCK  = 'not';
  var COMMENT    = 'rem';
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
  / comment

section
  = t:conditional v:varname tag_end
    b:body
    section_end x:varname tag_end
    {
      // v & v1 has to be the same
      if(v!=x) {
        console.log('section start ('+v+') and end ('+x+') does not match! at:'+offset);
      }
      return [t, offset, v, b];
    }

conditional
  = section_start                         { return BLOCK; }
  / hat_start                             { return NOT_BLOCK; }

partial
  = tag_start ">" v:varname tag_end       { return [INCLUDE, offset, v]; }

comment
  = tag_start "!" b:(!tag_end c:.{ return c;})+ tag_end 
    { 
      return [COMMENT, offset, b.join('')]; 
    }

buffer
  = b:(!tag_start c:. { return c; })+     { return [BUFFER, offset, b.join('')]; }

hat_start
  = tag_start "^"

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
  = h:[a-zA-Z_$? \t] t:[0-9a-zA-Z_$? \t]* { return (h + t.join('')).trim(); }

EOF
  = !.
