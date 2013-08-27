/*
 * logic less template engine
 */

{
  var IDENTIFIER = 'var';
  var BUFFER     = 'buf';
  var INCLUDE    = 'inc';
  var NOESC      = 'val';
  var BLOCK      = 'blk';
  var NOT_BLOCK  = 'not';
  var COMMENT    = 'rem';
}

start
  = b:body                                { return {ast:b, source:input}; }

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
  = t:conditional v:varname spos:tag_end
    b:body
    epos:section_end x:varname tag_end
    {
      // v & x has to be the same
      if(v!=x) {
        console.log('section start ('+v+') and end ('+x+') does not match! at:'+offset);
      }
      return [t, offset, spos+2, epos-1, v, b];
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
  = tag_start "/"                         { return offset; }

esc_tag_start
  = tag_start "{"

esc_tag_end
  = tag_end "}"

tag_start
  = "{{"

tag_end
  = "}}"                                  { return offset; }

varname
  = ws* h:[a-zA-Z_$?\.] t:[0-9a-zA-Z_$?\.]* ws*  
  { 
    return (h + t.join('')).trim(); 
  }

ws
  = [\t\v\f \u00A0\uFEFF]

EOF
  = !.
