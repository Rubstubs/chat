let currentAmtOfMessages = 0;
let numOfMessagesInDb = 0;
let allMessages = "Nothing here..."

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


// Refreshing site if new messages
function updateLoop() {
    setTimeout(() => {
        // if (allMessages.length !== chatMessages.innerHTML.length) {
        //     chatMessages.innerHTML = allMessages
        // }
        if (needToUpdate()) {
            history.go(0)
        } else {
            updateLoop()
        }
    }, 2000)
}

function updateNumOfMessagesInDb() {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", "/numberOfMessages/", true)
    xhr.onload = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                numOfMessagesInDb = xhr.response
            }
        }
    }
    xhr.send(null)
}

function needToUpdate() {
    updateNumOfMessagesInDb()
    return parseInt(numOfMessagesInDb) !== currentAmtOfMessages
}

function updateCurrentNumberOfMessages() {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", "/numberOfMessages/", true)
    xhr.onload = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                currentAmtOfMessages = parseInt(xhr.response)
            }
        }
    }
    xhr.send(null)
}

function getAllMessages() {
    fetch("/getAllMessages")
        .then(response => response.text())
        .then(data => {
            document.querySelector("#chat-messages").innerHTML = data
            box.scrollTop = box.scrollHeight
        })
}

const box = document.getElementById("chat-box")
box.scrollTop = box.scrollHeight

document.querySelector(".changeAlias-btn").addEventListener("click", () => changeAlias())

getAllMessages()
updateCurrentNumberOfMessages()
updateNumOfMessagesInDb()

updateLoop()