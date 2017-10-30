// Implement IPC to accomplish some things since content scripts/injected scripts are sandboxed
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action == "options") chrome.runtime.openOptionsPage();
    if (message.action == "send") {
        chrome.storage.sync.get({
            workspaces: []
        }, (options) => {
            if (options.workspaces.length == 0) {
                sendResponse("For some reason there were no workspaces loaded");
                return; // This should never happen
            }
            let workspace = options.workspaces[message.workspaceIndex];
            let json = {
                text: message.link,
                channel: message.channel,
                username: workspace.bot_name,
            };
            let iconOrEmote = workspace.icon_or_emote;
            if (iconOrEmote.startsWith(":")) {
                json["icon_emoji"] = iconOrEmote;
            }
            else {
                json["icon_url"] = iconOrEmote;
            }
            fetch(workspace.webhook_url, {
                method: "POST",
                body: JSON.stringify(json)
            }).then((res) => {
                if (res.ok) {
                    sendResponse("success");
                }
                else {
                    throw new Error("Response was not okay");
                }

            }).catch((err) => {
                sendResponse(err);
            });         
        });
        return true; // Indicate that the message response will be async
    }
});