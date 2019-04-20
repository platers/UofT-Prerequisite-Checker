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
        	//console.log(element);
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




//COURSE EVALUATIONS
//DIFFICULTY
var classname1 = "field-name-field-section-link";
pre1 = document.getElementsByClassName(classname1)[0];
var div1=document.createElement("div");
div1.classList.add("field");
div1.classList.add("field-name-field-prerequisite1");
div1.classList.add("field-type-text-with-summary");
div1.classList.add("field-label-inline");
div1.classList.add("clearfix");

var bold1 = document.createElement("div"); //Header
bold1.classList.add("field-label");
bold1.innerHTML = "Difficulty:&nbsp;";
div1.append(bold1);

var items1 = document.createElement("div");
items1.classList.add("field-items");


var p1 = document.createElement("p"); //List of courses
items1.append(p1);


div1.append(items1);
parent.insertBefore(div1, pre1);


//RATING
var classname2 = "field-name-field-section-link";
pre2 = document.getElementsByClassName(classname2)[0];
var div2=document.createElement("div");
div2.classList.add("field");
div2.classList.add("field-name-field-prerequisite1");
div2.classList.add("field-type-text-with-summary");
div2.classList.add("field-label-inline");
div2.classList.add("clearfix");

var bold2 = document.createElement("div"); //Header
bold2.classList.add("field-label");
bold2.innerHTML = "Rating:&nbsp;";
div2.append(bold2);

var items2 = document.createElement("div");
items2.classList.add("field-items");


var p2 = document.createElement("p"); //List of courses
items2.append(p2);


div2.append(items2);
parent.insertBefore(div2, pre2);

function courseevals(json){
	console.log(json);

	console.log(json[code][0]);
	p1.innerText = json[code][0].toFixed(1);
	p2.innerText = json[code][1].toFixed(1);
}

const url = chrome.runtime.getURL('evals.json');

fetch(url)
    .then((response) => response.json()) //assuming file contains json
    .then((json) => courseevals(json));
