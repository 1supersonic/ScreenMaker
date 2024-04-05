console.log("2;8");

// Переменные значений позиции 
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

// Цвета
let text_color_red = "#CD5C61";
let text_color_green = "#42A17F";

// Технические переменные 
let charactersAfterDot = 0; // количество цифр после точки 


function addComma (number) {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

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
            mark_price = parseFloat(xhr.response.price);
            console.log(coin);
            console.log(mark_price);
        };
    };
}
setInterval(getCoinPrice, 2500); // каждые 2,5 секунды  


// Создание и сохранение скриншота
window.onload = function() {
    // Кнопка нажата
    document.getElementById("get_ss_btn").onclick = function() {
        save_position();
        
        html2canvas(document.getElementById("screenshot")).then(function(canvas) {
            // генерация имени для файла
            let current_time = new Date();
            let year = String(current_time.getFullYear());
            let month = String(current_time.getMonth());
            let day = String(current_time.getDate());
            let hours = String(current_time.getHours());
            let minutes = String(current_time.getMinutes());
            let seconds = String(current_time.getSeconds());
            let file_name = "position_"+year+"-"+month+"-"+day+"_"+hours+"-"+minutes+"-"+seconds;
            
            const link = document.createElement('a');
            link.download = file_name + ".png";
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
    
    // узнаем количество цифр после точки 
    charactersAfterDot = entry_price.toString().split( '.' ).pop().length;

    
    // Вычисление значений по формулам 
    value = (margin * leverage).toFixed(4); // верно  
    position_size = (value / entry_price).toFixed(2); // верно
    unr_pnl = ((mark_price - entry_price) * position_size).toFixed(4); // верно
    unr_pnl_percent = ((unr_pnl / margin) * 100).toFixed(2); // верно
    unr_pnl_rounded = parseFloat(unr_pnl).toFixed(2);
    r_pnl = (margin * 0.01).toFixed(4);
    r_pnl_rounded = r_pnl.toFixed(2);
    

    // Отрисовка элементов в зависимости от Long / Short
    if (longshort == "Long") {
        document.getElementById("longshort").textContent = "Long";
        document.getElementById("longshort").style.backgroundColor = "#1A2C27";
        document.getElementById("longshort").style.color = "#20B26C";
        document.getElementById("position_size").style.color = text_color_green;
    } else if (longshort == "Short") {
        document.getElementById("longshort").textContent = "Short";
        document.getElementById("longshort").style.backgroundColor = "#331E22";
        document.getElementById("longshort").style.color = "#EF454A";
        document.getElementById("position_size").style.color = text_color_red;
    }
    
    
    // цвет PnL в зависимости от наличия минуса 
    if (String(unr_pnl)[0]) {
        document.getElementById("r_pnl").style.color = text_color_red;
        document.getElementById("unr_pnl_rounded").style.color = text_color_red;
    } else {
        document.getElementById("r_pnl").style.color = text_color_green;
        document.getElementById("unr_pnl_rounded").style.color = text_color_green;
    };
    

    // Отрисовка шапки позиции
    document.getElementById("iphone_time").textContent = time;
    document.getElementById("coin").textContent = coin;
    document.getElementById("laverage").textContent = "Cross " + leverage + ".00x";
    
    // Отрисовка тела позиции
    document.getElementById("position_size").textContent = position_size;
    document.getElementById("entry_price").textContent = addComma(entry_price);
    document.getElementById("mark_price").textContent = addComma(mark_price.toFixed(charactersAfterDot));
    document.getElementById("liq_price").textContent = liq_price;
    document.getElementById("value").textContent = addComma(value);
    document.getElementById("unr_pnl").textContent = addComma(unr_pnl) + " USDT " + "(" + unr_pnl_percent + "%)";
    document.getElementById("unr_pnl_rounded").textContent = "≈ " + unr_pnl_rounded + " USD";
    document.getElementById("r_pnl").textContent = r_pnl + " USDT";
    document.getElementById("r_pnl_rounded").textContent = "≈ " + r_pnl_rounded + " USD";
    document.getElementById("margin").textContent = addComma(margin) + " USDT";
    document.getElementById("tp").textContent = tp;
    
        
    // замена фона скрина 
    let image_url = "url(../images/position/work-main.jpg)"; 
    document.getElementById('screenshot').style.backgroundImage = image_url;
    
}



