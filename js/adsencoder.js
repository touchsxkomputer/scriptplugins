function convert(){
 var ele1 = document.getElementById("somewhere");
 var replaced;
 replaced = ele1.value;
 replaced = replaced.replace(/&/ig, "&amp;");
 replaced = replaced.replace(/</ig, "&lt;");
 replaced = replaced.replace(/>/ig, "&gt;");
 replaced = replaced.replace(/"/ig, "&quot;");
 replaced = replaced.replace(/±/ig, "&plusmn;");
 replaced = replaced.replace(/©/ig, "&copy;");
 replaced = replaced.replace(/®/ig, "&reg;");
 replaced = replaced.replace(/howdy/ig, "ya'll");
 ele1.value = replaced;
}
