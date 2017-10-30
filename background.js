// Implement IPC to accomplish some things since content scripts/injected scripts are sandboxed
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action == "options") chrome.runtime.openOptionsPage();
    if (message.action == "send") {
        console.log(message);
        sendResponse("success");
    }
});