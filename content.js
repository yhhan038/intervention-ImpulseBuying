window.onload = function() {

        var productPrice = document.getElementsByClassName("total-price")[0].innerText;
        if (productPrice != null) {
            chrome.storage.sync.set({price: productPrice},function() {
                console.log("Price Saved");});
        }
        document.querySelector('button.prod-buy-btn').style.display = "none";

        var cart = document.querySelector(".prod-cart-btn");
        if (cart != null) {

        cart.addEventListener("click", function() {
            popup_url = chrome.extension.getURL('popup.html');
              // alert(popup_url);
              document.querySelector('li.cart.more').style.display = "none";
              var intervention = window.open(popup_url, "Intervention", "width=780,height=600. left=1800, top=100");
              });

        var order_string = shuffle(display_order);
            chrome.storage.sync.set({order:order_string}, function() {
            console.log("Randomize Order");});
        }

        chrome.storage.sync.set({done:false}, function() {
            console.log("done false");});
        chrome.storage.sync.set({quit:false}, function() {
            console.log("quit false");});

}
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


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)    {
    if(request.command == 'done'){
        console.log('okok');
        document.querySelector('li.cart.more').style.display = "block";
        document.querySelector('button.prod-buy-btn').style.display = "block";
        sendResponse({result: "success"});
    }
});

/*
chrome.runtime.onMessageExternal.addListener(
 function(request, sender, sendResponse) {
  console.log(request.command);
  sendResponse({result: "success"});
  });

  */
chrome.storage.onChanged.addListener(function (changes, areaName) {
        console.log(changes['done']);
          for (key in changes) {
            if (key == 'done') {
            document.querySelector('li.cart.more').style.display = "block";
            document.querySelector('button.prod-buy-btn').style.display = "block";
            }
            else if (key == 'quit')
                window.history.back();
          }
     });