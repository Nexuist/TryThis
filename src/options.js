let defaultWorkspace = {
    name: "Unnamed Workspace",
    bot_name: "TryThis Chrome Extension",
    webhook_url: null,
    icon_or_emote: ":flag-al:",
    channels: [
        "general"
    ]
};

let root = new Vue({
    el: "#root",
    data: {
        index: 0,
        addingNewChannel: false,
        consideringDeletingWorkspace: false,
        savedChanges: false,
        workspaces: [defaultWorkspace]
    },
    mounted: function () {
        chrome.storage.sync.get({
            workspaces: [defaultWorkspace]
        }, (options) => {
            this.$data.workspaces = options.workspaces;
        });
    },
    computed: {
        selectedWorkspace: function () {
            return this.$data.workspaces[this.$data.index]
        }
    },
    methods: {
        addWorkspace: function () {
            this.$data.workspaces.push(Object.assign({}, defaultWorkspace));
            this.$data.index = this.$data.workspaces.length - 1;
        },
        deleteWorkspace: function() {              
            this.$data.workspaces.splice(this.$data.workspaces.indexOf(this.selectedWorkspace), 1);
            if (this.$data.index > 0) this.$data.index -= 1;
            this.$data.consideringDeletingWorkspace = false;
        },
        addChannel: function () {
            let name = this.$refs.newChannelInput.value;
            if (name.length > 0) this.selectedWorkspace.channels.push(name);
            this.$data.addingNewChannel = false;
        },
        deleteChannel: function (channelIndex) {
            this.selectedWorkspace.channels.splice(channelIndex, 1);
        },
        saveChanges: function(showSavedText) {
            chrome.storage.sync.set({
                workspaces: this.$data.workspaces
            }, () => {
                // Settings saved
                if (!showSavedText) return;
                root.$data.savedChanges = true;
                setTimeout(() => {
                    root.$data.savedChanges = false;
                }, 3000);
            });
        }
    },
    watch: {
        index: function(newIndex) {
            // Reset these if the workspace is changed
            this.$data.addingNewChannel = false;
            this.$data.consideringDeletingWorkspace = false;
        }
    }
});

setInterval(() => root.saveChanges(false), 2000); // Implement autosave

