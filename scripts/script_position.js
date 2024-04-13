// Переменные значений позиции 
let time = "";
let coin = "";
let longshort = ""; 
let leverage = "";
let position_size = "";
let entry_price = "";
let mark_price = 66940;
let value = "";
let margin = "";
let liq_price = "";
let tp = "";
let unr_pnl = "";
let unr_pnl_percent = "";
let unr_pnl_rounded = "";
let r_pnl = "";
let r_pnl_rounded = "";

// Цвета
let text_color_red = "#CD5C61";
let text_color_green = "#42A17F";

// Технические переменные 
let charactersAfterDot = 0; // количество цифр после точки 


// Постоянное получение актуальной цены монеты 
function getCoinPrice() {
    coin = document.myform.coin.value;
    console.log("-- попытка запроса к api --", coin);
    if (coin != "") {
        coin = document.myform.coin.value + "USDT";
        const url = "https://api.binance.com/api/v3/ticker/price?symbol=" + coin;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = 'json';
        xhr.send();
        xhr.onload = () => {
            //mark_price = parseFloat(xhr.response.price);
            //console.log(coin, ": ", mark_price);
        };
    };
}
setInterval(getCoinPrice, 2000); // каждые 2,5 секунды  


// Автоматическое заполнение графы текущего времени
function setCurrentTime() {
    let time = new Date();
    let hours = String(time.getHours());
    let minutes = String(time.getMinutes());
    let current_time = hours + ":" + minutes;
    document.getElementById("input_time").setAttribute("value", current_time);
}


// получение данных из формы ввода 
function getInputData() {
    time = document.myform.time.value;
    coin = document.myform.coin.value + "USDT";
    longshort = document.myform.longshort.value 
    leverage = parseFloat(document.myform.laverage.value);
    entry_price = parseFloat(document.myform.entry_price.value.replace(",", ""));
    margin = parseFloat(document.myform.margin.value.replace(",", ""));
    liq_price = document.myform.liq_price.value;
    tp = document.myform.tp.value;
};


// тестовоe калькулирование PNL 
function testCalculation() {
    getInputData(); // получение данных из формы
    
    // рассчет 
    value = margin * leverage;  
    position_size = value / entry_price;
    unr_pnl = (mark_price - entry_price) * position_size;
    unr_pnl_percent = (unr_pnl / margin) * 100;
    
    // визуал 
    unr_pnl = unr_pnl.toFixed(4);
    unr_pnl_percent = unr_pnl_percent.toFixed(2); 
    
    console.log(entry_price, mark_price);
    console.log(unr_pnl, unr_pnl_percent);
    
    document.getElementById("unr_pnl_example").textContent = addComma(unr_pnl) + " USDT " + "(" + unr_pnl_percent + "%)";
}


// Создание и сохранение скриншота
window.onload = function() {
    // Кнопка нажата
    document.getElementById("get_ss_btn").onclick = function() {
        generateScreenshot();
        
        html2canvas(document.getElementById("screenshot")).then(function(canvas) {
            
            let file_name = "position_"+generateFileName() + ".png";
            
            const link = document.createElement('a');
            link.download = file_name;
            link.href = canvas.toDataURL("image/png");
            link.target = '_blank';
            link.click();
            link.delete;
        });
    };
}


function generateScreenshot () {
    getInputData(); // получение данных из формы

    
    // узнаем количество цифр после точки 
    charactersAfterDot = entry_price.toString().split( '.' ).pop().length;

    
    // Вычисление значений по формулам 
    value = margin * leverage;  
    position_size = value / entry_price;
    unr_pnl = (mark_price - entry_price) * position_size;
    unr_pnl_percent = (unr_pnl / margin) * 100; 
    r_pnl = margin * 0.01;

    
    // Визуальное формирование вывода  
    entry_price = addComma(entry_price);
    value = addComma(value.toFixed(4));
    unr_pnl = unr_pnl.toFixed(4);
    position_size = position_size.toFixed(2);
    unr_pnl_percent = unr_pnl_percent.toFixed(2); 
    unr_pnl_rounded = parseFloat(unr_pnl).toFixed(2);
    r_pnl = parseFloat(r_pnl).toFixed(4) + " USDT";
    r_pnl_rounded = parseFloat(r_pnl).toFixed(2);
    margin = addComma(margin) + " USDT";
    mark_price = addComma(parseFloat(mark_price).toFixed(charactersAfterDot));
    

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
    
    
    // Настройка отображения PnL в зависимости от Long / Short и наличия минуса 
    if (longshort == "Long") {
        if (String(unr_pnl)[0] == "-") {
            document.getElementById("unr_pnl").style.color = text_color_red;
            document.getElementById("unr_pnl_rounded").style.color = text_color_red;
        } else if (String(unr_pnl)[0] != "-") {
            document.getElementById("unr_pnl").style.color = text_color_green;
            document.getElementById("unr_pnl_rounded").style.color = text_color_green;
        };
    } else if (longshort == "Short") {
        if (String(unr_pnl)[0] != "-") {
            unr_pnl = "-" + unr_pnl;
            unr_pnl_percent = "-" + unr_pnl_percent;
            unr_pnl_rounded = "-" + unr_pnl_rounded;
            document.getElementById("unr_pnl").style.color = text_color_red;
            document.getElementById("unr_pnl_rounded").style.color = text_color_red;
        } else if (String(unr_pnl)[0] == "-") {
            unr_pnl = unr_pnl.slice(1);
            unr_pnl_percent = unr_pnl_percent.slice(1);
            unr_pnl_rounded = unr_pnl_rounded.slice(1);
            document.getElementById("unr_pnl").style.color = text_color_green;
            document.getElementById("unr_pnl_rounded").style.color = text_color_green;
        };
    };
    

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
    document.getElementById("unr_pnl").textContent = addComma(unr_pnl) + " USDT " + "(" + unr_pnl_percent + "%)";
    document.getElementById("unr_pnl_rounded").textContent = "≈ " + unr_pnl_rounded + " USD";
    document.getElementById("r_pnl").textContent = r_pnl;
    document.getElementById("r_pnl_rounded").textContent = "≈ " + r_pnl_rounded + " USD";
    document.getElementById("margin").textContent = margin;
    document.getElementById("tp").textContent = tp;
    
        
    // замена фона скрина 
    let image_url = "url(../images/position/work-main.jpg)"; 
    document.getElementById('screenshot').style.backgroundImage = image_url;
    
    mark_price = 66940;
    
}



