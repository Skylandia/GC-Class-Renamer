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

let classNames = window.localStorage.getItem("class-names");
if (classNames == null) {
	classNames = new Map();
	renameRequest();
	renameClasses();
}

function renameRequest() {
	for (const node of document.getElementsByClassName("YVvGBb z3vRcc-ZoZQ1")) {
		classNames.set(node.innerHTML, prompt("Rename: ", node.innerHTML));
	}
	window.localStorage.setItem("class-names", classNames);
}

function renameClasses() {
    console.log("The classroom divs have loaded, renaming classes...");
    for (const node of document.getElementsByClassName("YVvGBb z3vRcc-ZoZQ1")) {
        node.innerHTML = classNames.get(node.innerHTML);
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
            addRenameOption();
            renameClasses();
            //observer.disconnect();
        }
        break;
    }
};
const observer = new MutationObserver(callback);
observer.observe(targetNode, { attributes: true });
