// This runs right after DOM is constructed

let scr = document.createElement("script");
scr.type = "text/javascript";
scr.id = "trythis";
scr.src = chrome.runtime.getURL("injection.js");
scr.dataset.slackIconURL = chrome.runtime.getURL("slack.png");
document.body.appendChild(scr);
