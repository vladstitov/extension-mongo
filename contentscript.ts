let initialized: boolean;
let logger: JQuery;
let errors: JQuery
let current: JQuery

async function wait(sec: number) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve(sec);
        }, sec * 1000)
    })
}


function showError(error: string) {
    errors.text(error);
}

function sendMessageFromContent(item: VOMessage) {
    chrome.runtime.sendMessage(item, function (resp: VOMessage) {
        console.log(resp);
        if(resp.status === 'ERROR') {

        }

    });
}

function insertLogger() {
    if (initialized) return;
    initialized = true

    const css = '.focused { box-shadow: #5600ff 0 0 5px; } ' +
        '.logger { position: fixed; bottom: 0; min-width: 600px; background-color: white; padding-left: 2em; display: flex}' +
        '.logger .errors{color: red; padding-left: 2em;}' +
        '.main_section .house_container {height: 200px;}' +
        '#mapDetail .map-content .leaflet-popup-content {width: 200px !important;}';

    const style = $('<style>');
    style.text(css)
    $('head').append(style);
    logger = $('<div class="logger">')
    logger.on('click', function (evt) {

    })
    $('body').append(logger)
    errors = $('<div class="errors">')
    errors.text(' errors will be here')
    current = $('<div class="current">')
    current.text(' current task');
    logger.append(current);
    logger.append(errors);
}


const interval = setInterval(() => {
    console.log('tick');
    insertLogger();
}, 5000);





function saveHtml(data: {url: string, key: string, kind: string,  html: string}) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost/db/SaveHtml',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    }).then(console.log).catch(console.log)
}




function getUrls(data: {kind: string}) {
    return $.ajax({
        type: 'POST',
        url: 'http://localhost/db/GetUrls',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    })
}


getUrls({kind:'realfin'}).then(console.log)
