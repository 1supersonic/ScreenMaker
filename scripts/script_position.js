console.log("2.0");

// Переменные 
let time = "";
let coin = "";
let longshort = ""; 
let laverage = "";
let position_size = "";
let entry_price = "";
let mark_price = "";
let value = "";
let margin = "";
let liq_price = "";
let tp = "";
let unr_pnl = "";
let unr_pnl_percent = "";
let unr_pnl_rounded = "";
let r_pnl = "";
let r_pnl_rounded = "";
let mark_price_const = 2485.37;


// Постоянное получение актуальной цены монеты 
function getCoinPrice() {
    console.log("-- попытка запроса к api --")
    coin = document.myform.coin.value;
    if (coin != "") {
        const url = "https://api.binance.com/api/v3/ticker/price?symbol=" + coin;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = 'json';
        xhr.send();
        xhr.onload = () => {
            mark_price = parseFloat(xhr.response.price).toFixed(2);
            console.log(coin);
            console.log(mark_price);
        };
    };
}
//setInterval(getCoinPrice, 2500); // каждые 2,5 секунды  


// Создание и сохранение скриншота
window.onload = function() {
    // Кнопка нажата
    document.getElementById("get_ss_btn").onclick = function() {
        save_position();
        
        html2canvas(document.getElementById("screenshot")).then(function(canvas) {
            const link = document.createElement('a');
            link.download = 'Screenshot.png';
            link.href = canvas.toDataURL("image/png");
            link.target = '_blank';
            link.click();
            link.delete;
        });
    };
}


function save_position() {
    // Получение значений из формы ввода  
    time = document.myform.time.value;
    coin = document.myform.coin.value;
    longshort = document.myform.longshort.value 
    leverage = parseFloat(document.myform.laverage.value);
    entry_price = parseFloat(document.myform.entry_price.value.replace(",", ""));
    margin = parseFloat(document.myform.margin.value.replace(",", ""));
    liq_price = document.myform.liq_price.value;
    tp = document.myform.tp.value;

    
    // Вычисление значений по формулам 
    value = margin * leverage; // верно  
    position_size = value / entry_price; // верно
    unr_pnl = (mark_price_const - entry_price) * position_size; // верно
    unr_pnl_percent = ((unr_pnl / margin) * 100).toFixed(2); // верно
    unr_pnl_rounded = (unr_pnl).toFixed(2);
    r_pnl = margin * 1;
    r_pnl_rounded = r_pnl;
    
    // для отладки
    // console.log(value, " = ", margin, " * ", leverage);
    // console.log(position_size, " = ", value, " / ", entry_price);
    // console.log(unr_pnl, " = (", mark_price_const, " - ", entry_price, ") * ", position_size);
    console.log(longshort);

    // Отрисовка ярлыка продажа / покупка
    if (longshort == "Long") {
        document.getElementById("longshort").textContent = "Long";
        document.getElementById("longshort").style.backgroundColor = "#1A2C27";
        document.getElementById("longshort").style.color = "#20B26C";
    } else if (longshort == "Short") {
        document.getElementById("longshort").textContent = "Short";
        document.getElementById("longshort").style.backgroundColor = "#331E22";
        document.getElementById("longshort").style.color = "#EF454A";
    }

    // Отрисовка шапки позиции
    document.getElementById("iphone_time").textContent = time;
    document.getElementById("coin").textContent = coin;
    document.getElementById("laverage").textContent = "Cross " + leverage + ".00x";
    
    // Отрисовка тела позиции
    document.getElementById("position_size").textContent = position_size;
    document.getElementById("entry_price").textContent = entry_price;
    document.getElementById("mark_price").textContent = mark_price;
    document.getElementById("liq_price").textContent = liq_price;
    document.getElementById("value").textContent = value;
    document.getElementById("unr_pnl").textContent = unr_pnl + " USDT " + "(" + unr_pnl_percent + "%)";
    document.getElementById("unr_pnl_rounded").textContent = "≈ " + unr_pnl_rounded + " USD";
    document.getElementById("r_pnl").textContent = "-31.0386" + " USDT";
    document.getElementById("r_pnl_rounded").textContent = "~ -31.04" + " USD";
    document.getElementById("margin").textContent = margin;
    document.getElementById("tp").textContent = tp;
    
        
    // замена фона скрина 
    let image_url = "url(../images/position/work-main.jpg)"; 
    document.getElementById('screenshot').style.backgroundImage = image_url;
    
}



