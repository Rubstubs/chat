// Cookie handling
function changeAlias() {
    let alias = prompt("Enter alias:")
    if (alias.length === 0) {
        changeAlias()
    } else {
        document.cookie = "alias=" + alias + "; Max-Age=2592000"
        setTimeout(() => {
            history.go(0)
        }, 200)
    }
}

function isAliasRegistered() {
    return getCookieByName("alias").length !== 0
}

function getCookieByName(cookieName)
{
    const cookieString=RegExp(cookieName+"=[^;]+").exec(document.cookie);
    return decodeURIComponent(!!cookieString ? cookieString.toString().replace(/^[^=]+./,"") : "");
}

if (!isAliasRegistered()) changeAlias()

// Chat as stream
const box = document.getElementById("chat-box")

document.querySelector(".changeAlias-btn").addEventListener("click", () => changeAlias())

function loadComments () {
    this.source = null
    this.start = () => {
        this.source = new EventSource("/messages/stream")

        this.source.addEventListener("message", function (event) {
            if (box.innerHTML.length !== event.data.length) {
                box.innerHTML = event.data
                box.scrollTop = box.scrollHeight
            }
        })
        this.source.onerror = function () {
            this.close();
        }
    }
    this.stop = function() {
        this.source.close();
    }
}

const comment = new loadComments()

// Start the chat on page load
function getAllMessages() {
    fetch("/getAllMessages")
        .then(response => response.text())
        .then(data => {
            document.querySelector("#chat-messages").innerHTML = data
            box.scrollTop = box.scrollHeight
        })
}

window.onload = function() {
    getAllMessages()
    comment.start();
};
window.onbeforeunload = function() {
    comment.stop();
}

box.scrollTop = box.scrollHeight