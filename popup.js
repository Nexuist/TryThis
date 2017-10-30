let root = new Vue({
    el: "#root",
    data: {
        slackIconURL: chrome.runtime.getURL("slack.colored.png"),
        link: null,
        workspaces: []
    },
    mounted: function () {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, (tabs) => {
            root.link = tabs[0].url;
        })
        chrome.storage.sync.get({
            workspaces: []
        }, (options) => {
            this.$data.workspaces = options.workspaces;
        });
    },
    methods: {
        openSettings: () => chrome.runtime.sendMessage({ action: "options" }),
        send: function (li, workspaceIndex, channel) {
            chrome.runtime.sendMessage({
                action: "send",
                link: link.value,
                workspaceIndex,
                channel
            }, (res) => {
                console.log(res);
                if (res == "success") {
                    li.innerHTML = "# " + channel + " <span style='color: green;'>✔</span>";
                }
                else {
                    li.innerHTML = "# " + channel + " <span style='color: red;'>error, check console</span>";
                    console.error(res);
                }
            });
        }
    }
});