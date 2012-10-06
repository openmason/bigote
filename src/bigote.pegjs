/*
 * logic less template engine
 */

/*
start
  = comments partials delimiters invertedSections sections variables

*/

start
  = body

body
  = p:(x:part {return x.join('');})*      { return(p.join('')); }

part
  = tag_start v:variable tag_end          { return v; }
  / buffer part
  / buffer EOF

buffer
  = b:(!tag_start c:. { return c; })+     { return b.join(''); }

tag_start
  = "{{"

tag_end
  = "}}"

variable
  = v:(!tag_end c:. { return c; })+       { return context[v.join('')]; }

EOF
  = !.
