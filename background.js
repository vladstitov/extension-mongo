function sendData(url, data) {
    console.log('send data ', data);
    return fetch('http://localhost:8080/' + url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json'
        },
        /* mode: 'cors',
         redirect: 'follow',
         referrerPolicy: 'no-referrer',*/
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(error => console.log('Error:', error));
}
chrome.runtime.onInstalled.addListener(async () => {
    sendData('db/GetUrls', { action: 'Hello 78888' }).then(console.log);
    console.log(`Created tab `);
});
//# sourceMappingURL=background.js.map