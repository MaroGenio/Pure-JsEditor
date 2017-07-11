var elm = document.getElementById("editable");
elm.contentEditable = true;
var p = document.getElementById("paragraph");
var bold = document.getElementById("bold");
var italic = document.getElementById("italic");
var underlined = document.getElementById("underlined");
var barred = document.getElementById("barred");
var fonts = document.getElementById("fonts");
var fontSize = document.getElementById("fontSize");
var headings =  document.getElementById("headings");
var undo = document.getElementById("undo");
var redo = document.getElementById("redo");
var sub = document.getElementById("sub");
var sup = document.getElementById("sup");
var ol = document.getElementById("ol");
var ul = document.getElementById("ul");
var alignLeft = document.getElementById("alignLeft");
var alignRight = document.getElementById("alignRight");
var alignCenter = document.getElementById("alignCenter");
var alignJustify = document.getElementById("justify");
var table = document.getElementById("table");
var textColor = document.getElementById("color");
var tableInfos = document.getElementById("tableInfos");
var exit = document.getElementById("exit");
var rows = document.getElementById("rows");
var columns = document.getElementById("columns");
var collapse = document.getElementById("collapse");
var confirm = document.getElementById("ok");
var tableNb =0;
var tabPosition;

//dynamic selection without Jquery
function $(selector){
    var selArray = selector.split(" ");
    console.log(selArray);
    if (selector.startsWith("#") && selArray.length === 1){
        return document.querySelector(selector);
    } else{
     return document.querySelectorAll(selector);   
    }
}

function getText(){
    var text = window.getSelection();
    if(text){
        if(text.rangeCount>0){
            return text;
        }  
} }

function createElm(sel, elm){
    var crtElement = document.createElement(elm);
    if (sel.rangeCount) {
        var range = sel.getRangeAt(0).cloneRange();
        range.surroundContents(crtElement);
        sel.removeAllRanges();
        sel.addRange(range);
        sel.removeAllRanges();
    }
    return crtElement;
}


p.addEventListener("click", function(){
    var sel = getText();
    var base = sel.anchorNode.parentNode.tagName;
    var elm = "p";
    // Create Element if the parent tag is different.
    if(base !== elm.toUpperCase() && sel.toString() !== ""){
        console.log("time to create element");
        createElm(sel, elm);   
    }
    
});



headings.addEventListener("change", function(){
	var arr=["H1","H2","H3","H4","H5","H6"];
    var sel = getText();
    var base = sel.anchorNode.parentNode.tagName;
    var elm = this.value;	
    // Create Element if the parent tag is different.
    console.log("choosed heading : " + elm);
    if(arr.indexOf(base) > -1 && sel.toString() !== ""){
    	console.log("selection has a heading element : " + base);
    	changeTag(sel.anchorNode.parentElement,elm);
    } else if (base !== elm.toUpperCase() && sel.toString() !== ""){
        console.log("time to create element");
        createElm(sel, elm);   
    } 
    
});




fontSize.addEventListener("change", function(){
    var val = this.value+"px";
    console.log(val);
    var sel = getText();
    var base = sel.anchorNode.parentNode.tagName;
    if ( sel.toString() === sel.anchorNode.parentNode.textContent){
        //the whole tag
        console.log("got the whole text");
        sel.anchorNode.parentElement.style.fontSize = val;
        
    } 
    else if (sel.toString().length < sel.anchorNode.parentNode.textContent.length) {
        //part of the tag
//                    console.log("Time to create Element")
        var createdElm = createElm(sel,"span");
        createdElm.style.fontSize = val;
    } else{
//                    console.log("multiple tags detected");
        var items = getFullSel();
        console.log(items);
        var subItems = [];
        for (var i=0; i<items.length; i++){
            if(items[i].children.length > 0){
                childs = getAllChilds(items[i]);
                for (var j=0; j < childs.length; j++){
                    items[i].style.fontSize = val;
                    childs[j].style.fontSize = val;
                }
            } else {
                //console.log("has no childs");
                items[i].style.fontSize = val;
            }
        }
    }
});


textColor.addEventListener("change", function(){
    var val = this.value;
    console.log(val);
    var sel = getText();
    var base = sel.anchorNode.parentNode.tagName;
    if ( sel.toString() === sel.anchorNode.parentNode.textContent){
        //the whole tag
        console.log("got the whole text");
        sel.anchorNode.parentElement.style.color = val;
        
    } 
    else if (sel.toString().length < sel.anchorNode.parentNode.textContent.length) {
        //part of the tag
//                    console.log("Time to create Element")
        var createdElm = createElm(sel,"span");
        createdElm.style.color = val;
    } else{
//                    console.log("multiple tags detected");
        var items = getFullSel();
        console.log(items);
        var subItems = [];
        for (var i=0; i<items.length; i++){
            if(items[i].children.length > 0){
                childs = getAllChilds(items[i]);
                for (var j=0; j < childs.length; j++){
                    items[i].style.color = val;
                    childs[j].style.color = val;
                }
            } else {
                console.log("has no childs");
                items[i].style.color = val;
            }
        }
    }
});





//built-in methods in selection object
//you can do the same using functions used in fontSize, heading ....
// strikeThrough, italic, bold, underline
bold.addEventListener("click", function(){
    document.execCommand('bold', false, null);
});

italic.addEventListener("click", function(){
    document.execCommand('italic', false, null);
});

underlined.addEventListener("click", function(){
    document.execCommand('underline', false, null);
});

barred.addEventListener("click", function(){
    document.execCommand('strikeThrough', false, null);
});

fonts.addEventListener("change", function(){
	val = this.value;
    document.execCommand('fontName', false, val);
});

alignLeft.addEventListener("click", function(){
    document.execCommand('justifyLeft', false, null);

});

alignRight.addEventListener("click", function(){
    document.execCommand('justifyRight', false, null);

});

alignCenter.addEventListener("click", function(){
    document.execCommand('justifyCenter', false, null);

});

alignJustify.addEventListener("click", function(){
    document.execCommand('justifyFull', false, null);

});

redo.addEventListener("click", function(){
    document.execCommand('redo', false, null);

});

undo.addEventListener("click", function(){
    document.execCommand('undo', false, null);

});

sub.addEventListener("click", function(){
    document.execCommand('subscript', false, null);

});

sup.addEventListener("click", function(){
    document.execCommand('superscript', false, null);

});

ol.addEventListener("click", function(){
    document.execCommand('insertOrderedList', false, null);

});

ul.addEventListener("click", function(){
    document.execCommand('sinsertUnorderedList', false, null);

});


function getFullSel(){
    var items=[];
    var sel = getText();
    var container = $("#editable");
    var containerElm = container.childNodes;
//                console.log(containerElm);
    var selectedText = sel.toString().split("\n");
//                console.log(selectedText);
    for(var i=0; i<containerElm.length;i++){
         for(var j=0; j<selectedText.length;j++){
             containerText = containerElm[i].textContent.trim();
             
             if (containerText !== ""){
                 if(containerText === selectedText[j]){
//                                 console.log(containerText + " : " + selectedText[j]);
                        if (containerElm[i].nodeName === "#text" ){
                        	console.log(containerElm[i].parentElement);
                            items.push(containerElm[i].parentElement);
                        } else {
//                                        console.log("gotted");
                            items.push(containerElm[i]);
                            
                        }
            }
         }
         }
    }
return items;
}

function getAllChilds(elm){
    var arr =[];
    function subchilds(elm){
            var child = elm.children;
            if(child.length > 0){
                for(var i=0; i< child.length; i++){
                        if (child[i].children.length > 0){
                            arr.push(child[i]);
                            subchilds(child[i]);
                        }else{
                            arr.push(child[i]);
                        }
                }
            } 
    } 
    subchilds(elm);
    return arr;
}
    
    


table.addEventListener("click", function(){
	tableInfos.style.display = "block";
	sel=getText();
	tabPosition = sel.anchorNode.nextElementSibling;
	
});
exit.addEventListener("click", function(){
	tableInfos.style.display = "none";
})

confirm.addEventListener("click", function(){
	tableInfos.style.display = "none";
	console.log("rows : " + rows.value);
	console.log("Columns : " + columns.value);
	var nbRows = parseInt(rows.value);
	var nbColumns = parseInt(columns.value);
	if(rows.value !== "" || columns.value !== ""){
		createTab(nbRows, nbColumns);
	}
})

function changeTag(orgTag, newTag){

		var newTag = document.createElement(newTag);
		newTag.innerHTML = orgTag.innerHTML;
		orgTag.parentNode.insertBefore(newTag, orgTag);
		orgTag.parentNode.removeChild(orgTag);

		}

function createTab(nbRows, nbColumns){
	var table= document.createElement("table");
	elm.insertBefore(table, tabPosition);
	table.id = "table"+ tableNb;
	var thead = document.createElement("thead");
	var tbody = document.createElement("tbody");
	table.appendChild(thead);
	table.appendChild(tbody);
	for (var i=0; i<nbRows ; i++){

		if(i==0){
			trHead=document.createElement("tr");
			thead.appendChild(trHead);
		} else{
			trBody=document.createElement("tr");
			tbody.appendChild(trBody);
		}
		for (var j=0; j<nbColumns; j++){
			if (i == 0){
				th=document.createElement("th");
				trHead.appendChild(th);
				th.textContent ="Header";
			} else{
				td=document.createElement("td");
				trBody.appendChild(td);
				td.textContent ="cell";
			}
		}
	}
}
