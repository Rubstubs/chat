const box = document.getElementById("chat-box")
box.scrollTop = box.scrollHeight

let prevAmtOfMessages = 0;
let currentAmtOfMessages = 0;
const xhr = new XMLHttpRequest()

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

function updateLoop() {
    setTimeout(() => {
        updateCurrentNumberOfMessages()
        if (prevAmtOfMessages < currentAmtOfMessages) {
            history.go(0)
        } else updateLoop()
    }, 2000)
}

function updatePrevNumberOfMessages() {
    xhr.open( "GET", "/numberOfMessages", true)
    xhr.onload = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                prevAmtOfMessages = parseInt(xhr.response)
            }
        }
    }
    xhr.send( null )
}
function updateCurrentNumberOfMessages() {
    xhr.open( "GET", "/numberOfMessages", true)
    xhr.onload = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                currentAmtOfMessages = parseInt(xhr.response)
            }
        }
    }
    xhr.send( null )
}

document.querySelector(".changeAlias-btn").addEventListener("click", () => changeAlias())
const chatMessages = document.querySelector("#chat-messages")

updatePrevNumberOfMessages()
updateLoop()
