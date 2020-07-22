// product detail page에서 가격 가져오기
//chrome.tabs.executeScript(null, {file: "content-script.js"});
// url: chrome-extension://kgejmnbdipjoaefkemjgohfkdhahlkpi/popup.html

/*
chrome.tabs.executeScript({
    code : 'var cart = document.querySelector(".prod-cart-btn"); cart.addEventListener("click", function() {alert("Cart Clicked");});'
    }, function(result) {
    // 위의 코드가 실행된 후에 이 함수를 호출해주세요. 리턴값을 result에 담아주세요.
    var cart = result[0];

    cart.addEventListener('click', function() {
        alert('Cart Clicked');
    });
});
chrome.tabs.executeScript(null, {
code : 'var price = document.getElementsByClassName("total-price")[0].innerText;alert(price);'
});
*/

var order = '';
function first_display() {
    order = $('#dp_order').val();
    console.log("order : " + order);
    display();
}

chrome.storage.sync.get(function(data) {
    document.querySelector('#dp_order').value  = data.order
    first_display();
    });


function display () {

    if (order == '')
        $('#finish').css("display", "block");
    else {
    now = order[0];

    if (now == 'r')
        $('#reflection').css("display", "block");
    else if (now == 'd')
        $('#desireControl').css("display", "block");
    else if (now == 'p') {
        $('#p-done').prop("disabled", true);

        var timer = setInterval(function() {
        clock--;
        $('#timeLeft').html("Time Left : " + clock);
        if(clock<=595) { // 120초 경과후부터는 넘길 수 있음
        play();
        $('#p-done').prop("disabled", false);
        }
        }, 1000);

        $('#postponement').css("display", "block");
    }
    else if (now == 's')
        $('#salientCost').css("display", "block");
    }
}


var CLOCK = 600;
var clock = CLOCK;



chrome.storage.sync.get(function(data) {
    document.querySelector('#reflection-ans1').value = data.reflectionAns1;
    document.querySelector('#reflection-ans3').value = data.reflectionAns3;
    document.querySelector('#desire-ans1').value = data.desireAns1;
    document.querySelector('#desire-ans2').value = data.desireAns2;

});

$('#reflection-btn button').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
    var rAns2 = $(this).text()
    $('#reflection-ans2').text(rAns2);
chrome.storage.sync.set({
    reflectionAns2 : rAns2,
});
});

$('#s-done').click(function() {
    $('#salientCost').css("display", "none");

    order = order.slice(1);
    display();
});
$('#r-done').click(function() {

    if (validCheck1()) {
    $('#reflection').css("display", "none");

    order = order.slice(1);
    display();
    }
    else
        alert("모든 질문에 답해주세요.");

});
$('#p-done').click(function() {
    $('#postponement').css("display", "none");
    order = order.slice(1);
    display();
});
$('#d-done').click(function() {

    if (validCheck2()) {
        $('#desireControl').css("display", "none");
        order = order.slice(1);
        display();
    }
    else
        alert("모든 질문에 답해주세요.");
});
/*
$('#task-done').click(function() {
    //download();

     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "done"}, function(response) {
            console.log(response.result);
        });
    });

    console.log("click!");
});

$('#task-done').click(function() {
    //download();

    var data = { type: "FROM_PAGE", command: "done" };
    this.postMessage(data, "*");

    console.log("click!");
});
*/
document.getElementById("task-done").addEventListener("click",
    function() {
    console.log("click!");
    chrome.storage.sync.set({done:true});

}, false);


chrome.storage.sync.get(function(data) {
    var price_txt = data.price;
    $('#cost').text(price_txt);
    price_txt = price_txt.slice(0,-2);
    price_txt = price_txt.replace(',', '');
    var price = Number(price_txt);

    var work = 8590;
    var coffee = 2000;
    var chicken = 15000;
    var jjajang = 4000;

    var work_msg = "이 금액을 벌려면 최저시급 기준 " + String((price/work).toFixed(2)) + "시간 일해야합니다. \n (최저시급 8,590원)\n\n";
    var coffee_msg = "이 금액이면 커피 " + String((price/coffee).toFixed(2)) + " 잔을 살 수 있습니다.\n (아메리카노 2,000원) \n\n";
    var chicken_msg = "이 금액이면 치킨 " + String((price/chicken).toFixed(2)) + " 마리를 먹을 수 있습니다. \n (치킨 15,000원) \n\n";
    var jjajang_msg = "이 금액이면 짜장면 " + String((price/jjajang).toFixed(2)) + " 그릇을 먹을 수 있습니다. \n (짜장면 4,000원)\n\n";


    // id값인 salientCost인 태그에 결과를 추가한다.
    document.querySelector('#coffee').innerText = coffee_msg;
    document.querySelector('#work').innerText = work_msg;
    document.querySelector('#chicken').innerText = chicken_msg;
    document.querySelector('#jjajang').innerText = jjajang_msg;
});

// 컨텐트 페이지를 대상으로 코드를 실행
/*
chrome.tabs.executeScript({
    code : 'document.getElementsByClassName("total-price")[0].innerText'
    }, function(result) {
    // 위의 코드가 실행된 후에 이 함수를 호출해주세요. 리턴값을 result에 담아주세요.
    var price_txt = result[0];
    if(price_txt == null) {
        chrome.storage.sync.get(function(data) {
            $('#cost').text(price_txt);
            savePrice();
            price_txt = productPrice;
            console.log(price_txt);
        })

    }
    $('#cost').text(price_txt);
    price_txt = price_txt.slice(0,-2);
    price_txt = price_txt.replace(',', '');
    var price = Number(price_txt);

    var work = 8590;
    var coffee = 2000;
    var chicken = 15000;
    var jjajang = 4000;

    var work_msg = "이 금액을 벌려면 최저시급 기준 " + String((price/work).toFixed(2)) + "시간 일해야합니다. \n (최저시급 8,590원)\n\n";
    var coffee_msg = "이 금액이면 커피 " + String((price/coffee).toFixed(2)) + " 잔을 살 수 있습니다.\n (아메리카노 2,000원) \n\n";
    var chicken_msg = "이 금액이면 치킨 " + String((price/chicken).toFixed(2)) + " 마리를 먹을 수 있습니다. \n (치킨 15,000원) \n\n";
    var jjajang_msg = "이 금액이면 짜장면 " + String((price/jjajang).toFixed(2)) + " 그릇을 먹을 수 있습니다. \n (짜장면 4,000원)\n\n";


    // id값인 salientCost인 태그에 결과를 추가한다.
    document.querySelector('#coffee').innerText = coffee_msg;
    document.querySelector('#work').innerText = work_msg;
    document.querySelector('#chicken').innerText = chicken_msg;
    document.querySelector('#jjajang').innerText = jjajang_msg;


});
*/
document.querySelector('#reflection-ans1').addEventListener("change", function() {
    var rAns1 = document.querySelector('#reflection-ans1').value;
    chrome.storage.sync.set({
        reflectionAns1 : rAns1,
    });
});
document.querySelector('#reflection-ans3').addEventListener("change", function() {
    var rAns3 = document.querySelector('#reflection-ans3').value;
    chrome.storage.sync.set({
        reflectionAns3 : rAns3,
    });
});
document.querySelector('#desire-ans1').addEventListener("change", function() {
    var dAns1 = document.querySelector('#desire-ans1').value;
    chrome.storage.sync.set({
        desireAns1 : dAns1,
    });
});
document.querySelector('#desire-ans2').addEventListener("change", function() {
    var dAns2 = document.querySelector('#desire-ans2').value;
    chrome.storage.sync.set({
        desireAns2 : dAns2,
    });
});



//window.close();



function download() {
    var data = $('#reflection-ans1').val() + "//" + $('#reflection-ans2').text() + "//" + $('#reflection-ans3').val() + "//" + $('#desire-ans1').val() + "//" + $('#desire-ans2').val();
    var filename = "/data/test.txt";
    var file = new Blob([data], {type: 'txt'});
    var a = document.createElement("a"),
            url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
    }


function shuffle(a) { var j, x, i; for (i = a.length; i; i -= 1) { j = Math.floor(Math.random() * i); x = a[i - 1]; a[i - 1] = a[j]; a[j] = x; } }



function validCheck1 () {
    var valid = true;
    if ($('#reflection-ans1').val().length == 0 )
        valid  = false;
    if ($('#reflection-ans2').text() == '')
        valid = false;
    if ($('#reflection-ans3').val().length == 0 )
        valid = false;

    return true;
};
function validCheck2 () {
    var valid = true;
    if ($('#desire-ans1').val().length == 0 )
        valid  = false;
    if ($('#desire-ans2').val().length == 0)
        valid = false;

    return true;
};

function play() {
        var audio = new Audio(
        'https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3');
         audio.play();
        }