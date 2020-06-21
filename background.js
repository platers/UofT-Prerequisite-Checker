chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    url = `https://nikel.ml/api/courses?prerequisites=${request['code']}&offset=${request['offset']}&limit=100`;
    fetch(url)
        .then(response => response.json())
        .then(data => sendResponse(data))
        .catch(error => sendResponse("error"));
    return true;
});