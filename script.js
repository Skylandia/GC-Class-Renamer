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

function renameClasses() {
    let classNames = new Map(JSON.parse(window.localStorage.getItem("class-names")));
    if (classNames.size == 0) {
        classNames = new Map();
        for (const node of document.getElementsByClassName("gHz6xd Aopndd rZXyy")) {
            classNames.set(node.getAttribute("data-course-id"), [prompt("Rename title: ", node.children[0].children[2].children[1].children[0].children[0].innerHTML), prompt("Rename subititle: ", node.children[0].children[2].children[1].children[0].children[1].innerHTML)]);
        }
        window.localStorage.setItem("class-names", JSON.stringify(Array.from(classNames.entries())));
    }
    console.log("The classroom divs have loaded, renaming classes...");
    for (const node of document.getElementsByClassName("gHz6xd Aopndd rZXyy")) {
        node.children[0].children[2].children[1].children[0].children[0].innerHTML = classNames.get(node.getAttribute("data-course-id"))[0];
	    node.children[0].children[2].children[1].children[0].children[1].innerHTML = classNames.get(node.getAttribute("data-course-id"))[1];
    }
	for (const node of document.getElementsByClassName("Xi8cpb TMOcX")) {
        if (!node.hasAttribute("data-id")) {
            continue;
        }
		node.children[2].children[0].innerHTML = classNames.get(node.getAttribute("data-id"))[0];
        if (node.children[2].children.length == 1) {
            let subtitle = document.createElement("div");
            subtitle.setAttribute("class", "TajIHf dDKhVc YVvGBb");
            node.children[2].appendChild(subtitle);
        }
		node.children[2].children[1].innerHTML = classNames.get(node.getAttribute("data-id"))[1];
	}
}

const targetNode = document.getElementById("yDmH0d"); // The body
let flag = [false, false, false, false];
const callback = function(mutationsList, observer) {
    for(const mutation of mutationsList) {
        if (flag[0] && targetNode.className != "EIlDfe kYtXye nk6WKe") {
            flag[0] = false;
        }
        else if (!flag[0] && targetNode.className == "EIlDfe kYtXye nk6WKe") {
            flag[0] = true;
            renameClasses();
        }
        if (flag[1] && document.body.children[10].className != "vhK44c X1rxSc") {
            flag[1] = false;
        }
        else if (!flag[1] && document.body.children[10].className == "vhK44c X1rxSc") {
            flag[1] = true;
            renameClasses();
        }
        if (flag[2] && document.body.children[10].className != "vhK44c CBSF1e") {
            flag[2] = false;
        }
        else if (!flag[2] && document.body.children[10].className == "vhK44c CBSF1e") {
            flag[2] = true;
            renameClasses();
        }
        if (flag[3] && document.body.children[10].className != "vhK44c OMVS8d") {
            flag[3] = false;
        }
        else if (!flag[3] && document.body.children[10].className == "vhK44c OMVS8d") {
            flag[3] = true;
            renameClasses();
        }
    }
};
const observer = new MutationObserver(callback);
observer.observe(targetNode, { attributes: true, subtree: true });
