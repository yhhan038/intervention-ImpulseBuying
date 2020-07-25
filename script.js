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
var alarm = new Audio(
        'https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3');
alarm.volume = 0.03;
function first_display() {
    order = $('#dp_order').val();
    console.log("order : " + order);
    display();
}

chrome.storage.sync.get(function(data) {
    document.querySelector('#dp_order').value  = data.order
    first_display();
    });


var CLOCK = 600;
var clock = CLOCK;
var timer = null;

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

    timer = setInterval(function() {
        clock--;
        $('#timeLeft').html("Time Left (s) : " + clock);
        if(0 < clock <= 595) { // 120초 경과후부터는 넘길 수 있음
            alarm.play();
        $('#p-done').prop("disabled", false);
        }
        }, 1000);

        $('#postponement').css("display", "block");
    }
    else if (now == 's')
        $('#salientCost').css("display", "block");
    }
}



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
    clearInterval(timer);
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
    console.log("done");
    chrome.storage.sync.set({done:true});
    download();
    window.close();
}, false);
$('.btn-warning').on('click', function() {
    console.log('quit');
    chrome.storage.sync.set({quit:true});
    download();
    window.close();
});

$('#timer-btn').mousedown(function() {
   $('#timeLeft').css("display", "block");
});
$('#timer-btn').mouseup(function() {
   $('#timeLeft').css("display", "none");
});


var jjajang_msg;
var ramen_msg;
var pork_msg;
var rice_msg;
var triangle_msg;
var gimbab_msg;
var water_msg;
var alcohol_msg;
var schoolfood_msg;
var car_msg;
var game_msg;
var sing_msg;
var traffic_msg;
var tissue_msg;
var travel_msg;
var airpod_msg;
var dorm_msg;
var rent_msg;

chrome.storage.sync.get(function(data) {
    var price_txt = data.price;
    $('#cost').text(price_txt);
    price_txt = price_txt.replace(/(\s*)/g, "");
    price_txt = price_txt.slice(0,-1);
    price_txt = price_txt.replace(',', '');
    var price = Number(price_txt);

    var work = 8590;
    var coffee = 2000;
    var chicken = 15000;
    var jjajang = 5300;
    var ramen = 670;
    var pork = 8600;
    var rice = 1200;
    var triangle = 1200;
    var gimbab = 2300;
    var water = 930;
    var alcohol = 1500;
    var schoolfood = 4000;
    var car = 113;
    var game = 1500;
    var sing = 500;
    var traffic = 1250;
    var tissue = 830;
    var travel = 200000;
    var airpod = 251000;
    var dorm = 240000;
    var rent = 400000;

    var work_msg = ["이 금액을 벌려면 ", "최저시급 기준 " + String((price/work).toFixed(2)) + "시간 ", "일해야합니다. (최저시급 8,590원)\n"];
    var coffee_msg = ["이 금액이면 ", "커피 " + String((price/coffee).toFixed(2)) + " 잔", "을 살 수 있습니다. (아메리카노 2,000원) \n"];
    var chicken_msg = ["이 금액이면 ", "치킨 " + String((price/chicken).toFixed(2)) + " 마리", "를 먹을 수 있습니다. (치킨 15,000원) \n"];
    jjajang_msg = ["이 금액이면 ", "짜장면 " + String((price/jjajang).toFixed(2)) + " 그릇", "을 먹을 수 있습니다. (짜장면 5,300원)\n"];
    ramen_msg = ["이 금액이면 ", "라면 "+ String((price/ramen).toFixed(2)) + " 개", "를 먹을 수 있습니다. (라면 670 원)\n"];
    pork_msg = ["이 금액이면 ", "삼겹살 " + String((price/pork).toFixed(2)) + " 인분", "을 먹을 수 있습니다. (삼겹살 8,600 원)\n"];
    rice_msg = ["이 금액이면 ", "햇반 " + String((price/rice).toFixed(2)) + " 개", "를 살 수 있습니다. (햇반 1,200 원)\n"];
    triangle_msg = ["이 금액이면 ", "삼각김밥 " + String((price/triangle).toFixed(2)) + " 개", "를 먹을 수 있습니다. (삼각김밥 1,200 원)\n"];
    gimbab_msg = ["이 금액이면 ", "김밥 " + String((price/gimbab).toFixed(2)) + " 개", "를 먹을 수 있습니다. (김밥 1,200 원)\n"];
    water_msg = ["이 금액이면 ", "2L 생수 " + String((price/water).toFixed(2)) + " 개", "를 살 수 있습니다. (2L 생수 930원)\n"];
    alcohol_msg = ["이 금액이면 ", "소주/맥주 " + String((price/ramen).toFixed(2)) + " 병", "을 마실 수 있습니다. (소주/맥주 1,500 원)\n"];
    schoolfood_msg = ["이 금액이면 ", "학식을 " + String((price/schoolfood).toFixed(2)) + " 번", " 먹을 수 있습니다. (학식 4,000 원)\n"];
    car_msg = ["이 금액이면 ", "차로 " + String((price/ramen).toFixed(2)) + " km ", "달릴 수 있습니다. (주유비 1L 1,360 원, 연비 12km/1L)\n"];
    game_msg = ["이 금액이면 ", "PC방에서 " + String((price/game).toFixed(2)) + " 시간 ", "게임을 할 수 있습니다. (PC방 1시간 1,500 원)\n"];
    sing_msg = ["이 금액이면 ", "코인 노래방에서 노래를 " + String((price/sing).toFixed(2)) + "곡 ", "부를 수 있습니다. (1곡 500 원)\n"];
    traffic_msg = ["이 금액이면 ", "대중교통을 " + String((price/traffic).toFixed(2)) + " 회 ", "이용할 수 있습니다. (버스/지하철 1,250 원)\n"];
    tissue_msg = ["이 금액이면 ", "두루마지 휴지 " + String((price/tissue).toFixed(2)) + " 개", "를 살 수 있습니다. (휴지 830 원)\n"];
    travel_msg = ["이 금액을 ", String((travel/price).toFixed(2)) + " 번 아끼면 국내여", "을 갈 수 있습니다. (국내여행 경비 200,000 원)\n"];
    airpod_msg = ["이 금액을 ", String((airpod/price).toFixed(2)) + " 번 아끼면 에어팟 프로", "를 살 수 있습니다. (에어팟 프로 251,000 원)\n"];
    dorm_msg = ["이 금액을 ", String((dorm/price).toFixed(2)) + " 번 아끼면 한달 치 기숙사비", "를 낼 수 있습니다. (기숙사비 1달 240,000 원)\n"];
    rent_msg = ["이 금액을 " , String((rent/price).toFixed(2)) + " 번 아끼면 한달 치 월세", "를 낼 수 있습니다. (월세 400,000 원)\n"];
    // id값인 salientCost인 태그에 결과를 추가한다.
    document.querySelector('#work').children[0].innerText = work_msg[0];
    document.querySelector('#work').children[1].innerText = work_msg[1];
    document.querySelector('#work').children[2].innerText = work_msg[2];
    document.querySelector('#coffee').children[0].innerText = coffee_msg[0];
    document.querySelector('#coffee').children[1].innerText = coffee_msg[1];
    document.querySelector('#coffee').children[2].innerText = coffee_msg[2];
    document.querySelector('#chicken').children[0].innerText = chicken_msg[0];
    document.querySelector('#chicken').children[1].innerText = chicken_msg[1];
    document.querySelector('#chicken').children[2].innerText = chicken_msg[2];

});


$('#drop-all li > a').on('click', function() {
    $('#drop-btn').text($(this).text());
    var select = $(this).attr('value');
    switch(select) {
        case 'jjajang':
            var add = document.getElementById('temp').cloneNode(true);
            add.children[0].innerText = jjajang_msg[0];
            add.children[1].innerText = jjajang_msg[1];
            add.children[2].innerText = jjajang_msg[2];
            document.querySelector('#showingCost').appendChild(add);
            break;
        case 'ramen':
            var add = document.getElementById('temp').cloneNode(true);
            add.children[0].innerText = ramen_msg[0];
            add.children[1].innerText = ramen_msg[1];
            add.children[2].innerText = ramen_msg[2];
            document.querySelector('#showingCost').appendChild(add);
            break;
        case 'pork':
            var add = document.getElementById('temp').cloneNode(true);
            add.children[0].innerText = pork_msg[0];
            add.children[1].innerText = pork_msg[1];
            add.children[2].innerText = pork_msg[2];
            document.querySelector('#showingCost').appendChild(add);
            break;
        case 'rice':
            var add = document.getElementById('temp').cloneNode(true);
            add.children[0].innerText = rice_msg[0];
            add.children[1].innerText = rice_msg[1];
            add.children[2].innerText = rice_msg[2];
            document.querySelector('#showingCost').appendChild(add);
            break;
        case 'triangle':
            var add = document.getElementById('temp').cloneNode(true);
            add.children[0].innerText = triangle_msg[0];
            add.children[1].innerText = triangle_msg[1];
            add.children[2].innerText = triangle_msg[2];
            document.querySelector('#showingCost').appendChild(add);
            break;
        case 'gimbab':
            var add = document.getElementById('temp').cloneNode(true);
            add.children[0].innerText = gimbab_msg[0];
            add.children[1].innerText = gimbab_msg[1];
            add.children[2].innerText = gimbab_msg[2];
            document.querySelector('#showingCost').appendChild(add);
            break;
         case 'water':
            var add = document.getElementById('temp').cloneNode(true);
            add.children[0].innerText = water_msg[0];
            add.children[1].innerText = water_msg[1];
            add.children[2].innerText = water_msg[2];
            document.querySelector('#showingCost').appendChild(add);
            break;
        case 'alcohol':
            var add = document.getElementById('temp').cloneNode(true);
            add.children[0].innerText = alcohol_msg[0];
            add.children[1].innerText = alcohol_msg[1];
            add.children[2].innerText = alcohol_msg[2];
            document.querySelector('#showingCost').appendChild(add);
            break;
        case 'schoolfood':
            var add = document.getElementById('temp').cloneNode(true);
            add.children[0].innerText = schoolfood_msg[0];
            add.children[1].innerText = schoolfood_msg[1];
            add.children[2].innerText = schoolfood_msg[2];
            document.querySelector('#showingCost').appendChild(add);
            break;
        case 'car':
            var add = document.getElementById('temp').cloneNode(true);
            add.children[0].innerText = car_msg[0];
            add.children[1].innerText = car_msg[1];
            add.children[2].innerText = car_msg[2];
            document.querySelector('#showingCost').appendChild(add);
            break;
        case 'game':
            var add = document.getElementById('temp').cloneNode(true);
            add.children[0].innerText = game_msg[0];
            add.children[1].innerText = game_msg[1];
            add.children[2].innerText = game_msg[2];
            document.querySelector('#showingCost').appendChild(add);
            break;
        case 'sing':
            var add = document.getElementById('temp').cloneNode(true);
            add.children[0].innerText = sing_msg[0];
            add.children[1].innerText = sing_msg[1];
            add.children[2].innerText = sing_msg[2];
            document.querySelector('#showingCost').appendChild(add);
            break;
        case 'traffic':
            var add = document.getElementById('temp').cloneNode(true);
            add.children[0].innerText = traffic_msg[0];
            add.children[1].innerText = traffic_msg[1];
            add.children[2].innerText = traffic_msg[2];
            document.querySelector('#showingCost').appendChild(add);
            break;
        case 'tissue':
            var add = document.getElementById('temp').cloneNode(true);
            add.children[0].innerText = tissue_msg[0];
            add.children[1].innerText = tissue_msg[1];
            add.children[2].innerText = tissue_msg[2];
            document.querySelector('#showingCost').appendChild(add);
            break;
        case 'travel':
            var add = document.getElementById('temp').cloneNode(true);
            add.children[0].innerText = travel_msg[0];
            add.children[1].innerText = travel_msg[1];
            add.children[2].innerText = travel_msg[2];
            document.querySelector('#showingCost').appendChild(add);
            break;
        case 'airpod':
            var add = document.getElementById('temp').cloneNode(true);
            add.children[0].innerText = airpod_msg[0];
            add.children[1].innerText = airpod_msg[1];
            add.children[2].innerText = airpod_msg[2];
            document.querySelector('#showingCost').appendChild(add);
            break;
        case 'dorm':
            var add = document.getElementById('temp').cloneNode(true);
            add.children[0].innerText = dorm_msg[0];
            add.children[1].innerText = dorm_msg[1];
            add.children[2].innerText = dorm_msg[2];
            document.querySelector('#showingCost').appendChild(add);
            break;
        case 'rent':
            var add = document.getElementById('temp').cloneNode(true);
            add.children[0].innerText = rent_msg[0];
            add.children[1].innerText = rent_msg[1];
            add.children[2].innerText = rent_msg[2];
            document.querySelector('#showingCost').appendChild(add);
            break;
    }
    //$('showingCost').appendChild()
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
