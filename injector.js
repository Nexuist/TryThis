// This runs right after DOM is constructed

let injectedScript = document.createElement("script");
injectedScript.type = "text/javascript";
injectedScript.id = "TryThis";
injectedScript.src = chrome.runtime.getURL("injection.js");
injectedScript.dataset.slackIconURL = chrome.runtime.getURL("slack.png");
injectedScript.dataset.workspaces = JSON.stringify([
    {
        "name": "SquaredLabs",
        "bot_name": "andi",        
        "webhook_url": "google.com",
        "icon_or_emote": "memes",
        "channels": [
            "general",
            "lincus",
            "random",
            "garbage!"
        ]
    },
    {
        "name": "Project Capstone",
        "bot_name": "booty",        
        "webhook_url": "google.com",
        "icon_or_emote": "memes",
        "channels": [
            "general",
            "floridaman",
            "random"
        ]
    }
]);
// Bubble events from the injected script up to the background script
document.addEventListener("TryThisEvent", (event) => chrome.runtime.sendMessage(event.detail));
// Inject the script
document.body.appendChild(injectedScript);