// chrome.runtime.onInstalled.addListener(function() {
//     chrome.storage.sync.set({color: '#3aa757'}, function() {
//       console.log("The color is green.");
//     });
//     chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//         chrome.declarativeContent.onPageChanged.addRules([{
//             conditions: [new chrome.declarativeContent.PageStateMatcher({
//                 pageUrl: {hostEquals: 'developer.chrome.com'},
//             })
//         ],
//         actions: [new chrome.declarativeContent.ShowPageAction()]
//         }]);
//     });
// });


function click(info, tab) {
    chrome.windows.create({
        type: 'popup',
        url: 'https://www.almaany.com/ar/dict/ar-ar/' + encodeURIComponent(info.selectionText),
        width: 400,
        height: 1000
    }, function (tab) {
        translator_window = tab.windowId;
        translator_tab = tab.id;
        chrome.windows.onRemoved.addListener(function (windowId) {
            if (windowId == translator_window) {
                translator_window = false;
                translator_tab = false;
            }
        });
    });
}




function createmenus() {
    var parent = chrome.contextMenus.create({
        "id": "tr_single_parent",
        "title": "Find Meaning",
        "contexts": ["selection"]
    });
}

// chrome.storage.onChanged.addListener(function (changes, areaName) {
//     createmenus();
// });

chrome.storage.sync.get(null, function (items) {
    chrome.contextMenus.removeAll();
    createmenus();
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    // alert(info.selectionText);
    click(info, tab);
    // createPopup(info)
});

// function createPopup(info){ 
//     var selText = info.selectionText; //Get selected text
//     //Now, how to add bubble with selected text???
//     chrome.tabs.executeScript({
//         code: 'alert("' + selText + '");'
//     });
// }