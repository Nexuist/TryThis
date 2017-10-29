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
    let slackLink = document.createElement("a");
    slackLink.classList = "share-gp";
    slackLink.style = `background-image: url('${document.getElementById('trythis').dataset.slackIconURL}'); background-position: center; background-size: 30px;`;
    slackLink.title = "Share link to this answer on Slack";
    slackLink.innerText = "share [sl]";
    slackLink.addEventListener("click", () => share(link));
    shareIcons.appendChild(slackLink);
}

function share(link) {
    alert(link);
}