// ==UserScript==
// @name        OpenStreetMap Forum's WYSIWYG editor
// @namespace   GM_osm-forum
// @description BBCode editor for the OpenStreetMap Forum
// @include     http://forum.openstreetmap.org/viewtopic.php?id=*
// @include     http://forum.openstreetmap.org/viewtopic.php?pid=*
// @include     http://forum.openstreetmap.org/post.php?tid=*
// @include     http://forum.openstreetmap.org/post.php?fid=*
// @include     http://forum.openstreetmap.org/post.php?action=post&tid=*
// @include     http://forum.openstreetmap.org/post.php?action=post&fid=*
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

function addStyle(style) {
  var head = document.getElementsByTagName("HEAD")[0];
  var ele = head.appendChild(window.document.createElement( 'style' ));
  ele.innerHTML = style;
  return ele;
}

addStyle('@import "http://cdn.wysibb.com/css/default/wbbtheme.css";');

$("div.infldset.txtarea div").remove();

$("textarea[name='req_message']")
  .attr(
    {
      id: 'req_message_ta'
    }
  );

$(document).ready(function() {
  var wbbOpt = {
    buttons: "bold,italic,underline,mark,strike,|,img,link,|,bullist,numlist,title,|,quote,code,fontcolor,removeFormat",
    allButtons: {
      title: {
        title: 'Title',
        buttonText: 'h',
        transform: {
          '<h5>{SELTEXT}</h5>':'[h]{SELTEXT}[/h]'
        }
      },
      mark: {
        title: 'Mark',
        buttonText: 'm',
        transform: {
          '<ins>{SELTEXT}</ins>':'[ins]{SELTEXT}[/ins]'
        }
      }
    }
  }
  $("#req_message_ta").wysibb(wbbOpt);
  $("div.wysibb-text-editor.wysibb-body")
    .css(
      {
        'font-size': '15px',
        'color': 'black',
        'width': '834px', /* TODO detect*/
      }
    );
  $("div.wysibb-text-editor.wysibb-body code") /* TODO fix: no inline! */
    .css(
      {
        'display': 'inline-block',
        'padding': '0.75em',
        'white-space': 'pre',
        'font-size': '14px',
        'direction': 'ltr',
        'text-align': 'left',
        'color': "white",
        'background-color': 'black',
        'display': 'block'
      }
    );
  $("div.wysibb-text-editor.wysibb-body ins") /* TODO fix: no inline! */
    .css(
      {
        'background-color': '#FF0',
        'text-decoration': 'none'
      }
    );
  $("div.wysibb-text-editor.wysibb-body h5") /* TODO fix: no inline! */
    .css(
      {
        'font-size': '20px'
      }
    );
  $("div.wysibb-text-editor.wysibb-body ul") /* TODO fix: no inline! */
    .css(
      {
        'list-style': 'disc outside none'
      }
    );
  $("div.wysibb-text-editor.wysibb-body ol") /* TODO fix: no inline! */
    .css(
      {
        'list-style': 'decimal outside none'
      }
    );
});
