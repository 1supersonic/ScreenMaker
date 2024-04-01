// Создание и сохранение скриншота
window.onload = function() {
    // Кнопка нажата
    document.getElementById("save_ss").onclick = function() {
        save_position();
        
        html2canvas(document.getElementById("screenshot")).then(function(canvas) {
            const link = document.createElement('a');
            link.download = 'download.png';
            link.href = canvas.toDataURL("image/png");
            link.target = '_blank';
            link.click();
            link.delete;
        });
    };
}

function save_position() {

    // Получение вводных данных из формы 
    var time = document.myform.time.value;
    var coin = document.myform.coin.value;
    var longshort = document.myform.longshort.value 
    var laverage = document.myform.laverage.value;
    var entry_price = document.myform.entry_price.value;
    var margin = document.myform.margin.value + " USDT";
    var liq_price = document.myform.liq_price.value;
    var tp = document.myform.tp.value;
                    
    // Получение цены монеты 
    const url = "https://api.binance.com/api/v3/ticker/price?symbol=" + coin;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = () => {
        console.log(xhr.response.price);
    };

    // Вычисление значений 
    var value = margin * entry_price;
    var position_size = value / entry_price;
    var mark_price = "";
    var unr_pnl = (mark_price - entry_price) * position_size;
    var unr_pnl_percent = (unr_pnl / margin) * 100%;
    var unr_pnl_rounded = unr_pnl;
    var r_pnl = margin * 1%;
    var r_pnl_rounded = r_pnl;

    // Отрисовка ярлыка продажа / покупка
    if (longshort == "Long") {
        document.getElementById("longshort").textContent = "Long";
        document.getElementById("longshort").style.backgroundColor = "#1A2C27";
        document.getElementById("longshort").style.color = "#20B26C";
    } else {
        document.getElementById("longshort").textContent = "Short";
        document.getElementById("longshort").style.backgroundColor = "#331E22";
        document.getElementById("longshort").style.color = "#EF454A";
    }

    // Отрисовка шапки позиции
    document.getElementById("iphone_time").textContent = time;
    document.getElementById("coin").textContent = coin;
    document.getElementById("laverage").textContent = "Cross " + laverage + ".00x";
    
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
}



