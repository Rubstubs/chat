const box = document.getElementById("chat-box")
box.scrollTop = box.scrollHeight

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

document.querySelector(".changeAlias-btn").addEventListener("click", () => changeAlias())