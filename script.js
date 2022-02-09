// ==UserScript==
// @name         GC Class Renamer
// @namespace    com.skylandia
// @version      0.1
// @description  Allows renaming classes in Google Classroom
// @author       Skylandia
// @match        https://classroom.google.com/h
// @icon         https://ssl.gstatic.com/classroom/favicon.png
// @grant        none
// ==/UserScript==

var classNames = new Map();

function loadClassNames() {
    classNames = new Map(JSON.parse(window.localStorage.getItem("class-names")));
    if (classNames.size == 0) {
        classNames = new Map();
        renameRequest();
    }
}

function renameRequest() {
	for (const node of document.getElementsByClassName("gHz6xd Aopndd rZXyy")) {
		classNames.set(node.getAttribute("data-course-id"), [prompt("Rename title: ", node.children[0].children[2].children[1].children[0].children[0].innerHTML), prompt("Rename subititle: ", node.children[0].children[2].children[1].children[0].children[1].innerHTML)]);
	}
	window.localStorage.setItem("class-names", JSON.stringify(Array.from(classNames.entries())));
}

function renameClasses() {
    console.log("The classroom divs have loaded, renaming classes...");
    for (const node of document.getElementsByClassName("gHz6xd Aopndd rZXyy")) {
        node.children[0].children[2].children[1].children[0].children[0].innerHTML = classNames.get(node.getAttribute("data-course-id"))[0];
	    node.children[0].children[2].children[1].children[0].children[1].innerHTML = classNames.get(node.getAttribute("data-course-id"))[1];
    }
}

const targetNode = document.getElementById("yDmH0d"); // The body
let isClassNameDifferent = false;
const callback = function(mutationsList, observer) {
    for(const mutation of mutationsList) {
        if (isClassNameDifferent && targetNode.className != "EIlDfe kYtXye nk6WKe") {
            isClassNameDifferent = false;
        }
        else if (!isClassNameDifferent && targetNode.className == "EIlDfe kYtXye nk6WKe") {
            isClassNameDifferent = true;
            if (classNames.size == 0) {
                loadClassNames();
            }
            renameClasses();
            //observer.disconnect();
        }
        break;
    }
};
const observer = new MutationObserver(callback);
observer.observe(targetNode, { attributes: true });
