// ==UserScript==
// @name        OpenStreetMap Forum's WYSIWYG editor
// @namespace   GM_osm-forum
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

/*
  Copyright (c) 2014 Alexandre Magno <alexandre.mbm@gmail.com>

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

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



