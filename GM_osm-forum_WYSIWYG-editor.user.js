// ==UserScript==
// @name        OpenStreetMap Forum's WYSIWYG editor
// @namespace   GM_osm-forum-WYSIWYG
// @description BBCode editor for the OpenStreetMap Forum
// @include     http://forum.openstreetmap.org/viewtopic.php?id=*
// @include     http://forum.openstreetmap.org/viewtopic.php?pid=*
// @include     http://forum.openstreetmap.org/post.php?tid=*
// @include     http://forum.openstreetmap.org/post.php?action=post&tid=*
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @require     http://cdn.wysibb.com/js/jquery.wysibb.min.js
// @require     http://www.wysibb.com/js/custom.js
// ==/UserScript==

/*$("div.infldset.txtarea").attr({
  style: 'display:none'
});*/

$("div.box p.buttons input[name='submit']").before(
  $('<a/>',
    {
      href: '#'
    }
   )
  .text('Preparar')
  .on('click', function(e)
      {
        //$("#aquiOK").bbcode($(div.infldset.txtarea).text());
        var text = $("textarea[name='req_message']").val();
        alert(text);
        $("#aquiOK").htmlcode('');
        $("#aquiOK").bbcode(text);
        //$("#aquiOK").sync();
      }
     )
);

//<input name="submit" value="Enviar" tabindex="4" accesskey="s" type="submit">

// http://www.sceditor.com/minified/themes/default.min.css

function addStyle(style) {
  var head = document.getElementsByTagName("HEAD")[0];
  var ele = head.appendChild(window.document.createElement( 'style' ));
  ele.innerHTML = style;
  return ele;
}

$('<textarea/>',
  {
    cols: '75',
    rows: '7',
    id: 'aquiOK',
    style: 'width:100%'
  }
 )
.text('Olá')
.appendTo($('div.inform')[0]);

addStyle('@import "http://cdn.wysibb.com/css/default/wbbtheme.css";');

$(document).ready(function() {
  var wbbOpt = {
    buttons: "bold,italic,underline,|,img,link,|,code,quote"
  }
  $("#aquiOK").wysibb(wbbOpt);
});



