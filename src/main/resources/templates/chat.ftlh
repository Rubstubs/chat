<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="style.css">
    <title>The Chat!</title>
</head>
<body>
<div id="header">
    <h1 id="welcome-text">The Chat!</h1>
</div>
<div id="chat-box">
    <@chatMessages?interpret />
</div>
<div id="footer">
    <h2 id="input-header">Write a message:</h2>
    <form id="input-form" action="/postMessage" method="POST">
        <input id="input-field" autocomplete="off" autofocus name="message" type="text">
        <input id="submit-btn" type="submit" value="Send" class="submit-btn">
    </form>
    <p id="logged-in-text">Current alias: <strong>${alias}</strong></p>
    <div id="settings-buttons">
        <button type="submit" class="changeAlias-btn">Change alias</button>
        <form action="/reset" method="POST"><input type="submit" value="Reset The Chat" class="reset-btn"></form>
    </div>
</div>

<script src="script.js"></script>
</body>
</html>