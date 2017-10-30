// Implement IPC to accomplish some things since content scripts/injected scripts are sandboxed
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message == "options") chrome.runtime.openOptionsPage();
});