/*
 * logic less template engine
 */

start
  = b:body                                { return(b); }

body
  = part* 

part
  = tag_start v:variable tag_end          { return v; }
  / buffer part
  / buffer EOF

buffer
  = b:(!tag_start c:. { return c; })+     { return ['buf',b.join('')]; }

tag_start
  = "{{"

tag_end
  = "}}"

variable
  = v:(!tag_end c:. { return c; })+       { return ['tag', v.join('')]; }

EOF
  = !.
