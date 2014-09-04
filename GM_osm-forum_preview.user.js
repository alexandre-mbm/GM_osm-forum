// ==UserScript==
// @name        OpenStreetMap Forum's preview's delimeter
// @namespace   GM_osm-forum
// @description It helps to determine the width of text being sent
// @include     http://forum.openstreetmap.org/viewtopic.php?pid=*
// @include     http://forum.openstreetmap.org/post.php?tid=*
// @include     http://forum.openstreetmap.org/post.php?action=post&tid=*
// @include     http://forum.openstreetmap.org/edit.php?id=*&action=edit
// @include     http://forum.openstreetmap.org/post.php?action=post&fid=*
// @version     1
// @grant       GM_getValue
// @grant       GM_setValue
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
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

pwidth = $("#postpreview div.postmsg").css('width');
rwidth = $("#postreview div.postmsg").css('width');

if(rwidth == undefined) 
  rwidth = GM_getValue('forum.openstreetmap.org[rwidth]');
else
  GM_setValue('forum.openstreetmap.org[rwidth]', rwidth);

var show=!window.location.href.match(/^.*\?pid=.*$/g)

if(rwidth == undefined && show)
  alert('Erro! Pré-visualize post do fórum e volte aqui.');

// rwidth pode ficar defasado sem nunca ser renovado, se o usuário não é leitor

$("#postpreview div.postmsg").css(
  {
    'width': rwidth
  }
);

if (show)
  $("div.postmsg").css(
    {
      'border-right-width': '1px',
      'border-style': 'dotted',
      'border-color': 'gray'
    }
  );

/****************************************************************************

Source: http://thiscouldbebetter.wordpress.com/2012/12/18/loading-editing-and-saving-a-text-file-in-html5-using-javascrip/

Exemplo: http://thiscouldbebetter.neocities.org/texteditor.html

*/

function saveTextAsFile()
{
	//var textToWrite = document.getElementById("inputTextToSave").value;
  var textToWrite = $("textarea[name='req_message']").val();
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
}

function destroyClickedElement(event)
{
	document.body.removeChild(event.target);
}

function loadFileAsText()
{
	var fileToLoad = document.getElementById("fileToLoad").files[0];

	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent) 
	{
		var textFromFileLoaded = fileLoadedEvent.target.result;
		//document.getElementById("inputTextToSave").value = textFromFileLoaded;
    $("textarea[name='req_message']").val(textFromFileLoaded);
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}

/*

  "textarea[name='req_message']"

  Salvar como: _________________ OK

*/

var p = $("<p/>");

p.appendTo($("#postform"));

$("<span/>").text("Salvar como: ").appendTo(p);

$("<input/>").attr(
  {
    id: 'inputFileNameToSaveAs'
  }
).appendTo(p);

$("<button/>")
  .text("OK")
  .on("click", saveTextAsFile)
  .appendTo(p);

/*

  Ou SELECIONAR ARQUIVO... "Nenhum arquivo selecionado" par CARREGAR

*/

$("<b/>")
  .text("ou")
  .css("margin-right", "2em")
  .css("margin-left", "2em")
  .appendTo(p);

$("<span/>").text("Carregar: ").appendTo(p);

$("<input/>").attr(
  {
    id: 'fileToLoad',
    type: 'file'
  }
).appendTo(p);

$("<button/>")
  .text("OK")
  .on("click", loadFileAsText)
  .appendTo(p);
