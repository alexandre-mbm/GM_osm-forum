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
// @include     http://forum.openstreetmap.org/edit.php?id=*
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @require     http://cdn.wysibb.com/js/jquery.wysibb.min.js
// @require     http://www.wysibb.com/js/custom.js
// @require     http://raw.githubusercontent.com/alexandre-mbm/GM_osm-forum/master/WYSIWYG-editor_pt-BR.js
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
    lang: 'pt',
    buttons: "bold,italic,underline,mark,strike,|,img,link,|,bullist,numlist,title,|,quote,code,fontcolor,removeFormat",
    allButtons: {
      title: {
        title: WBBLANG.pt.title,
        buttonText: 'h',
        transform: {
          '<h5>{SELTEXT}</h5>':'[h]{SELTEXT}[/h]'
        }
      },
      mark: {
        title: WBBLANG.pt.mark,
        buttonText: 'm',
        transform: {
          '<ins>{SELTEXT}</ins>':'[ins]{SELTEXT}[/ins]'
        }
      }
    }
  }
  $("#req_message_ta").wysibb(wbbOpt);
});

devCSS = "                                                               \
  div.wysibb-text-editor.wysibb-body {                                   \
    font-size: 15px;                                                     \
    color: black;                                                        \
    width: 834px;   /* TODO detect */                                    \
    border-right-width: 1px;                                             \
    border-style: dotted;                                                \
    border-color: gray;                                                  \
  }                                                                      \
  div.wysibb-text-editor.wysibb-body code {                              \
    padding: 0.75em;                                                     \
    white-space: pre;                                                    \
    font-size: 14px;                                                     \
    direction: ltr;                                                      \
    text-align: left;                                                    \
    color: white;                                                        \
    background-color: black;                                             \
    display: block;                                                      \
    overflow: auto;                                                      \
  }                                                                      \
  div.wysibb-text-editor.wysibb-body ins {                               \
    background-color: #FF0;                                              \
    text-decoration: none;                                               \
  }                                                                      \
  div.wysibb-text-editor.wysibb-body h5 {                                \
    font-size: 20px;                                                     \
  }                                                                      \
  div.wysibb-text-editor.wysibb-body ul {                                \
    list-style: disc outside none;                                       \
  }                                                                      \
  div.wysibb-text-editor.wysibb-body ol {                                \
    list-style: decimal outside none;                                    \
  }                                                                      \
  div.wysibb-text-editor.wysibb-body img {                               \
    max-width: 98%;                                                      \
    vertical-align: middle;                                              \
    margin: 7px 0.5em 7px 0px;                                           \
  }                                                                      \
";

addStyle(devCSS);
