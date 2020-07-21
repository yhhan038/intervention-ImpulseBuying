chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({order:""}, function() {
        console.log("dspr. Initialized.");
    });
});


chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
             pageUrl: { hostEquals: 'coupang.com/', schemes: ['https'] },
            })
            ],
      actions: [new chrome.declarativeContent.ShowPageAction()],

        }]);
});


chrome.tabs.getSelected(null, function(tab) {
  var msg = "cartButton";
  chrome.tabs.sendMessage(tab.id, {message: msg});
 });



var display_order = ['d', 's', 'p', 'r']

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
        }

    var order = '';
    for (i = 0; i<a.length; i++) {
        order += a[i];
    }
    return order;
}

