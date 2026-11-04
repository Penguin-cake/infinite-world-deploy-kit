// Keep classic game code and styles in the sandbox document, so loading them
// does not depend on cross-site cookies or separate sandbox resource requests.
export async function inlineGameAssets(html,load){
 const tags=Array.from(html.matchAll(/<script\b[^>]*\bsrc\s*=\s*(["'])([^"']+)\1[^>]*>\s*<\/script\s*>|<link\b[^>]*>/gi));
 let result='',cursor=0;
 for(const match of tags){const tag=match[0];let replacement=tag;
  if(/^<script/i.test(tag)&&!(/\b(?:async|defer)\b|\btype\s*=\s*["']module["']/i.test(tag))){const code=await load(match[2]);if(code!==null)replacement='<script>'+code.replace(/<\/script/gi,'<\\/script')+'</script>';}
  else if(/^<link/i.test(tag)&&/\brel\s*=\s*["']stylesheet["']/i.test(tag)){const href=tag.match(/\bhref\s*=\s*(["'])([^"']+)\1/i);if(href){const css=await load(href[2]);if(css!==null)replacement='<style>'+css.replace(/<\/style/gi,'\\3C /style')+'</style>';}}
  result+=html.slice(cursor,match.index)+replacement;cursor=match.index+tag.length;
 }
 return result+html.slice(cursor);
}
