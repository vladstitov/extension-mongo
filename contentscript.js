let initialized;
let logger;
let errors;
let current;
async function wait(sec) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve(sec);
        }, sec * 1000);
    });
}
function showError(error) {
    errors.text(error);
}
function sendMessageFromContent(item) {
    chrome.runtime.sendMessage(item, function (resp) {
        console.log(resp);
        if (resp.status === 'ERROR') {
        }
    });
}
function insertLogger() {
    if (initialized)
        return;
    initialized = true;
    const css = '.focused { box-shadow: #5600ff 0 0 5px; } ' +
        '.logger { position: fixed; bottom: 0; min-width: 600px; background-color: white; padding-left: 2em; display: flex}' +
        '.logger .errors{color: red; padding-left: 2em;}' +
        '.main_section .house_container {height: 200px;}' +
        '#mapDetail .map-content .leaflet-popup-content {width: 200px !important;}';
    const style = $('<style>');
    style.text(css);
    $('head').append(style);
    logger = $('<div class="logger">');
    logger.on('click', function (evt) {
    });
    $('body').append(logger);
    errors = $('<div class="errors">');
    errors.text(' errors will be here');
    current = $('<div class="current">');
    current.text(' current task');
    logger.append(current);
    logger.append(errors);
}
const interval = setInterval(() => {
    console.log('tick');
    insertLogger();
}, 5000);
function saveHtml(data) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost/db/SaveHtml',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    }).then(console.log).catch(console.log);
}
function getUrls(data) {
    return $.ajax({
        type: 'POST',
        url: 'http://localhost/db/GetUrls',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    });
}
getUrls({ kind: 'realfin' }).then(console.log);
//# sourceMappingURL=contentscript.js.map