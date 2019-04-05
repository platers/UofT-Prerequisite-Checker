var classname = "field-name-field-prerequisite1";
var pre = document.getElementsByClassName(classname)[0];
var div=document.createElement("div"); 
div.classList.add("field");
div.classList.add("field-name-field-prerequisite1");
div.classList.add("field-type-text-with-summary");
div.classList.add("field-label-inline");
div.classList.add("clearfix");

var bold = document.createElement("div"); //Header
bold.classList.add("field-label");
bold.innerHTML = "Prerequisite for:&nbsp;";
div.append(bold);

var items = document.createElement("div"); 
items.classList.add("field-items");


var p = document.createElement("p"); //List of courses
items.append(p);


div.append(items);
console.log(pre);
var parent = document.getElementsByClassName("content clearfix")[0];
if(pre){
	parent.insertBefore(div, pre.nextSibling); 
} else{
	pre = document.getElementsByClassName("field-type-text-with-summary")[0];
	parent.insertBefore(div, pre.nextSibling); 
}

var courses = [];
var dict = {};
var code = document.getElementsByClassName("title")[0].innerText;
code = code.split(':')[0];
console.log(code);
$.ajax({	//request from cobalt api
    url: "https://cobalt.qas.im/api/1.0/courses/filter",
    data: {
        q: 'prerequisite:"' + code + '"',
        key: "UFfV09rD2yWjzb74WsHJ5KKEReUxKGZl",
        sort: "-term",
        limit: 100
    },
    error: (XMLHttpRequest, textStatus, errorThrown) => {
        console.error("Status: " + textStatus);
        console.error("Error: " + errorThrown);
    },
    success: (response) => {
        console.log(response);
        for(var key in response){
        	var item = response[key];
        	var s = item.code.substring(0, 6);
        	//console.log(s);
        	if(!dict[s]) courses.push(item.code.substring(0, 8));
        	dict[s] = true;
        }
        courses.sort();
        for(var i = 0; i < courses.length; i++){
        	var element = courses[i];
        	console.log(element);
			var a = document.createElement("a"); 
			a.href = "/course/" + element;
			a.target="_blank"
			a.innerText = element;
			if(i > 0) p.innerHTML += ', ';
			p.append(a);
        }
        if(courses.length == 0){
        	p.innerText = 'None';
        }
    }
});
