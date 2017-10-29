// https://stackoverflow.com/a/4793630
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

let fakeData = [
    {
        "name": "SquaredLabs",
        "bot_name": "andi",        
        "webhook_url": "google.com",
        "icon_or_emote": "memes",
        "channels": [
            "general",
            "lincus",
            "random"
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
];

let shareButtons = document.getElementsByClassName("short-link");

// Latch onto every share button on the page
for (let button of shareButtons) {
    button.addEventListener("click", (event) => {
        // Wait for the other click handler to render the box once clicked
        let waiter = setInterval(() => {
            let box = button.parentNode.getElementsByClassName("share-tip")[0];
            if (box != undefined) {
                clearInterval(waiter);
                inject(box);
            }
        }, 5);
    });
}

function inject(box) {
    let link = box.querySelector("input[type=text]").value;
    let shareIcons = box.querySelector("#share-icons");
    let slackDiv = document.createElement("div");
    slackDiv.style = "padding-top: 5px";
    for (let workspace of fakeData) {
        // Header
        let header = document.createElement("h3");      
        header.style = "margin-bottom: 2px";       
        // Icon in header 
        let slackIcon = document.createElement("img");
        slackIcon.style = "width: 20px; height: 20px; position: relative; top: 5px";
        slackIcon.src = document.getElementById('trythis').dataset.slackIconURL;
        // Title in header
        let title = document.createElement("b");
        title.innerHTML = workspace.name;
        header.appendChild(slackIcon);
        header.appendChild(title);
        slackDiv.appendChild(header);
        // List of channels under header
        let channelList = document.createElement("ul");
        channelList.style = "list-style-type: none; margin-left: 8px";
        for (let channel of workspace.channels) {
            let channelItem = document.createElement("li");
            channelItem.innerText = "# " + channel;
            channelList.append(channelItem);
        }
        // Add button
        let addItem = document.createElement("li");
        addItem.innerText = "+ Add channel";
        channelList.appendChild(addItem);
        // Hover functionality
        Array.from(channelList.getElementsByTagName("li")).forEach((item) => {
            item.onmouseover = () => {
                item.style.backgroundColor = "#f5f5f5";
                item.style.color = "black";
            }
            item.onmouseleave = () => {
                item.style.backgroundColor = null;
                item.style.color = null;
            }
        })
        slackDiv.appendChild(channelList);
    }
    insertAfter(slackDiv, shareIcons);
    let settingsLink = document.createElement("a");
    settingsLink.innerText = "TryThis settings...";
    insertAfter(settingsLink, slackDiv);
    // let slackLink = document.createElement("a");
    // slackLink.classList = "share-gp";
    // slackLink.style = `background-image: url('${document.getElementById('trythis').dataset.slackIconURL}'); background-position: center; background-size: 30px;`;
    // slackLink.title = "Share link to this answer on Slack";
    // slackLink.innerText = "share [sl]";
    // slackLink.addEventListener("click", () => share(box, link));
    // shareIcons.appendChild(slackLink);

}

function share(workspace, channel, link) {
    alert(link);
}