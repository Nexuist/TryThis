// https://developer.chrome.com/extensions/declarativeContent
// When the extension is installed/updated, reinstall all rules
// Basically just a complicated way to make the icon colorful when the user is on SO
chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {
                            hostEquals: "stackoverflow.com"
                        },
                    })
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });
});