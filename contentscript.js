"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const realfin_1 = require("./libs/realfin");
let initialized;
let logger;
let errors;
let current;
let controller;
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
        controller.standby = !controller.standby;
        console.log('STADBY ' + controller.standby);
    });
    $('body').append(logger);
    errors = $('<div class="errors">');
    errors.text(' errors will be here');
    current = $('<div class="current">');
    current.text(' current task');
    logger.append(current);
    logger.append(errors);
}
function isRightUrl() {
    const url = document.location.href;
    if (url.indexOf('realfin') !== -1)
        return true;
    return false;
}
const interval = setInterval(() => {
    console.log('tick');
    if (!isRightUrl()) {
        console.log(' WRONG URL');
        clearInterval(interval);
    }
    else {
        if (!controller) {
            console.log('INIT ');
            controller = new realfin_1.Realfin();
            insertLogger();
            sendMessageFromContent({ status: 'INIT', data: null });
        }
        else
            controller.tick();
    }
    /*sendMassageBack({task: 'tick', params: Date.now()},function (r) {
        if(!r) connected = false;
        console.log('response', r);
    })*!/*/
}, 5000);
//# sourceMappingURL=contentscript.js.map