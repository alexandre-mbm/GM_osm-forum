// ==UserScript==
// @name        GM_osm-forum-preview
// @namespace   GM_osm-forum-preview
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

pwidth = $("#postpreview div.postmsg").css('width');
rwidth = $("#postreview div.postmsg").css('width');

if(rwidth == undefined) 
  rwidth = GM_getValue('forum.openstreetmap.org[rwidth]');
else
  GM_setValue('forum.openstreetmap.org[rwidth]', rwidth);

if(rwidth == undefined)
  alert('Erro! Pré-visualize post do fórum e volte aqui.');

// rwidth pode ficar defasado sem nunca ser renovado, se o usuário não é leitor

$("#postpreview div.postmsg").css(
  {
    'width': rwidth
  }
);

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