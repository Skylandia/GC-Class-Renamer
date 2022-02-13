// ==UserScript==
// @name         Google Classroom Renamer
// @namespace    com.skylandia
// @version      0.1
// @description  Rename classrooms in Google Classroom
// @author       Skylandia
// @match        https://classroom.google.com/*
// @icon         https://ssl.gstatic.com/classroom/favicon.png
// @grant        none
// ==/UserScript==

class GCRenamer {

    classroomNames = new Map();

    constructor() {
        this.classroomNames.set("/c/NDY0NTMyOTE2MDI1", {title: "Mathematics", subtitle: "13MTC"});
        this.classroomNames.set("/c/NDY0MTI4MjU0MDg1", {title: "Physics", subtitle: "13PYC"});
        this.classroomNames.set("/c/NDY0MDY1MTg5MjU4", {title: "Computer Science", subtitle: "13CPC"});
        this.classroomNames.set("/c/NDYyODk0MDU4ODQx", {title: "Economics", subtitle: "12ECC"});
        this.registerObserver();
    }
    registerObserver() {
        new MutationObserver((mutationList, observer) => {
            for (const mutation of mutationList) {
                // Courses
                if ((mutation.target.getAttribute("class") == "onkcGd eDfb1d YVvGBb Vx8Sxd" || mutation.target.getAttribute("class") == "EIlDfe kYtXye nk6WKe") && mutation.type == "childList") {
                    console.log("courses");
                    console.log(mutation);

                    let targetNodes = document.getElementsByClassName("onkcGd eDfb1d YVvGBb Vx8Sxd");
                    for (let node of targetNodes) {
                        node.children[0].innerHTML = this.classroomNames.get(node.getAttribute("href")).title;
                        node.children[1].innerHTML = this.classroomNames.get(node.getAttribute("href")).subtitle;
                    }
                }
                // Sidemenu
                if (new String(mutation.target.getAttribute("class")).includes("vhK44c") && mutation.type == "attributes") {
                    console.log("sidemenu");
                    console.log(mutation);

                    for (let child of document.getElementsByClassName("Xi8cpb TMOcX")) {

                        if (child.children[2].children.length == 1) {
                            let subtitleNode = document.createElement("div");
                            subtitleNode.setAttribute("class", "TajIHf dDKhVc YVvGBb");
                            child.children[2].appendChild(subtitleNode);
                        }

                        child.children[2].children[0].innerHTML = this.classroomNames.get(child.getAttribute("href")).title;
                        child.children[2].children[1].innerHTML = this.classroomNames.get(child.getAttribute("href")).subtitle;
                    }
                }
                // Class Headings & Title
                if (new String(mutation.target.getAttribute("class")).includes("nTrDbc GAP4ve xSXax AJlUyd CPYzFb V7D6ud fKVgu nk6WKe") && mutation.type == "attributes") {
                    // Top Heading
                    console.log("top heading")
                    console.log(mutation);

                    let key = new String(window.location.href).replace("https://classroom.google.com", "");
                    let headingNode = document.getElementsByClassName("onkcGd OGhwGf")[0];

                    if (headingNode.children.length == 1) {
                        let subtitleNode = document.createElement("div");
                        subtitleNode.setAttribute("class", "YVvGBb dDKhVc Pce5Kb");
                        headingNode.appendChild(subtitleNode);
                    }

                    headingNode.children[0].innerHTML = this.classroomNames.get(key).title;
                    headingNode.children[1].innerHTML = this.classroomNames.get(key).subtitle;


                    // Centre Heading
                    console.log("centre title");

                    headingNode = document.getElementsByClassName("T4tcpe")[0];
                    console.log(headingNode);

                    if (headingNode.children.length == 1) {
                        let subtitleNode = document.createElement("div");
                        subtitleNode.setAttribute("class", "qFmcrc z3vRcc-ZoZQ1 YVvGBb");
                        headingNode.appendChild(subtitleNode);
                    }

                    headingNode.children[0].innerHTML = this.classroomNames.get(key).title;
                    headingNode.children[1].innerHTML = this.classroomNames.get(key).subtitle;


                    // Title
                    document.title = this.classroomNames.get(key).title;
                }
            }
        }).observe(document.body, {attributes: true, childList: true, subtree: true});
    }
}
new GCRenamer();
console.log("started");
